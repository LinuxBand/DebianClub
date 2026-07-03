import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const defaultBaseUrl = 'http://localhost:43018';
const browserStartupTimeoutMs = readPositiveIntegerEnv('BROWSER_STARTUP_TIMEOUT_MS', 60_000);
const pageTimeoutMs = 15_000;
const cdpCommandTimeoutMs = 10_000;
const navigationTimeoutMs = readPositiveIntegerEnv('BROWSER_NAVIGATION_TIMEOUT_MS', 30_000);
const searchQuery = 'AI Skills';
const expectedResultPattern = /AI Skills|DebianClub AI Skills/;
const emptyResultPattern = /No results|没有结果|未找到|无结果/;
const safetyInitialCommand = 'curl -fsSL https://example.com/install.sh | sh';
const safetyUpdatedCommand = 'sudo apt update';

const knownBrowserPaths = [
  process.env.CHROME_BIN,
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/opt/google/chrome/chrome',
  '/snap/bin/chromium',
  '/usr/bin/microsoft-edge',
].filter(Boolean);

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`[browser-smoke] FAIL ${message}`);
}

function pass(message) {
  console.log(`[browser-smoke] OK   ${message}`);
}

function assert(condition, message, details) {
  if (!condition) {
    const suffix = details ? `; details: ${JSON.stringify(details, null, 2)}` : '';
    throw new Error(`${message}${suffix}`);
  }
}

function readPositiveIntegerEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;

  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer in milliseconds`);
  }

  return value;
}

function resolveBaseUrl() {
  const arg = process.argv.find((value) => value.startsWith('--url='));
  const raw = arg?.slice('--url='.length) || process.env.SMOKE_BASE_URL || defaultBaseUrl;
  const url = new URL(raw);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`SMOKE_BASE_URL must use http or https, got ${url.protocol}`);
  }

  return url;
}

function resolveBrowserPath() {
  return knownBrowserPaths.find((browserPath) => existsSync(browserPath));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

async function terminateBrowser(browser) {
  if (browser.exitCode !== null || browser.signalCode !== null) return;

  const exited = new Promise((resolve) => {
    browser.once('exit', resolve);
  });

  browser.kill('SIGTERM');
  const didExit = await Promise.race([exited.then(() => true), sleep(3_000).then(() => false)]);

  if (!didExit && browser.exitCode === null && browser.signalCode === null) {
    browser.kill('SIGKILL');
    await exited;
  }
}

async function waitForBrowserTarget(port, browser) {
  const deadline = Date.now() + browserStartupTimeoutMs;

  while (Date.now() < deadline) {
    if (browser.exitCode !== null || browser.signalCode !== null) {
      throw new Error(`browser exited before opening debugging target: code=${browser.exitCode} signal=${browser.signalCode}`);
    }

    try {
      const targets = await fetchJson(`http://127.0.0.1:${port}/json/list`);
      const page = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chromium opens the debugging endpoint after process startup.
    }

    await sleep(100);
  }

  throw new Error(`timed out after ${browserStartupTimeoutMs}ms waiting for browser debugging target`);
}

async function connectToCdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  const events = [];

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (message.id && pending.has(message.id)) {
      const { resolve, reject, timeout } = pending.get(message.id);
      pending.delete(message.id);
      clearTimeout(timeout);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result || {});
      return;
    }

    if (message.method) events.push(message.method);
  });

  function send(method, params = {}, timeoutMs = cdpCommandTimeoutMs) {
    const id = nextId;
    nextId += 1;
    ws.send(JSON.stringify({ id, method, params }));

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (!pending.has(id)) return;
        pending.delete(id);
        reject(new Error(`timed out waiting for ${method}`));
      }, timeoutMs);
      pending.set(id, { resolve, reject, timeout });
    });
  }

  async function waitForEvent(method, timeoutMs = pageTimeoutMs) {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const index = events.indexOf(method);
      if (index !== -1) {
        events.splice(index, 1);
        return;
      }

      await sleep(50);
    }

    throw new Error(`timed out waiting for ${method}`);
  }

  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => resolve({ send, waitForEvent, close: () => ws.close() }), { once: true });
    ws.addEventListener('error', () => reject(new Error('WebSocket connection failed')), { once: true });
  });
}

async function evaluate(cdp, expression, awaitPromise = false) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(JSON.stringify(result.exceptionDetails, null, 2));
  }

  return result.result.value;
}

async function waitFor(cdp, expression, label, timeoutMs = pageTimeoutMs) {
  const deadline = Date.now() + timeoutMs;
  let lastValue;

  while (Date.now() < deadline) {
    lastValue = await evaluate(cdp, expression);
    if (lastValue) return lastValue;
    await sleep(120);
  }

  throw new Error(`${label} did not become ready; last value: ${JSON.stringify(lastValue)}`);
}

async function getPageContext(cdp) {
  try {
    return await evaluate(
      cdp,
      `(() => ({
        url: window.location.href,
        title: document.title,
        readyState: document.readyState,
        bodyText: (document.body?.innerText || '').slice(0, 1200),
        activeElement: document.activeElement
          ? {
              tagName: document.activeElement.tagName,
              text: (document.activeElement.innerText || document.activeElement.value || '').slice(0, 200),
              ariaLabel: document.activeElement.getAttribute('aria-label'),
            }
          : null,
      }))()`,
    );
  } catch (error) {
    return {
      contextError: error instanceof Error ? error.message : String(error),
    };
  }
}

