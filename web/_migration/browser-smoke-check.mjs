import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const defaultBaseUrl = 'http://localhost:43018';
const browserStartupTimeoutMs = 10_000;
const pageTimeoutMs = 15_000;
const cdpCommandTimeoutMs = 10_000;
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

async function waitForBrowserTarget(port) {
  const deadline = Date.now() + browserStartupTimeoutMs;

  while (Date.now() < deadline) {
    try {
      const targets = await fetchJson(`http://127.0.0.1:${port}/json/list`);
      const page = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chromium opens the debugging endpoint after process startup.
    }

    await sleep(100);
  }

  throw new Error('timed out waiting for browser debugging target');
}

async function connectToCdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  const events = [];

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result || {});
      return;
    }

    if (message.method) events.push(message.method);
  });

  function send(method, params = {}) {
    const id = nextId;
    nextId += 1;
    ws.send(JSON.stringify({ id, method, params }));

    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (!pending.has(id)) return;
        pending.delete(id);
        reject(new Error(`timed out waiting for ${method}`));
      }, cdpCommandTimeoutMs);
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

async function verifySearchUi(cdp, baseUrl) {
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Page.navigate', { url: baseUrl.toString() });
  await cdp.waitForEvent('Page.loadEventFired');

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

  await cdp.send('Page.navigate', { url: aiSkillsUrl.toString() });
  await cdp.waitForEvent('Page.loadEventFired');
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

  const copiedLink = await evaluate(
    cdp,
    `new Promise((resolve, reject) => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (value) => { window.__copiedAiSkillsLink = value; } },
      });
      const button = Array.from(document.querySelectorAll('button')).find((item) => item.innerText.includes('复制 Skills 配置链接'));
      if (!button) {
        reject(new Error('AI Skills share button not found'));
        return;
      }
      button.click();
      window.setTimeout(() => {
        const copiedUrl = new URL(window.__copiedAiSkillsLink);
        resolve({ href: window.__copiedAiSkillsLink, search: copiedUrl.search, hash: copiedUrl.hash });
      }, 250);
    })`,
    true,
  );

  assert(copiedLink.search === '', 'AI Skills copied share URL kept query string', copiedLink);
  assert(copiedLink.hash === '#ai-skills?target=local&replace=false', 'AI Skills copied share URL hash mismatch', copiedLink);

  pass('AI Skills deep link and share link stay in sync');
}

async function verifyCommandSafetyShareLink(cdp, baseUrl) {
  const initialHash = `#command-safety?command=${encodeURIComponent(safetyInitialCommand)}`;
  const updatedHash = `#command-safety?command=${encodeURIComponent(safetyUpdatedCommand)}`;
  const commandSafetyUrl = new URL(`/tools${initialHash}`, baseUrl);

  await cdp.send('Page.navigate', { url: commandSafetyUrl.toString() });
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

  const copiedLink = await evaluate(
    cdp,
    `new Promise((resolve, reject) => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async (value) => { window.__copiedCommandSafetyLink = value; } },
      });
      const button = Array.from(document.querySelectorAll('button')).find((item) => item.innerText.includes('复制分享链接'));
      if (!button) {
        reject(new Error('command safety share button not found'));
        return;
      }
      button.click();
      window.setTimeout(() => {
        const copiedUrl = new URL(window.__copiedCommandSafetyLink);
        resolve({ href: window.__copiedCommandSafetyLink, search: copiedUrl.search, hash: copiedUrl.hash });
      }, 250);
    })`,
    true,
  );

  assert(copiedLink.search === '', 'command safety copied share URL kept query string', copiedLink);
  assert(copiedLink.hash === updatedHash, 'command safety copied share URL hash mismatch', copiedLink);

  pass('command safety deep link and share link stay in sync');
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
    const wsUrl = await waitForBrowserTarget(port);
    cdp = await connectToCdp(wsUrl);
    await verifySearchUi(cdp, baseUrl);
    await verifyAiSkillsShareLink(cdp, baseUrl);
    await verifyCommandSafetyShareLink(cdp, baseUrl);
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
