import { existsSync, readFileSync } from 'node:fs';

const reviewDate = '2026-07-03';
const reviewDueDate = '2026-10-01';
const requiredLifecycleValues = [
  'Debian 13 (Trixie)',
  '2025-08-09',
  '2028-08-09',
  '2030-06-30',
  '2026-07-11',
  '2028-06-30',
  '2026-08-31',
];

const checks = [
  {
    path: 'content/docs/content-freshness.mdx',
    includes: [
      'Phase 44 已上线',
      reviewDate,
      reviewDueDate,
      'https://www.debian.org/releases/',
      'https://wiki.debian.org/LTS',
      ...requiredLifecycleValues,
    ],
  },
  {
    path: 'content/docs/content-freshness.en.mdx',
    includes: [
      'Phase 44 Live',
      reviewDate,
      reviewDueDate,
      'https://www.debian.org/releases/',
      'https://wiki.debian.org/LTS',
      ...requiredLifecycleValues,
    ],
  },
  {
    path: 'content/docs/versions.mdx',
    includes: [reviewDate, '2028-08-09', '2030-06-30', '2026-07-11', '2028-06-30'],
  },
  {
    path: 'content/docs/versions.en.mdx',
    includes: [reviewDate, '2028-08-09', '2030-06-30', '2026-07-11', '2028-06-30'],
  },
  {
    path: 'content/docs/eol.mdx',
    includes: [reviewDate, '2028-08-09', '2030-06-30', '2026-07-11', '2028-06-30', '2026-08-31'],
  },
  {
    path: 'content/docs/eol.en.mdx',
    includes: [reviewDate, '2028-08-09', '2030-06-30', '2026-07-11', '2028-06-30', '2026-08-31'],
  },
];

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`[freshness-check] FAIL ${message}`);
}

function pass(message) {
  console.log(`[freshness-check] OK   ${message}`);
}

function currentDateIso() {
  return new Date().toISOString().slice(0, 10);
}

if (process.env.CONTENT_FRESHNESS_ALLOW_EXPIRED !== '1' && currentDateIso() > reviewDueDate) {
  fail(`content freshness baseline expired on ${reviewDueDate}; update Debian lifecycle facts and review date`);
}

for (const check of checks) {
  if (!existsSync(check.path)) {
    fail(`missing ${check.path}`);
    continue;
  }

  const content = readFileSync(check.path, 'utf8');
  for (const needle of check.includes) {
    if (!content.includes(needle)) {
      fail(`${check.path} is missing ${needle}`);
      continue;
    }
  }

  pass(`${check.path} includes freshness baseline markers`);
}

if (failures.length > 0) {
  console.error(`[freshness-check] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[freshness-check] all content freshness checks passed');