async function runCheck(label, cdp, callback) {
  try {
    await callback();
  } catch (error) {
    const pageContext = cdp ? await getPageContext(cdp) : null;
    const message = error instanceof Error ? error.message : String(error);
    const details = pageContext ? `; page: ${JSON.stringify(pageContext, null, 2)}` : '';
    throw new Error(`${label} failed: ${message}${details}`);
  }
}

async function navigateTo(cdp, url, { waitForLoad = false } = {}) {
  await cdp.send('Page.navigate', { url: url.toString() }, navigationTimeoutMs);
  if (waitForLoad) await cdp.waitForEvent('Page.loadEventFired', navigationTimeoutMs);
}

async function copyShareLink(cdp, { buttonText, storageKey, label }) {
  return evaluate(
    cdp,
    `new Promise((resolve, reject) => {
      const shareLabel = ${JSON.stringify(buttonText)};
      const copyLabel = ${JSON.stringify(label)};
      const copiedStorageKey = ${JSON.stringify(storageKey)};
      window[copiedStorageKey] = undefined;
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (value) => { window[copiedStorageKey] = value; } },
      });
      const button = Array.from(document.querySelectorAll('button')).find((item) => item.innerText.includes(shareLabel));
      if (!button) {
        reject(new Error(copyLabel + ' share button not found: ' + shareLabel));
        return;
      }
      button.click();

      const deadline = Date.now() + 2_000;
      const checkCopiedLink = () => {
        const copiedHref = window[copiedStorageKey];
        if (copiedHref) {
          const copiedUrl = new URL(copiedHref);
          resolve({
            href: copiedHref,
            pathname: copiedUrl.pathname,
            search: copiedUrl.search,
            hash: copiedUrl.hash,
          });
          return;
        }
        if (Date.now() >= deadline) {
          reject(new Error(copyLabel + ' share button did not write clipboard: ' + shareLabel));
          return;
        }
        window.setTimeout(checkCopiedLink, 50);
      };
      checkCopiedLink();
    })`,
    true,
  );
}

async function verifySearchUi(cdp, baseUrl) {
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await navigateTo(cdp, baseUrl, { waitForLoad: true });

  await waitFor(cdp, "document.body && document.body.innerText.includes('Debian.Club')", 'Debian.Club page');

  await waitFor(
    cdp,
    `Array.from(document.querySelectorAll('button')).some((button) => button.innerText.includes('Search') || button.getAttribute('aria-label') === 'Open Search')`,
    'search button',
  );

  await evaluate(
    cdp,
    `(() => {
      const button = Array.from(document.querySelectorAll('button')).find((item) => item.innerText.includes('Search') || item.getAttribute('aria-label') === 'Open Search');
      if (!button) return false;
      button.click();
      return true;
    })()`,
  );

  await sleep(800);

  const inputReady = await evaluate(
    cdp,
    `(() => {
      const input = Array.from(document.querySelectorAll('input')).find((item) => item.offsetWidth || item.offsetHeight || item.getClientRects().length);
      if (!input) return false;
      input.focus();
      input.value = ${JSON.stringify(searchQuery)};
      input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: ${JSON.stringify(searchQuery)} }));
      return true;
    })()`,
  );

  if (!inputReady) {
    const body = await evaluate(cdp, 'document.body.innerText.slice(0, 1200)');
    throw new Error(`search input not found after opening dialog; body: ${body}`);
  }

  await sleep(1_800);

  const result = await evaluate(
    cdp,
    `(() => {
      const text = document.body.innerText;
      return {
        hasExpectedResult: ${expectedResultPattern}.test(text),
        hasEmptyResult: ${emptyResultPattern}.test(text),
        text: text.slice(0, 2200),
      };
    })()`,
  );

  if (!result.hasExpectedResult || result.hasEmptyResult) {
    throw new Error(`search result did not include ${searchQuery}; result: ${JSON.stringify(result, null, 2)}`);
  }

  pass(`search UI returns results for ${searchQuery}`);
}

