// Release-gate verification for Debian release facts.
//
// 1. When deb.debian.org is reachable, compare lib/debian-facts.json with the
//    live stable / oldstable / oldoldstable Release files. Drift means the
//    cache needs `pnpm facts:sync` and the content needs a refresh.
// 2. Verify the generated download data and the version-sensitive docs across
//    all 8 locales still match the committed facts.
//
// Network failures fall back to the committed cache (same pattern as
// pkgseek-verify.mjs) so CI does not become flaky on connectivity.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FACTS = resolve(ROOT, 'lib/debian-facts.json');
const ARCHIVE = 'https://deb.debian.org/debian/dists';
const LOCALES = ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];
const STALE_ISO_VERSIONS = ['13.0.0', '13.4.0', '13.5.0', '12.14.0'];

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`[facts-check] FAIL ${message}`);
}

function pass(message) {
  console.log(`[facts-check] OK   ${message}`);
}

function read(rel) {
  return readFileSync(resolve(ROOT, rel), 'utf8');
}

function suffix(locale) {
  return locale === 'zh' ? '' : `.${locale}`;
}

function localePath(base, locale) {
  return `${base}${suffix(locale)}.mdx`;
}

function mustInclude(file, needles, label) {
  const content = read(file);
  let ok = true;
  for (const needle of needles) {
    if (!content.includes(needle)) {
      fail(`${file} is missing ${needle} (${label})`);
      ok = false;
    }
  }
  return ok;
}

function mustNotInclude(file, needles, label) {
  const content = read(file);
  let ok = true;
  for (const needle of needles) {
    if (content.includes(needle)) {
      fail(`${file} still contains stale value ${needle} (${label})`);
      ok = false;
    }
  }
  return ok;
}

if (!existsSync(FACTS)) {
  fail(`missing ${FACTS}; run pnpm facts:sync`);
  process.exit(1);
}

const facts = JSON.parse(readFileSync(FACTS, 'utf8'));
for (const suite of ['stable', 'oldstable', 'oldoldstable']) {
  const release = facts.releases?.[suite];
  if (!release?.version || !release?.imageVersion || !release?.codename) {
    fail(`facts.releases.${suite} is missing version/imageVersion/codename`);
  }
}
for (const suite of ['stable', 'oldstable']) {
  const version = facts.releases[suite].version;
  if (!facts.pointReleases?.some((entry) => entry.version === version)) {
    fail(`facts.pointReleases is missing ${suite} ${version}; run pnpm facts:sync`);
  }
}
if (failures.length > 0) {
  console.error(`[facts-check] ${failures.length} check(s) failed`);
  process.exit(1);
}

async function fetchRelease(suite) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(`${ARCHIVE}/${suite}/Release`, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'debian-club-facts-check' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const fields = {};
    for (const line of text.split('\n')) {
      const match = /^(Version|Codename):\s*(.+)$/.exec(line);
      if (match) fields[match[1]] = match[2].trim();
    }
    if (!fields.Version || !fields.Codename) {
      throw new Error('payload missing Version/Codename');
    }
    return fields;
  } finally {
    clearTimeout(timer);
  }
}

const CLOUD_META = {
  stable: { suite: 'trixie', file: 'debian-13-generic-amd64.json' },
  oldstable: { suite: 'bookworm', file: 'debian-12-generic-amd64.json' },
  oldoldstable: { suite: 'bullseye', file: 'debian-11-generic-amd64.json' },
  testing: { suite: 'forky', file: 'debian-14-generic-amd64-daily.json', daily: true },
};

