import { existsSync, readFileSync } from 'node:fs';

const requiredLocales = ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];
const fallbackToolLocales = ['de', 'es', 'fr', 'ja', 'ko', 'pt'];
const localizedEntryPages = ['tools', 'scenarios', 'hardware', 'versions', 'release-readiness', 'deployment'];
const bilingualPages = ['production-observability', 'content-freshness', 'i18n-quality'];
const aiSkillsPages = ['index', 'install', 'distribution', 'usage', 'modules', 'safety', 'evaluation'];

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`[i18n-check] FAIL ${message}`);
}

function pass(message) {
  console.log(`[i18n-check] OK   ${message}`);
}

function localizedTopLevelPath(page, locale) {
  if (locale === 'zh') return `content/docs/${page}.mdx`;
  return `content/docs/${page}.${locale}.mdx`;
}

function localizedIndexPath(section, locale) {
  if (locale === 'zh') return `content/docs/${section}/index.mdx`;
  return `content/docs/${section}/index.${locale}.mdx`;
}

function requiredFile(path) {
  if (existsSync(path)) {
    pass(`found ${path}`);
  } else {
    fail(`missing ${path}`);
  }
}

for (const page of localizedEntryPages) {
  for (const locale of requiredLocales) {
    const path = page === 'tools' || page === 'scenarios' || page === 'hardware'
      ? localizedIndexPath(page, locale)
      : localizedTopLevelPath(page, locale);
    requiredFile(path);
  }
}

for (const page of bilingualPages) {
  requiredFile(localizedTopLevelPath(page, 'zh'));
  requiredFile(localizedTopLevelPath(page, 'en'));
}

for (const locale of fallbackToolLocales) {
  const path = localizedIndexPath('tools', locale);
  if (!existsSync(path)) {
    fail(`missing fallback tools page ${path}`);
    continue;
  }

  const content = readFileSync(path, 'utf8');
  if (!content.includes('<InteractiveTools lang="en" />')) {
    fail(`${path} does not explicitly use the English interactive tools UI`);
    continue;
  }

  if (!content.includes('Upgrade Planner')) {
    fail(`${path} does not list the upgrade planner fallback tool`);
    continue;
  }

  pass(`${path} declares English interactive tools fallback`);
}

for (const locale of ['zh', 'en']) {
  const metaPath = locale === 'zh' ? 'content/docs/ai/skills/meta.json' : 'content/docs/ai/skills/meta.en.json';
  if (!existsSync(metaPath)) {
    fail(`missing ${metaPath}`);
    continue;
  }

  let meta;
  try {
    meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  } catch (error) {
    fail(`${metaPath} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
    continue;
  }

  for (const page of aiSkillsPages) {
    if (!Array.isArray(meta.pages) || !meta.pages.includes(page)) {
      fail(`${metaPath} does not include AI Skills page ${page}`);
      continue;
    }
  }

  requiredFile(locale === 'zh' ? 'content/docs/ai/skills/distribution.mdx' : 'content/docs/ai/skills/distribution.en.mdx');
  pass(`${metaPath} includes AI Skills distribution ordering`);
}

if (failures.length > 0) {
  console.error(`[i18n-check] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[i18n-check] all i18n consistency checks passed');
