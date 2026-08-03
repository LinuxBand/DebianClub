const defaultBaseUrl = 'http://localhost:43018';
const timeoutMs = 10_000;
const searchShardTimeoutMs = 45_000;

const requiredLocales = ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];
const localizedEntryPages = ['tools', 'scenarios', 'hardware', 'versions', 'release-readiness', 'deployment'];
const bilingualOperationalPages = ['production-observability', 'content-freshness', 'i18n-quality'];

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
  ...bilingualOperationalPages.flatMap((page) => ['zh', 'en'].map((locale) => localeRoute(locale, page))),
  '/scenarios/nas-file-sharing',
  '/en/scenarios/nas-file-sharing',
  '/scenarios/local-ai-inference',
  '/en/scenarios/local-ai-inference',
  '/scenarios/ops-jump-box',
  '/en/scenarios/ops-jump-box',
];

const toolHashRouteChecks = [
  '/tools/pkgseek',
  '/en/tools/pkgseek',
  '/tools#command-safety',
  '/en/tools#command-safety',
  '/tools#command-safety?command=sudo%20apt%20update',
  '/en/tools#command-safety?command=sudo%20apt%20update',
  '/tools#ai-skills',
  '/en/tools#ai-skills',
  '/tools#ai-skills?target=agents&replace=true',
  '/en/tools#ai-skills?target=local&replace=false',
  '/tools#mirrors?release=bookworm&mirror=official&components=full',
  '/en/tools#mirrors?release=bookworm&mirror=debian-de&components=firmware',
  '/tools#install?device=server&goal=server&risk=low',
  '/en/tools#install?device=laptop&goal=ai&risk=balanced',
  '/tools#desktop?hardware=old&workflow=light',
  '/en/tools#desktop?hardware=modern&workflow=creative',
  '/tools#partitions?disk=multi&boot=dual&encryption=full',
  '/en/tools#partitions?disk=standard&boot=single&encryption=home',
  '/tools#troubleshoot?symptom=display',
  '/en/tools#troubleshoot?symptom=performance',
  '/tools#upgrade?current=bookworm&target=trixie&exposure=public',
  '/en/tools#upgrade?current=bullseye&target=bookworm&exposure=internal',
];

const searchChecks = requiredLocales.map((locale) => {
  const zhContentCheck =
    locale === 'zh'
      ? {
          requiredIds: ['/tools', '/ai/skills'],
          requiredTerms: ['Debian 交互工具箱', 'DebianClub AI Skills'],
        }
      : {};
  const enContentCheck =
    locale === 'en'
      ? {
          requiredIds: ['/en/tools', '/en/ai/skills'],
          requiredTerms: ['Debian Interactive Tools', 'DebianClub AI Skills'],
        }
      : {};

  return { path: `/api/search/${locale}`, locale, ...zhContentCheck, ...enContentCheck };
});

const textChecks = [
  { path: '/sitemap.xml', includes: '<urlset' },
  { path: '/robots.txt', includes: 'Sitemap:' },
];

const aiReadableTextChecks = [
  {
    path: '/llms.txt',
    minBytes: 50_000,
    includes: ['# Docs', '[DebianClub AI Skills](/ai/skills)', '[DebianClub AI Skills](/en/ai/skills)'],
  },
  {
    path: '/llms-full.txt',
    minBytes: 500_000,
    includes: ['# DebianClub AI Skills (/ai/skills)', '# 安装与分发 (/ai/skills/install)', '/tools#ai-skills?target=agents&replace=true'],
  },
];