async function verifyAiSkillsShareLink(cdp, baseUrl) {
  const aiSkillsUrl = new URL('/tools#ai-skills?target=agents&replace=true', baseUrl);

  await navigateTo(cdp, aiSkillsUrl, { waitForLoad: true });
  await waitFor(cdp, "document.body && document.body.innerText.includes('复制 Skills 配置链接')", 'AI Skills tool');

  const initialState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const activeTab = buttons.find((button) => button.innerText.trim() === 'AI Skills');
      const target = buttons.find((button) => button.innerText.includes('Agents 目录'));
      const commandText = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '').join(' ');
      return {
        hash: window.location.hash,
        activeTab: activeTab?.getAttribute('aria-pressed') || null,
        targetPressed: target?.getAttribute('aria-pressed') || null,
        checked: document.querySelector('input[type="checkbox"]')?.checked ?? null,
        commandText,
      };
    })()`,
  );

  assert(initialState.hash === '#ai-skills?target=agents&replace=true', 'AI Skills initial hash mismatch', initialState);
  assert(initialState.activeTab === 'true', 'AI Skills tab is not active', initialState);
  assert(initialState.targetPressed === 'true', 'AI Skills target was not loaded from hash', initialState);
  assert(initialState.checked === true, 'AI Skills replace flag was not loaded from hash', initialState);
  assert(
    initialState.commandText.includes('--replace --target "$HOME/.agents/skills"'),
    'AI Skills command did not include the shared target and replace flag',
    initialState,
  );

  await evaluate(
    cdp,
    `new Promise((resolve) => {
      window.location.hash = 'ai-skills?target=local&replace=false';
      window.setTimeout(resolve, 350);
    })`,
    true,
  );

  const updatedState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const target = buttons.find((button) => button.innerText.includes('仓库内本地目录'));
      const commandText = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '').join(' ');
      return {
        hash: window.location.hash,
        targetPressed: target?.getAttribute('aria-pressed') || null,
        checked: document.querySelector('input[type="checkbox"]')?.checked ?? null,
        commandText,
      };
    })()`,
  );

  assert(updatedState.hash === '#ai-skills?target=local&replace=false', 'AI Skills updated hash mismatch', updatedState);
  assert(updatedState.targetPressed === 'true', 'AI Skills local target was not selected after hashchange', updatedState);
  assert(updatedState.checked === false, 'AI Skills replace flag was not cleared after hashchange', updatedState);
  assert(updatedState.commandText.includes('--target ./skills-local'), 'AI Skills local command target is missing', updatedState);
  assert(!updatedState.commandText.includes('--replace --target ./skills-local'), 'AI Skills local command kept replace flag', updatedState);

  const copiedLink = await copyShareLink(cdp, {
    buttonText: '复制 Skills 配置链接',
    storageKey: '__copiedAiSkillsLink',
    label: 'AI Skills',
  });

  assert(copiedLink.search === '', 'AI Skills copied share URL kept query string', copiedLink);
  assert(copiedLink.hash === '#ai-skills?target=local&replace=false', 'AI Skills copied share URL hash mismatch', copiedLink);

  pass('AI Skills deep link and share link stay in sync');
}

