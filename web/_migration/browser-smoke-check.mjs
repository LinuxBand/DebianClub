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