const responseHeaderChecks = [
  {
    path: '/',
    headers: [
      ['x-content-type-options', 'nosniff'],
      ['referrer-policy', 'strict-origin-when-cross-origin'],
      ['x-frame-options', 'SAMEORIGIN'],
      ['permissions-policy', 'camera=(), microphone=(), geolocation=()'],
    ],
  },
  {
    path: '/api/search/zh',
    headers: [
      ['content-type', 'application/json; charset=utf-8'],
      ['cache-control', 'public, max-age=3600'],
      ['x-content-type-options', 'nosniff'],
    ],
  },
  {
    path: '/skills.json',
    headers: [
      ['content-type', 'application/json; charset=utf-8'],
      ['cache-control', 'public, max-age=3600'],
      ['x-content-type-options', 'nosniff'],
    ],
  },
  {
    path: '/llms.txt',
    headers: [
      ['content-type', 'text/plain; charset=utf-8'],
      ['cache-control', 'public, max-age=3600'],
      ['x-content-type-options', 'nosniff'],
    ],
  },
  {
    path: '/llms-full.txt',
    headers: [
      ['content-type', 'text/plain; charset=utf-8'],
      ['cache-control', 'public, max-age=3600'],
      ['x-content-type-options', 'nosniff'],
    ],
  },
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

async function fetchWithTimeout(path, requestTimeoutMs = timeoutMs, requestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(buildUrl(path), {
      redirect: 'follow',
      ...requestInit,
      signal: controller.signal,
    });
    const body = requestInit.method === 'HEAD' ? '' : await response.text();
    return { response, body };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchWithRetry(path, { attempts = 12, requestTimeoutMs = timeoutMs, requestInit = {} } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetchWithTimeout(path, requestTimeoutMs, requestInit);
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 500));
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

async function checkSearchShard({ path, locale, requiredIds = [], requiredTerms = [] }) {
  try {
    const { response, body } = await fetchWithRetry(path, { attempts: 3, requestTimeoutMs: searchShardTimeoutMs });
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

    const shard = payload?.data?.[locale];
    if (payload?.type !== 'i18n' || !shard) {
      fail(`${path} does not contain locale shard ${locale}`);
      return;
    }

    const ids = shard?.internalDocumentIDStore?.internalIdToId;
    for (const id of requiredIds) {
      if (!Array.isArray(ids) || !ids.includes(id)) {
        fail(`${path} search shard is missing ${id}`);
        return;
      }
    }

    const serializedShard = requiredTerms.length ? JSON.stringify(shard) : '';
    for (const term of requiredTerms) {
      if (!serializedShard.includes(term)) {
        fail(`${path} search shard is missing ${term}`);
        return;
      }
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

async function checkAiSkillsRegistry() {
  try {
    const { response, body } = await fetchWithRetry('/skills.json');
    if (response.status !== 200) {
      fail(`/skills.json returned ${response.status}`);
      return;
    }

    let registry;
    try {
      registry = JSON.parse(body);
    } catch (error) {
      fail(`/skills.json is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
      return;
    }

    const skill = registry?.skills?.find((item) => item?.name === 'debian-linux-reliability');
    if (registry?.schema_version !== 1 || registry?.source !== 'DebianClub' || !skill) {
      fail('/skills.json does not contain the DebianClub skill registry contract');
      return;
    }

    if (
      skill.entrypoint !== 'SKILL.md' ||
      skill.distribution?.registry_route !== '/skills.json' ||
      !skill.default_safety?.includes('Read-only') ||
      !skill.localized?.zh?.default_safety?.includes('默认只读')
    ) {
      fail('/skills.json Debian reliability skill metadata is incomplete');
      return;
    }

    const requiredModules = ['apt-safe', 'command-safety', 'systemd-troubleshoot', 'gpu-drivers', 'security-audit'];
    for (const moduleName of requiredModules) {
      if (!Array.isArray(skill.modules) || !skill.modules.includes(moduleName)) {
        fail(`/skills.json Debian reliability skill is missing module ${moduleName}`);
        return;
      }
    }

    pass(`/skills.json returned DebianClub skills registry (${body.length} bytes)`);
  } catch (error) {
    fail(`/skills.json request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkAiReadableText({ path, includes, minBytes }) {
  try {
    const { response, body } = await fetchWithRetry(path);
    if (response.status !== 200) {
      fail(`${path} returned ${response.status}`);
      return;
    }

    if (body.length < minBytes) {
      fail(`${path} is too small (${body.length} bytes, expected at least ${minBytes})`);
      return;
    }

    for (const needle of includes) {
      if (!body.includes(needle)) {
        fail(`${path} does not include ${needle}`);
        return;
      }
    }

    pass(`${path} returned AI-readable text (${body.length} bytes)`);
  } catch (error) {
    fail(`${path} request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function shouldCheckResponseHeaders() {
  if (process.env.SMOKE_CHECK_HEADERS === '1') return true;
  if (process.env.SMOKE_CHECK_HEADERS === '0') return false;

  return baseUrl.protocol === 'https:';
}

function firstStaticChunkPath(body) {
  return body.match(/["'](\/_next\/static\/chunks\/[^"']+\.js)["']/)?.[1] || null;
}

async function checkResponseHeaders({ path, headers }) {
  try {
    const { response } = await fetchWithRetry(path, { attempts: 3, requestInit: { method: 'HEAD' } });
    if (response.status !== 200) {
      fail(`${path} header check returned ${response.status}`);
      return;
    }

    for (const [name, expectedValue] of headers) {
      const actualValue = response.headers.get(name);
      if (!actualValue?.includes(expectedValue)) {
        fail(`${path} header ${name} expected ${expectedValue}, got ${actualValue || '<missing>'}`);
        return;
      }
    }

    pass(`${path} returned expected response headers`);
  } catch (error) {
    fail(`${path} header request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkStaticChunkHeaders() {
  try {
    const { body } = await fetchWithRetry('/');
    const path = firstStaticChunkPath(body);
    if (!path) {
      fail('could not find a Next static chunk in /');
      return;
    }

    await checkResponseHeaders({
      path,
      headers: [
        ['cache-control', 'public, max-age=31536000, immutable'],
        ['x-content-type-options', 'nosniff'],
      ],
    });
  } catch (error) {
    fail(`static chunk header check failed: ${error instanceof Error ? error.message : String(error)}`);
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

await checkAiSkillsRegistry();

for (const check of aiReadableTextChecks) {
  await checkAiReadableText(check);
}

if (shouldCheckResponseHeaders()) {
  for (const check of responseHeaderChecks) {
    await checkResponseHeaders(check);
  }

  await checkStaticChunkHeaders();
} else {
  console.log('[smoke-check] response header checks skipped for local static preview');
}

if (failures.length > 0) {
  console.error(`[smoke-check] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[smoke-check] all smoke checks passed');