async function fetchJson(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'debian-club-facts-check' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

let liveChecked = 0;
for (const suite of ['stable', 'oldstable', 'oldoldstable']) {
  try {
    const live = await fetchRelease(suite);
    const local = facts.releases[suite];
    if (live.Version !== local.version) {
      fail(`${suite}: live archive reports ${live.Version}, facts say ${local.version} — run pnpm facts:sync and refresh the version-sensitive docs`);
    } else if (live.Codename !== local.codename) {
      fail(`${suite}: live archive codename ${live.Codename} does not match facts ${local.codename}`);
    } else {
      pass(`${suite}: live archive ${live.Version} (${live.Codename}) matches facts`);
      liveChecked += 1;
    }
  } catch (error) {
    console.warn(`[facts-check] ${suite}: could not reach deb.debian.org (${error instanceof Error ? error.message : String(error)}); using committed facts`);
  }
}
if (liveChecked === 0) {
  console.warn('[facts-check] no live archive data available; checked committed facts only');
}

let cloudLiveChecked = 0;
for (const [key, meta] of Object.entries(CLOUD_META)) {
  try {
    const url = meta.daily
      ? `https://cloud.debian.org/images/cloud/${meta.suite}/daily/latest/${meta.file}`
      : `https://cloud.debian.org/images/cloud/${meta.suite}/latest/${meta.file}`;
    const data = await fetchJson(url);
    const info = data?.items?.find((item) => item.kind === 'Build')?.data?.info;
    const liveBuild = info?.version;
    if (!liveBuild) throw new Error('metadata missing Build.version');
    if (key === 'testing') {
      if (facts.cloud?.[key]?.build && facts.cloud[key].build !== liveBuild) {
        console.warn(`[facts-check] cloud.testing: daily build changed ${facts.cloud[key].build} -> ${liveBuild}; run pnpm facts:sync when you are ready to record it`);
      } else {
        pass(`cloud.testing: daily build ${liveBuild}`);
      }
    } else if (facts.cloud?.[key]?.build !== liveBuild) {
      fail(`cloud.${key}: live build ${liveBuild}, facts say ${facts.cloud?.[key]?.build ?? '—'} — run pnpm facts:sync and refresh the cloud guide/news`);
    } else {
      pass(`cloud.${key}: live build ${liveBuild} matches facts`);
    }
    cloudLiveChecked += 1;
  } catch (error) {
    console.warn(`[facts-check] cloud.${key}: could not reach cloud.debian.org (${error instanceof Error ? error.message : String(error)}); using committed facts`);
  }
}
if (cloudLiveChecked === 0) {
  console.warn('[facts-check] no live cloud image data available; checked committed facts only');
}

try {
  const pointTag = facts.releases.stable.version;
  const tag = await fetchJson(`https://hub.docker.com/v2/repositories/library/debian/tags/${encodeURIComponent(pointTag)}`);
  if (!tag?.name) {
    fail(`Docker official image debian:${pointTag} is not published yet — wait for Docker Hub to rebuild and run pnpm facts:sync`);
  } else {
    pass(`Docker official image debian:${pointTag} is published`);
    const lastUpdated = typeof tag.last_updated === 'string' ? tag.last_updated.slice(0, 10) : null;
    if (lastUpdated && facts.cloud?.docker?.lastUpdated !== lastUpdated) {
      console.warn(`[facts-check] Docker debian:${pointTag} last_updated ${lastUpdated} differs from facts ${facts.cloud?.docker?.lastUpdated}; run pnpm facts:sync to refresh`);
    }
  }
} catch (error) {
  console.warn(`[facts-check] Docker Hub: could not reach hub.docker.com (${error instanceof Error ? error.message : String(error)}); using committed facts`);
}

const stable = facts.releases.stable;
const oldstable = facts.releases.oldstable;
const oldoldstable = facts.releases.oldoldstable;

// Generated download data must use the single source of truth.
const downloadTs = read('lib/download.ts');
if (downloadTs.includes("import debianFacts from './debian-facts.json'")) {
  pass('lib/download.ts imports lib/debian-facts.json');
} else {
  fail("lib/download.ts does not import './debian-facts.json'");
}
for (const [label, needle] of [
  ['stable image version', 'debianFacts.releases.stable.imageVersion'],
  ['oldstable image version', 'debianFacts.releases.oldstable.imageVersion'],
]) {
  if (downloadTs.includes(needle)) {
    pass(`lib/download.ts reads ${label} from facts`);
  } else {
    fail(`lib/download.ts does not read ${label} from facts`);
  }
}
mustNotInclude('lib/download.ts', ['13.5.0', '12.14.0'], 'download data');

// Version-sensitive pages in every locale.
const pointReleaseDates = ['2025-09-06', '2025-11-15', '2026-03-14', '2026-07-11'];
for (const locale of LOCALES) {
  const whatsNew = localePath('content/docs/basics/whats-new', locale);
  if (mustInclude(whatsNew, [stable.version, ...pointReleaseDates, '2026-09-12'], 'point-release timeline')) {
    pass(`${whatsNew} tracks Debian ${stable.version} and point-release dates`);
  }

  const versions = localePath('content/docs/versions', locale);
  if (mustInclude(versions, [stable.version, oldstable.version, '2026-07-11', oldoldstable.ltsEnd], 'version summary')) {
    pass(`${versions} tracks stable/oldstable point releases and Debian 11 LTS end`);
  }

  const eol = localePath('content/docs/eol', locale);
  if (mustInclude(eol, [
    stable.regularSupportEnd, stable.ltsEnd, stable.eltsEnd,
    oldstable.regularSupportEnd, oldstable.ltsEnd, oldstable.eltsEnd,
    oldoldstable.ltsEnd, oldoldstable.eltsEnd,
  ], 'lifecycle dates')) {
    pass(`${eol} contains the full lifecycle/ELTS date set`);
  }

  const news = localePath('content/docs/news', locale);
  if (mustInclude(news, ['2026-08-31', '2026-08-07', '2026-08-16', '2026-08-30', '2026-09-07', 'DebConf27', 'cloud.debian.org', 'hub.docker.com/_/debian', facts.cloud.stable.build], 'recent news entries')) {
    pass(`${news} contains the recent Debian news entries`);
  }

  const download = localePath('content/docs/basics/download', locale);
  if (mustInclude(download, [stable.imageVersion], 'current ISO version')) {
    mustNotInclude(download, STALE_ISO_VERSIONS, 'download guide');
  }

  const bootable = localePath('content/docs/basics/bootable-media', locale);
  if (mustInclude(bootable, [stable.imageVersion], 'current ISO version')) {
    mustNotInclude(bootable, STALE_ISO_VERSIONS, 'bootable-media guide');
  }

  const cloudGuide = localePath('content/docs/server/cloud', locale);
  if (mustInclude(cloudGuide, [
    facts.cloud.stable.build,
    stable.version,
    'generic',
    'genericcloud',
    'nocloud',
    'cloud.debian.org',
    'hub.docker.com/_/debian',
  ], 'cloud guide')) {
    pass(`${cloudGuide} tracks the current cloud image build and image types`);
  }
}

for (const locale of ['zh', 'en']) {
  const installBoot = localePath('content/docs/troubleshooting/installation-boot', locale);
  if (mustInclude(installBoot, [stable.imageVersion], 'current ISO version')) {
    mustNotInclude(installBoot, STALE_ISO_VERSIONS, 'installation troubleshooting guide');
  }
}

if (failures.length > 0) {
  console.error(`[facts-check] ${failures.length} check(s) failed`);
  process.exit(1);
}
console.log('[facts-check] all Debian release fact checks passed');