async function verifyCommandSafetyShareLink(cdp, baseUrl) {
  const initialHash = `#command-safety?command=${encodeURIComponent(safetyInitialCommand)}`;
  const updatedHash = `#command-safety?command=${encodeURIComponent(safetyUpdatedCommand)}`;
  const commandSafetyUrl = new URL(`/tools${initialHash}`, baseUrl);

  await navigateTo(cdp, commandSafetyUrl);
  await waitFor(cdp, "document.body && document.body.innerText.includes('复制分享链接')", 'command safety tool');

  const initialState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const activeTab = buttons.find((button) => button.innerText.trim() === '命令安全');
      const textarea = document.querySelector('textarea');
      const bodyText = document.body.innerText;
      const codeTexts = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '');
      return {
        hash: window.location.hash,
        activeTab: activeTab?.getAttribute('aria-pressed') || null,
        value: textarea?.value || '',
        hasCriticalSummary: bodyText.includes('发现应阻止的危险命令'),
        hasRemoteScriptFinding: bodyText.includes('远程脚本直接交给 shell 执行'),
        codeTexts,
      };
    })()`,
  );

  assert(initialState.hash === initialHash, 'command safety initial hash mismatch', initialState);
  assert(initialState.activeTab === 'true', 'command safety tab is not active', initialState);
  assert(initialState.value === safetyInitialCommand, 'command safety did not preload the shared command', initialState);
  assert(initialState.hasCriticalSummary, 'command safety did not show critical summary for shared command', initialState);
  assert(initialState.hasRemoteScriptFinding, 'command safety did not show remote script finding', initialState);
  assert(
    initialState.codeTexts.some((text) => text.includes(safetyInitialCommand)),
    'command safety findings did not include the shared command text',
    initialState,
  );

  await evaluate(
    cdp,
    `new Promise((resolve) => {
      window.location.hash = ${JSON.stringify(updatedHash.slice(1))};
      window.setTimeout(resolve, 350);
    })`,
    true,
  );

  const updatedState = await evaluate(
    cdp,
    `(() => {
      const textarea = document.querySelector('textarea');
      const bodyText = document.body.innerText;
      const codeTexts = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '');
      return {
        hash: window.location.hash,
        value: textarea?.value || '',
        hasReviewSummary: bodyText.includes('需要人工复核'),
        hasSystemReviewFinding: bodyText.includes('需要人工复核的系统级变更'),
        hasOldCommand: codeTexts.some((text) => text.includes(${JSON.stringify(safetyInitialCommand)})),
        codeTexts,
      };
    })()`,
  );

  assert(updatedState.hash === updatedHash, 'command safety updated hash mismatch', updatedState);
  assert(updatedState.value === safetyUpdatedCommand, 'command safety did not sync updated hash command', updatedState);
  assert(updatedState.hasReviewSummary, 'command safety did not show review summary for updated command', updatedState);
  assert(updatedState.hasSystemReviewFinding, 'command safety did not show system review finding', updatedState);
  assert(!updatedState.hasOldCommand, 'command safety retained stale finding text after hashchange', updatedState);

  const copiedLink = await copyShareLink(cdp, {
    buttonText: '复制分享链接',
    storageKey: '__copiedCommandSafetyLink',
    label: 'command safety',
  });

  assert(copiedLink.search === '', 'command safety copied share URL kept query string', copiedLink);
  assert(copiedLink.hash === updatedHash, 'command safety copied share URL hash mismatch', copiedLink);

  pass('command safety deep link and share link stay in sync');
}

async function verifyMirrorShareLink(cdp, baseUrl) {
  const initialHash = '#mirrors?release=bookworm&mirror=official&components=full';
  const updatedHash = '#mirrors?release=trixie&mirror=ustc&components=firmware';
  const mirrorUrl = new URL(`/tools${initialHash}`, baseUrl);

  await navigateTo(cdp, mirrorUrl);
  await waitFor(cdp, "document.body && document.body.innerText.includes('复制镜像配置链接')", 'mirror tool');

  const initialState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const activeTab = buttons.find((button) => button.innerText.trim() === '镜像源');
      const release = buttons.find((button) => button.innerText.includes('Debian 12 Bookworm'));
      const mirror = buttons.find((button) => button.innerText.includes('deb.debian.org'));
      const components = buttons.find((button) => button.innerText.includes('完整组件'));
      const codeText = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '').join('\\n');
      return {
        hash: window.location.hash,
        activeTab: activeTab?.getAttribute('aria-pressed') || null,
        releasePressed: release?.getAttribute('aria-pressed') || null,
        mirrorPressed: mirror?.getAttribute('aria-pressed') || null,
        componentsPressed: components?.getAttribute('aria-pressed') || null,
        codeText,
      };
    })()`,
  );

  assert(initialState.hash === initialHash, 'mirror initial hash mismatch', initialState);
  assert(initialState.activeTab === 'true', 'mirror tab is not active', initialState);
  assert(initialState.releasePressed === 'true', 'mirror release was not loaded from hash', initialState);
  assert(initialState.mirrorPressed === 'true', 'mirror provider was not loaded from hash', initialState);
  assert(initialState.componentsPressed === 'true', 'mirror component mode was not loaded from hash', initialState);
  assert(initialState.codeText.includes('Suites: bookworm bookworm-updates'), 'mirror snippet did not use bookworm suites', initialState);
  assert(initialState.codeText.includes('URIs: https://deb.debian.org/debian'), 'mirror snippet did not use official archive URI', initialState);
  assert(
    initialState.codeText.includes('Components: main contrib non-free non-free-firmware'),
    'mirror snippet did not use full components',
    initialState,
  );

  await evaluate(
    cdp,
    `new Promise((resolve) => {
      window.location.hash = ${JSON.stringify(updatedHash.slice(1))};
      window.setTimeout(resolve, 350);
    })`,
    true,
  );

  const updatedState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const release = buttons.find((button) => button.innerText.includes('Debian 13 Trixie'));
      const mirror = buttons.find((button) => button.innerText.includes('USTC'));
      const components = buttons.find((button) => button.innerText.includes('main + firmware'));
      const codeText = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '').join('\\n');
      return {
        hash: window.location.hash,
        releasePressed: release?.getAttribute('aria-pressed') || null,
        mirrorPressed: mirror?.getAttribute('aria-pressed') || null,
        componentsPressed: components?.getAttribute('aria-pressed') || null,
        codeText,
      };
    })()`,
  );

  assert(updatedState.hash === updatedHash, 'mirror updated hash mismatch', updatedState);
  assert(updatedState.releasePressed === 'true', 'mirror release did not sync after hashchange', updatedState);
  assert(updatedState.mirrorPressed === 'true', 'mirror provider did not sync after hashchange', updatedState);
  assert(updatedState.componentsPressed === 'true', 'mirror component mode did not sync after hashchange', updatedState);
  assert(updatedState.codeText.includes('Suites: trixie trixie-updates'), 'mirror snippet did not use trixie suites', updatedState);
  assert(updatedState.codeText.includes('URIs: https://mirrors.ustc.edu.cn/debian'), 'mirror snippet did not use USTC archive URI', updatedState);
  assert(updatedState.codeText.includes('Components: main non-free-firmware'), 'mirror snippet did not use firmware components', updatedState);
  assert(!updatedState.codeText.includes('bookworm-updates'), 'mirror snippet retained stale bookworm suite', updatedState);

  const copiedLink = await copyShareLink(cdp, {
    buttonText: '复制镜像配置链接',
    storageKey: '__copiedMirrorLink',
    label: 'mirror',
  });

  assert(copiedLink.search === '', 'mirror copied share URL kept query string', copiedLink);
  assert(copiedLink.hash === updatedHash, 'mirror copied share URL hash mismatch', copiedLink);

  pass('mirror deep link and share link stay in sync');
}

async function verifyInstallShareLink(cdp, baseUrl) {
  const initialHash = '#install?device=server&goal=server&risk=low';
  const updatedHash = '#install?device=laptop&goal=ai&risk=balanced';
  const installUrl = new URL(`/tools${initialHash}`, baseUrl);

  await navigateTo(cdp, installUrl);
  await waitFor(cdp, "document.body && document.body.innerText.includes('复制安装配置链接')", 'install tool');

  const initialState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const activeTab = buttons.find((button) => button.innerText.trim() === '安装方式');
      const serverButtons = buttons.filter((button) => button.innerText.trim() === '服务器');
      const risk = buttons.find((button) => button.innerText.includes('最低风险'));
      const bodyText = document.body.innerText;
      return {
        hash: window.location.hash,
        activeTab: activeTab?.getAttribute('aria-pressed') || null,
        selectedServerButtonCount: serverButtons.filter(
          (button) => button.getAttribute('aria-pressed') === 'true',
        ).length,
        riskPressed: risk?.getAttribute('aria-pressed') || null,
        hasLowRiskTitle: bodyText.includes('先用虚拟机或 Live USB 验证'),
        hasLowRiskStep: bodyText.includes('下载 live 或 netinst 镜像'),
      };
    })()`,
  );

  assert(initialState.hash === initialHash, 'install initial hash mismatch', initialState);
  assert(initialState.activeTab === 'true', 'install tab is not active', initialState);
  assert(initialState.selectedServerButtonCount >= 2, 'install server device/goal values were not loaded from hash', initialState);
  assert(initialState.riskPressed === 'true', 'install risk was not loaded from hash', initialState);
  assert(initialState.hasLowRiskTitle, 'install result did not use low-risk recommendation title', initialState);
  assert(initialState.hasLowRiskStep, 'install result did not use low-risk next step', initialState);

  await evaluate(
    cdp,
    `new Promise((resolve) => {
      window.location.hash = ${JSON.stringify(updatedHash.slice(1))};
      window.setTimeout(resolve, 350);
    })`,
    true,
  );

  const updatedState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const device = buttons.find((button) => button.innerText.includes('笔记本'));
      const goal = buttons.find((button) => button.innerText.includes('本地 AI'));
      const risk = buttons.find((button) => button.innerText.trim() === '平衡');
      const bodyText = document.body.innerText;
      return {
        hash: window.location.hash,
        devicePressed: device?.getAttribute('aria-pressed') || null,
        goalPressed: goal?.getAttribute('aria-pressed') || null,
        riskPressed: risk?.getAttribute('aria-pressed') || null,
        hasAiTitle: bodyText.includes('先完整安装，再处理 GPU 驱动'),
        hasAiStep: bodyText.includes('按硬件与驱动中心处理 GPU'),
        hasOldLowRiskTitle: bodyText.includes('先用虚拟机或 Live USB 验证'),
      };
    })()`,
  );

  assert(updatedState.hash === updatedHash, 'install updated hash mismatch', updatedState);
  assert(updatedState.devicePressed === 'true', 'install device did not sync after hashchange', updatedState);
  assert(updatedState.goalPressed === 'true', 'install goal did not sync after hashchange', updatedState);
  assert(updatedState.riskPressed === 'true', 'install risk did not sync after hashchange', updatedState);
  assert(updatedState.hasAiTitle, 'install result did not use AI recommendation title', updatedState);
  assert(updatedState.hasAiStep, 'install result did not use AI next step', updatedState);
  assert(!updatedState.hasOldLowRiskTitle, 'install result retained stale low-risk title', updatedState);

  const copiedLink = await copyShareLink(cdp, {
    buttonText: '复制安装配置链接',
    storageKey: '__copiedInstallLink',
    label: 'install',
  });

  assert(copiedLink.search === '', 'install copied share URL kept query string', copiedLink);
  assert(copiedLink.hash === updatedHash, 'install copied share URL hash mismatch', copiedLink);

  pass('install deep link and share link stay in sync');
}

async function verifyDesktopShareLink(cdp, baseUrl) {
  const initialHash = '#desktop?hardware=old&workflow=light';
  const updatedHash = '#desktop?hardware=modern&workflow=creative';
  const desktopUrl = new URL(`/tools${initialHash}`, baseUrl);

  await navigateTo(cdp, desktopUrl);
  await waitFor(cdp, "document.body && document.body.innerText.includes('复制桌面配置链接')", 'desktop tool');

  const initialState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const activeTab = buttons.find((button) => button.innerText.trim() === '桌面环境');
      const hardware = buttons.find((button) => button.innerText.includes('旧机器 / 4GB RAM'));
      const workflow = buttons.find((button) => button.innerText.includes('轻量优先'));
      const bodyText = document.body.innerText;
      const codeText = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '').join('\\n');
      return {
        hash: window.location.hash,
        activeTab: activeTab?.getAttribute('aria-pressed') || null,
        hardwarePressed: hardware?.getAttribute('aria-pressed') || null,
        workflowPressed: workflow?.getAttribute('aria-pressed') || null,
        hasXfceTitle: bodyText.includes('推荐: Xfce'),
        hasXfceReason: bodyText.includes('资源占用低，行为稳定'),
        codeText,
      };
    })()`,
  );

  assert(initialState.hash === initialHash, 'desktop initial hash mismatch', initialState);
  assert(initialState.activeTab === 'true', 'desktop tab is not active', initialState);
  assert(initialState.hardwarePressed === 'true', 'desktop hardware was not loaded from hash', initialState);
  assert(initialState.workflowPressed === 'true', 'desktop workflow was not loaded from hash', initialState);
  assert(initialState.hasXfceTitle, 'desktop result did not use Xfce recommendation title', initialState);
  assert(initialState.hasXfceReason, 'desktop result did not use Xfce recommendation reason', initialState);
  assert(initialState.codeText.includes('sudo apt install task-xfce-desktop'), 'desktop result did not use Xfce package command', initialState);

  await evaluate(
    cdp,
    `new Promise((resolve) => {
      window.location.hash = ${JSON.stringify(updatedHash.slice(1))};
      window.setTimeout(resolve, 350);
    })`,
    true,
  );

  const updatedState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const hardware = buttons.find((button) => button.innerText.includes('现代机器 / 16GB+'));
      const workflow = buttons.find((button) => button.innerText.includes('触控板 / 创作'));
      const bodyText = document.body.innerText;
      const codeText = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '').join('\\n');
      return {
        hash: window.location.hash,
        hardwarePressed: hardware?.getAttribute('aria-pressed') || null,
        workflowPressed: workflow?.getAttribute('aria-pressed') || null,
        hasGnomeTitle: bodyText.includes('推荐: GNOME'),
        hasGnomeReason: bodyText.includes('Wayland 支持成熟'),
        hasOldXfceCommand: codeText.includes('sudo apt install task-xfce-desktop'),
        codeText,
      };
    })()`,
  );

  assert(updatedState.hash === updatedHash, 'desktop updated hash mismatch', updatedState);
  assert(updatedState.hardwarePressed === 'true', 'desktop hardware did not sync after hashchange', updatedState);
  assert(updatedState.workflowPressed === 'true', 'desktop workflow did not sync after hashchange', updatedState);
  assert(updatedState.hasGnomeTitle, 'desktop result did not use GNOME recommendation title', updatedState);
  assert(updatedState.hasGnomeReason, 'desktop result did not use GNOME creative recommendation reason', updatedState);
  assert(updatedState.codeText.includes('sudo apt install task-gnome-desktop'), 'desktop result did not use GNOME package command', updatedState);
  assert(!updatedState.hasOldXfceCommand, 'desktop result retained stale Xfce package command', updatedState);

  const copiedLink = await copyShareLink(cdp, {
    buttonText: '复制桌面配置链接',
    storageKey: '__copiedDesktopLink',
    label: 'desktop',
  });

  assert(copiedLink.search === '', 'desktop copied share URL kept query string', copiedLink);
  assert(copiedLink.hash === updatedHash, 'desktop copied share URL hash mismatch', copiedLink);

  pass('desktop deep link and share link stay in sync');
}

async function verifyPartitionShareLink(cdp, baseUrl) {
  const initialHash = '#partitions?disk=multi&boot=dual&encryption=full';
  const updatedHash = '#partitions?disk=standard&boot=single&encryption=home';
  const partitionUrl = new URL(`/tools${initialHash}`, baseUrl);

  await navigateTo(cdp, partitionUrl);
  await waitFor(cdp, "document.body && document.body.innerText.includes('复制分区配置链接')", 'partition tool');

  const initialState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const activeTab = buttons.find((button) => button.innerText.trim() === '分区方案');
      const disk = buttons.find((button) => button.innerText.includes('多磁盘'));
      const boot = buttons.find((button) => button.innerText.includes('与 Windows 双系统'));
      const encryption = buttons.find((button) => button.innerText.includes('全盘加密'));
      const tableText = Array.from(document.querySelectorAll('table')).map((table) => table.textContent || '').join('\\n');
      return {
        hash: window.location.hash,
        activeTab: activeTab?.getAttribute('aria-pressed') || null,
        diskPressed: disk?.getAttribute('aria-pressed') || null,
        bootPressed: boot?.getAttribute('aria-pressed') || null,
        encryptionPressed: encryption?.getAttribute('aria-pressed') || null,
        tableText,
      };
    })()`,
  );

  assert(initialState.hash === initialHash, 'partition initial hash mismatch', initialState);
  assert(initialState.activeTab === 'true', 'partition tab is not active', initialState);
  assert(initialState.diskPressed === 'true', 'partition disk was not loaded from hash', initialState);
  assert(initialState.bootPressed === 'true', 'partition boot mode was not loaded from hash', initialState);
  assert(initialState.encryptionPressed === 'true', 'partition encryption mode was not loaded from hash', initialState);
  assert(initialState.tableText.includes('512 MB - 1 GB existing EFI'), 'partition table did not use dual-boot EFI sizing', initialState);
  assert(initialState.tableText.includes('全盘加密时建议单独保留'), 'partition table did not use full encryption /boot note', initialState);
  assert(initialState.tableText.includes('数据盘'), 'partition table did not include multi-disk data row', initialState);

  await evaluate(
    cdp,
    `new Promise((resolve) => {
      window.location.hash = ${JSON.stringify(updatedHash.slice(1))};
      window.setTimeout(resolve, 350);
    })`,
    true,
  );

  const updatedState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const disk = buttons.find((button) => button.innerText.includes('常规 512GB - 1TB'));
      const boot = buttons.find((button) => button.innerText.includes('只装 Debian'));
      const encryption = buttons.find((button) => button.innerText.includes('只保护用户数据'));
      const tableText = Array.from(document.querySelectorAll('table')).map((table) => table.textContent || '').join('\\n');
      return {
        hash: window.location.hash,
        diskPressed: disk?.getAttribute('aria-pressed') || null,
        bootPressed: boot?.getAttribute('aria-pressed') || null,
        encryptionPressed: encryption?.getAttribute('aria-pressed') || null,
        tableText,
      };
    })()`,
  );

  assert(updatedState.hash === updatedHash, 'partition updated hash mismatch', updatedState);
  assert(updatedState.diskPressed === 'true', 'partition disk did not sync after hashchange', updatedState);
  assert(updatedState.bootPressed === 'true', 'partition boot mode did not sync after hashchange', updatedState);
  assert(updatedState.encryptionPressed === 'true', 'partition encryption mode did not sync after hashchange', updatedState);
  assert(updatedState.tableText.includes('512 MB - 1 GB EFI'), 'partition table did not use single-boot EFI sizing', updatedState);
  assert(updatedState.tableText.includes('可合并到 /'), 'partition table did not use non-full-encryption /boot size', updatedState);
  assert(updatedState.tableText.includes('50-80 GB'), 'partition table did not use standard disk root sizing', updatedState);
  assert(!updatedState.tableText.includes('数据盘'), 'partition table retained stale multi-disk data row', updatedState);
  assert(!updatedState.tableText.includes('existing EFI'), 'partition table retained stale dual-boot EFI text', updatedState);

  const copiedLink = await copyShareLink(cdp, {
    buttonText: '复制分区配置链接',
    storageKey: '__copiedPartitionLink',
    label: 'partition',
  });

  assert(copiedLink.search === '', 'partition copied share URL kept query string', copiedLink);
  assert(copiedLink.hash === updatedHash, 'partition copied share URL hash mismatch', copiedLink);

  pass('partition deep link and share link stay in sync');
}

async function verifyTroubleshootShareLink(cdp, baseUrl) {
  const initialHash = '#troubleshoot?symptom=display';
  const updatedHash = '#troubleshoot?symptom=performance';
  const troubleshootUrl = new URL(`/tools${initialHash}`, baseUrl);

  await navigateTo(cdp, troubleshootUrl);
  await waitFor(cdp, "document.body && document.body.innerText.includes('复制排障配置链接')", 'troubleshooting tool');

  const initialState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const activeTab = buttons.find((button) => button.innerText.trim() === '排障向导');
      const symptom = buttons.find((button) => button.innerText.includes('黑屏、花屏或外接显示器异常'));
      const bodyText = document.body.innerText;
      const codeText = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '').join('\\n');
      return {
        hash: window.location.hash,
        activeTab: activeTab?.getAttribute('aria-pressed') || null,
        symptomPressed: symptom?.getAttribute('aria-pressed') || null,
        codeText,
        hasNvidiaLink: bodyText.includes('NVIDIA 与 Optimus'),
        hasGraphicsLink: bodyText.includes('AMD / Intel 图形'),
      };
    })()`,
  );

  assert(initialState.hash === initialHash, 'troubleshooting initial hash mismatch', initialState);
  assert(initialState.activeTab === 'true', 'troubleshooting tab is not active', initialState);
  assert(initialState.symptomPressed === 'true', 'troubleshooting symptom was not loaded from hash', initialState);
  assert(initialState.codeText.includes('lspci -nnk'), 'troubleshooting display checks did not include lspci', initialState);
  assert(
    initialState.codeText.includes('dmesg | grep -iE "drm|nvidia|amdgpu|i915|firmware"'),
    'troubleshooting display checks did not include graphics dmesg command',
    initialState,
  );
  assert(initialState.hasNvidiaLink, 'troubleshooting display result did not include NVIDIA link', initialState);
  assert(initialState.hasGraphicsLink, 'troubleshooting display result did not include graphics link', initialState);

  await evaluate(
    cdp,
    `new Promise((resolve) => {
      window.location.hash = ${JSON.stringify(updatedHash.slice(1))};
      window.setTimeout(resolve, 350);
    })`,
    true,
  );

  const updatedState = await evaluate(
    cdp,
    `(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const symptom = buttons.find((button) => button.innerText.includes('系统卡顿或资源异常'));
      const bodyText = document.body.innerText;
      const codeText = Array.from(document.querySelectorAll('pre, code')).map((element) => element.textContent || '').join('\\n');
      return {
        hash: window.location.hash,
        symptomPressed: symptom?.getAttribute('aria-pressed') || null,
        codeText,
        hasPerformanceLink: bodyText.includes('性能排查'),
        hasOldNvidiaLink: bodyText.includes('NVIDIA 与 Optimus'),
        hasOldGraphicsCommand: codeText.includes('drm|nvidia|amdgpu|i915|firmware'),
      };
    })()`,
  );

  assert(updatedState.hash === updatedHash, 'troubleshooting updated hash mismatch', updatedState);
  assert(updatedState.symptomPressed === 'true', 'troubleshooting symptom did not sync after hashchange', updatedState);
  assert(updatedState.codeText.includes('uptime'), 'troubleshooting performance checks did not include uptime', updatedState);
  assert(updatedState.codeText.includes('free -h'), 'troubleshooting performance checks did not include memory check', updatedState);
  assert(updatedState.codeText.includes('journalctl -b -p warning --no-pager'), 'troubleshooting performance checks did not include journal warning check', updatedState);
  assert(updatedState.hasPerformanceLink, 'troubleshooting performance result did not include performance link', updatedState);
  assert(!updatedState.hasOldNvidiaLink, 'troubleshooting result retained stale display link', updatedState);
  assert(!updatedState.hasOldGraphicsCommand, 'troubleshooting checks retained stale display command', updatedState);

  const copiedLink = await copyShareLink(cdp, {
    buttonText: '复制排障配置链接',
    storageKey: '__copiedTroubleshootLink',
    label: 'troubleshooting',
  });

  assert(copiedLink.search === '', 'troubleshooting copied share URL kept query string', copiedLink);
  assert(copiedLink.hash === updatedHash, 'troubleshooting copied share URL hash mismatch', copiedLink);

  pass('troubleshooting deep link and share link stay in sync');
}

