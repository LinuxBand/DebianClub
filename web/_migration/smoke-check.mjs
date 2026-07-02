const defaultBaseUrl = 'http://localhost:43018';
const timeoutMs = 10_000;

const requiredLocales = ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];
const localizedEntryPages = ['tools', 'scenarios', 'hardware', 'versions', 'release-readiness', 'deployment'];

function localeRoute(locale, page = '') {
  const path = page ? `/${page}` : '';
  return locale === 'zh' ? path || '/' : `/${locale}${path}`;
}

const routeChecks = [
  '/',
  '/en',
  '/ai/skills',
  '/en/ai/skills',
  ...localizedEntryPages.flatMap((page) => requiredLocales.map((locale) => localeRoute(locale, page))),
  '/scenarios/nas-file-sharing',
  '/en/scenarios/nas-file-sharing',
  '/scenarios/local-ai-inference',
  '/en/scenarios/local-ai-inference',
  '/scenarios/ops-jump-box',
  '/en/scenarios/ops-jump-box',
];

const toolHashRouteChecks = [
  '/tools#command-safety',
  '/en/tools#command-safety',
  '/tools#command-safety?command=sudo%20apt%20update',
  '/en/tools#command-safety?command=sudo%20apt%20update',
  '/tools#ai-skills',
  '/en/tools#ai-skills',
];

const searchChecks = requiredLocales.map((locale) => ({ path: `/api/search/${locale}`, locale }));

const textChecks = [
  { path: '/sitemap.xml', includes: '<urlset' },
  { path: '/robots.txt', includes: 'Sitemap:' },
];

const failures = [];

function resolveBaseUrl() {
  const arg = process.argv.find((value) => value.startsWith('--url='));
  const raw = arg?.slice('--url='.length) || process.env.SMOKE_BASE_URL || defaultBaseUrl;
  const url = new URL(raw);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`SMOKE_BASE_URL must use http or https, got ${url.protocol}`);
  }

  return url;
}

function buildUrl(path) {
  return new URL(path, baseUrl).toString();
}

function fail(message) {
  failures.push(message);
  console.error(`[smoke-check] FAIL ${message}`);
}

function pass(message) {
  console.log(`[smoke-check] OK   ${message}`);
}

let baseUrl;
try {
  baseUrl = resolveBaseUrl();
} catch (error) {
  fail(`invalid base URL: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

async function fetchWithTimeout(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(buildUrl(path), {
      redirect: 'follow',
      signal: controller.signal,
    });
    const body = await response.text();
    return { response, body };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchWithRetry(path) {
  const attempts = 12;
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetchWithTimeout(path);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw lastError;
}

async function checkHtmlRoute(path) {
  try {
    const { response, body } = await fetchWithRetry(path);
    if (response.status !== 200) {
      fail(`${path} returned ${response.status}`);
      return;
    }

    if (!body.includes('<html') || !body.includes('Debian.Club')) {
      fail(`${path} does not look like a Debian.Club HTML page`);
      return;
    }

    pass(`${path} returned HTML (${body.length} bytes)`);
  } catch (error) {
    fail(`${path} request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkSearchShard({ path, locale }) {
  try {
    const { response, body } = await fetchWithRetry(path);
    if (response.status !== 200) {
      fail(`${path} returned ${response.status}`);
      return;
    }

    let payload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      fail(`${path} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
      return;
    }

    if (payload?.type !== 'i18n' || !payload?.data?.[locale]) {
      fail(`${path} does not contain locale shard ${locale}`);
      return;
    }

    pass(`${path} returned locale shard ${locale} (${body.length} bytes)`);
  } catch (error) {
    fail(`${path} request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkTextRoute({ path, includes }) {
  try {
    const { response, body } = await fetchWithRetry(path);
    if (response.status !== 200) {
      fail(`${path} returned ${response.status}`);
      return;
    }

    if (!body.includes(includes)) {
      fail(`${path} does not include ${includes}`);
      return;
    }

    pass(`${path} returned expected text`);
  } catch (error) {
    fail(`${path} request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log(`[smoke-check] base URL ${baseUrl.toString()}`);

for (const path of routeChecks) {
  await checkHtmlRoute(path);
}

// URL fragments stay client-side, but these checks keep shareable tool links in the release smoke set.
for (const path of toolHashRouteChecks) {
  await checkHtmlRoute(path);
}

for (const check of searchChecks) {
  await checkSearchShard(check);
}

for (const check of textChecks) {
  await checkTextRoute(check);
}

if (failures.length > 0) {
  console.error(`[smoke-check] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[smoke-check] all smoke checks passed');
