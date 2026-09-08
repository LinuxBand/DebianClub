import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FACTS = resolve(ROOT, 'lib/debian-facts.json');

if (!existsSync(FACTS)) {
  console.error(`[freshness-check] FAIL missing ${FACTS}; run pnpm facts:sync`);
  process.exit(1);
}

const facts = JSON.parse(readFileSync(FACTS, 'utf8'));
const stable = facts.releases.stable;
const oldstable = facts.releases.oldstable;
const oldoldstable = facts.releases.oldoldstable;
const reviewDate = facts.reviewDate;
const reviewDueDate = facts.reviewDueDate;
const requiredLifecycleValues = [
  `Debian ${stable.number} (${stable.codenameTitle})`,
  stable.releaseDate,
  stable.regularSupportEnd,
  stable.ltsEnd,
  oldstable.regularSupportEnd,
  oldstable.ltsEnd,
  oldoldstable.ltsEnd,
];
const requiredEltsValues = [oldoldstable.eltsEnd, oldstable.eltsEnd, stable.eltsEnd];
const locales = ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];

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
      ...requiredEltsValues,
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
      ...requiredEltsValues,
    ],
  },
  {
    path: 'content/docs/versions.mdx',
    includes: [reviewDate, stable.regularSupportEnd, stable.ltsEnd, oldstable.regularSupportEnd, oldstable.ltsEnd],
  },
  {
    path: 'content/docs/versions.en.mdx',
    includes: [reviewDate, stable.regularSupportEnd, stable.ltsEnd, oldstable.regularSupportEnd, oldstable.ltsEnd],
  },
  {
    path: 'content/docs/eol.mdx',
    includes: [reviewDate, stable.regularSupportEnd, stable.ltsEnd, oldstable.regularSupportEnd, oldstable.ltsEnd, oldoldstable.ltsEnd, ...requiredEltsValues],
  },
  {
    path: 'content/docs/eol.en.mdx',
    includes: [reviewDate, stable.regularSupportEnd, stable.ltsEnd, oldstable.regularSupportEnd, oldstable.ltsEnd, oldoldstable.ltsEnd, ...requiredEltsValues],
  },
];

// The small locales are summarized pages, but lifecycle dates must not drift.
for (const locale of locales.filter((value) => value !== 'zh' && value !== 'en')) {
  const suffix = locale === 'zh' ? '' : `.${locale}`;
  checks.push({
    path: `content/docs/eol${suffix}.mdx`,
    includes: [oldoldstable.ltsEnd, ...requiredEltsValues],
  });
  checks.push({
    path: `content/docs/versions${suffix}.mdx`,
    includes: [oldoldstable.ltsEnd],
  });
}

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
  const path = resolve(ROOT, check.path);
  if (!existsSync(path)) {
    fail(`missing ${check.path}`);
    continue;
  }

  const content = readFileSync(path, 'utf8');
  let ok = true;
  for (const needle of check.includes) {
    if (!content.includes(needle)) {
      fail(`${check.path} is missing ${needle}`);
      ok = false;
    }
  }
  if (ok) {
    pass(`${check.path} includes freshness baseline markers`);
  }
}

if (failures.length > 0) {
  console.error(`[freshness-check] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[freshness-check] all content freshness checks passed');
