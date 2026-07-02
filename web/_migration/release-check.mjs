import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const maxSearchFileBytes = 25 * 1024 * 1024;
const requiredLocales = ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];
const localizedEntryPages = ['tools', 'scenarios', 'hardware', 'versions', 'release-readiness', 'deployment'];
const localizedEntryFiles = localizedEntryPages.flatMap((page) =>
  requiredLocales.map((locale) => (locale === 'zh' ? `out/${page}.html` : `out/${locale}/${page}.html`)),
);
const requiredFiles = [
  '_migration/smoke-check.mjs',
  'out/index.html',
  'out/en.html',
  'out/ai/skills.html',
  'out/en/ai/skills.html',
  ...localizedEntryFiles,
  'out/scenarios/nas-file-sharing.html',
  'out/en/scenarios/nas-file-sharing.html',
  'out/scenarios/local-ai-inference.html',
  'out/en/scenarios/local-ai-inference.html',
  'out/scenarios/ops-jump-box.html',
  'out/en/scenarios/ops-jump-box.html',
  'out/_headers',
  'out/skills.json',
  'out/sitemap.xml',
  'out/robots.txt',
];

const deploymentTextChecks = [
  {
    path: 'DEPLOY.md',
    checks: [
      ['corepack prepare pnpm@9.15.9 --activate', 'Cloudflare build pins pnpm version'],
      ['pnpm install --frozen-lockfile', 'Cloudflare install command is locked'],
      ['Build output directory** | `out`', 'Cloudflare output directory is documented'],
      ['corepack pnpm release:check', 'release gate is documented'],
      ['corepack pnpm smoke:check', 'smoke gate is documented'],
      ['--project-name debianclub', 'CLI deploy project name matches wrangler.toml'],
    ],
  },
  {
    path: 'package.json',
    checks: [
      ['"release:check": "node _migration/release-check.mjs"', 'release check script exists'],
      ['"smoke:check": "node _migration/smoke-check.mjs"', 'smoke check script exists'],
    ],
  },
  {
    path: join('..', 'wrangler.toml'),
    checks: [
      ['name = "debianclub"', 'Cloudflare Pages project name is debianclub'],
      ['pages_build_output_dir = "web/out"', 'Cloudflare Pages output directory is web/out'],
    ],
  },
  {
    path: 'public/_headers',
    checks: [
      ['/*', 'global headers rule exists', 'line'],
      ['X-Content-Type-Options: nosniff', 'nosniff header exists'],
      ['Referrer-Policy: strict-origin-when-cross-origin', 'referrer policy exists'],
      ['X-Frame-Options: SAMEORIGIN', 'frame options header exists'],
      ['Permissions-Policy: camera=(), microphone=(), geolocation=()', 'permissions policy exists'],
      ['/_next/static/*', 'Next static cache rule exists'],
      ['/api/search/*', 'search index headers rule exists'],
      ['Content-Type: application/json; charset=utf-8', 'search index JSON content type exists'],
    ],
  },
  {
    path: 'out/_headers',
    checks: [
      ['/*', 'exported global headers rule exists', 'line'],
      ['X-Content-Type-Options: nosniff', 'exported nosniff header exists'],
      ['Referrer-Policy: strict-origin-when-cross-origin', 'exported referrer policy exists'],
      ['/_next/static/*', 'exported Next static cache rule exists'],
      ['/api/search/*', 'exported search index headers rule exists'],
    ],
  },
  {
    path: join('..', '.github', 'workflows', 'web-release-check.yml'),
    checks: [
      ['name: Web Release Check', 'web release workflow exists'],
      ['permissions:', 'workflow declares permissions'],
      ['contents: read', 'workflow uses read-only contents permission'],
      ['corepack prepare pnpm@9.15.9 --activate', 'workflow pins pnpm version'],
      ['corepack pnpm --dir web types:check', 'workflow runs type check'],
      ['corepack pnpm --dir web build', 'workflow runs static build'],
      ['corepack pnpm --dir web smoke:check', 'workflow runs smoke check'],
      ['corepack pnpm --dir web release:check', 'workflow runs release gate'],
    ],
  },
];

const failures = [];

function hasTextCheck(content, needle, mode) {
  if (mode === 'line') {
    return content.split(/\r?\n/).some((line) => line.trim() === needle);
  }

  return content.includes(needle);
}

function fail(message) {
  failures.push(message);
  console.error(`[release-check] FAIL ${message}`);
}

function pass(message) {
  console.log(`[release-check] OK   ${message}`);
}

for (const file of requiredFiles) {
  if (existsSync(file)) {
    pass(`found ${file}`);
  } else {
    fail(`missing ${file}`);
  }
}

for (const fileCheck of deploymentTextChecks) {
  if (!existsSync(fileCheck.path) || !statSync(fileCheck.path).isFile()) {
    fail(`missing ${fileCheck.path}`);
    continue;
  }

  const content = readFileSync(fileCheck.path, 'utf8');
  for (const [needle, label, mode] of fileCheck.checks) {
    if (hasTextCheck(content, needle, mode)) {
      pass(`${fileCheck.path}: ${label}`);
    } else {
      fail(`${fileCheck.path}: missing ${label}`);
    }
  }
}

const searchDir = join('out', 'api', 'search');

if (!existsSync(searchDir) || !statSync(searchDir).isDirectory()) {
  fail(`missing split search index directory ${searchDir}`);
} else {
  const entries = new Set(readdirSync(searchDir));

  for (const locale of requiredLocales) {
    const path = join(searchDir, locale);
    if (!existsSync(path) || !statSync(path).isFile()) {
      fail(`missing search index ${path}`);
      continue;
    }

    const size = statSync(path).size;
    if (size > maxSearchFileBytes) {
      fail(`${path} is ${(size / 1048576).toFixed(2)} MiB, above 25 MiB`);
    } else {
      pass(`${path} is ${(size / 1048576).toFixed(2)} MiB`);
    }
  }

  for (const entry of entries) {
    if (!requiredLocales.includes(entry)) {
      fail(`unexpected search index file ${join(searchDir, entry)}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`[release-check] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[release-check] all release checks passed');