async function copyEnglishToolShareLink(cdp, buttonText) {
  return copyShareLink(cdp, {
    buttonText,
    storageKey: '__copiedEnglishToolLink',
    label: 'English',
  });
}

async function verifyEnglishToolShareLinkPaths(cdp, baseUrl) {
  const tests = [
    {
      name: 'English command safety',
      path: '/en/tools#command-safety?command=sudo%20apt%20update',
      buttonText: 'Copy share link',
    },
    {
      name: 'English AI Skills',
      path: '/en/tools#ai-skills?target=agents&replace=true',
      buttonText: 'Copy Skills config link',
    },
    {
      name: 'English mirror',
      path: '/en/tools#mirrors?release=bookworm&mirror=debian-de&components=firmware',
      buttonText: 'Copy mirror config link',
    },
    {
      name: 'English install',
      path: '/en/tools#install?device=laptop&goal=ai&risk=balanced',
      buttonText: 'Copy install config link',
    },
    {
      name: 'English desktop',
      path: '/en/tools#desktop?hardware=modern&workflow=creative',
      buttonText: 'Copy desktop config link',
    },
    {
      name: 'English partition',
      path: '/en/tools#partitions?disk=standard&boot=single&encryption=home',
      buttonText: 'Copy partition config link',
    },
    {
      name: 'English troubleshooting',
      path: '/en/tools#troubleshoot?symptom=performance',
      buttonText: 'Copy troubleshooting link',
    },
  ];

  for (const test of tests) {
    const toolUrl = new URL(test.path, baseUrl);

    await navigateTo(cdp, toolUrl);
    await waitFor(
      cdp,
      `document.body && document.body.innerText.includes(${JSON.stringify(test.buttonText)})`,
      `${test.name} share button`,
    );

    const copiedLink = await copyEnglishToolShareLink(cdp, test.buttonText);

    assert(copiedLink.pathname === '/en/tools', `${test.name} copied share URL did not keep English path`, copiedLink);
    assert(copiedLink.search === '', `${test.name} copied share URL kept query string`, copiedLink);
    assert(copiedLink.hash === toolUrl.hash, `${test.name} copied share URL hash mismatch`, copiedLink);
  }

  pass('English tool share links keep localized paths');
}

async function verifyFallbackLocaleToolShareLinkPaths(cdp, baseUrl) {
  const tests = [
    {
      locale: 'de',
      path: '/de/tools#mirrors?release=bookworm&mirror=debian-de&components=firmware',
      buttonText: 'Copy mirror config link',
    },
    {
      locale: 'es',
      path: '/es/tools#install?device=laptop&goal=ai&risk=balanced',
      buttonText: 'Copy install config link',
    },
    {
      locale: 'fr',
      path: '/fr/tools#desktop?hardware=modern&workflow=creative',
      buttonText: 'Copy desktop config link',
    },
    {
      locale: 'ja',
      path: '/ja/tools#partitions?disk=standard&boot=single&encryption=home',
      buttonText: 'Copy partition config link',
    },
    {
      locale: 'ko',
      path: '/ko/tools#troubleshoot?symptom=performance',
      buttonText: 'Copy troubleshooting link',
    },
    {
      locale: 'pt',
      path: '/pt/tools#ai-skills?target=agents&replace=true',
      buttonText: 'Copy Skills config link',
    },
  ];

  for (const test of tests) {
    const toolUrl = new URL(test.path, baseUrl);

    await navigateTo(cdp, toolUrl);
    await waitFor(
      cdp,
      `document.body && document.body.innerText.includes(${JSON.stringify(test.buttonText)})`,
      `${test.locale} fallback tool share button`,
    );

    const copiedLink = await copyEnglishToolShareLink(cdp, test.buttonText);

    assert(
      copiedLink.pathname === `/${test.locale}/tools`,
      `${test.locale} copied share URL did not keep localized fallback path`,
      copiedLink,
    );
    assert(copiedLink.search === '', `${test.locale} copied share URL kept query string`, copiedLink);
    assert(copiedLink.hash === toolUrl.hash, `${test.locale} copied share URL hash mismatch`, copiedLink);
  }

  pass('Fallback locale tool share links keep localized paths');
}

async function run() {
  let baseUrl;
  try {
    baseUrl = resolveBaseUrl();
    console.log(`[browser-smoke] base URL ${baseUrl.toString()}`);
  } catch (error) {
    fail(`invalid base URL: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }

  const browserPath = resolveBrowserPath();
  if (!browserPath) {
    fail(`no Chromium-compatible browser found; checked ${knownBrowserPaths.join(', ')}`);
    return;
  }

  const port = 9_333 + Math.floor(Math.random() * 1_000);
  const userDataDir = mkdtempSync(join(tmpdir(), 'debianclub-browser-smoke-'));
  const browser = spawn(
    browserPath,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  let cdp;
  try {
    const wsUrl = await waitForBrowserTarget(port, browser);
    cdp = await connectToCdp(wsUrl);
    await runCheck('search UI', cdp, () => verifySearchUi(cdp, baseUrl));
    await runCheck('AI Skills share link', cdp, () => verifyAiSkillsShareLink(cdp, baseUrl));
    await runCheck('command safety share link', cdp, () => verifyCommandSafetyShareLink(cdp, baseUrl));
    await runCheck('mirror share link', cdp, () => verifyMirrorShareLink(cdp, baseUrl));
    await runCheck('install share link', cdp, () => verifyInstallShareLink(cdp, baseUrl));
    await runCheck('desktop share link', cdp, () => verifyDesktopShareLink(cdp, baseUrl));
    await runCheck('partition share link', cdp, () => verifyPartitionShareLink(cdp, baseUrl));
    await runCheck('troubleshooting share link', cdp, () => verifyTroubleshootShareLink(cdp, baseUrl));
    await runCheck('English tool share links', cdp, () => verifyEnglishToolShareLinkPaths(cdp, baseUrl));
    await runCheck('fallback locale tool share links', cdp, () => verifyFallbackLocaleToolShareLinkPaths(cdp, baseUrl));
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  } finally {
    cdp?.close();
    await terminateBrowser(browser);
    rmSync(userDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

await run();

if (failures.length > 0) {
  console.error(`[browser-smoke] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[browser-smoke] all browser checks passed');
