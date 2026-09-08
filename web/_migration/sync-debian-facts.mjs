// Sync web/lib/debian-facts.json with the live Debian archive.
//
// Reads the Release files for stable / oldstable / oldoldstable from
// deb.debian.org, extracts Version / Codename / Date, and updates the
// committed facts cache used by lib/download.ts and the release gates.
//
// Network failures keep the committed cache (same pattern as sync-links.mjs
// and pkgseek-verify.mjs) so local builds and CI never break on connectivity.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FACTS = resolve(__dirname, '../lib/debian-facts.json');
const SUITES = ['stable', 'oldstable', 'oldoldstable'];
const ARCHIVE = 'https://deb.debian.org/debian/dists';

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

function parseReleaseDate(text) {
  const match = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/.exec(String(text ?? ''));
  if (!match) return null;
  const month = MONTHS[match[2].toLowerCase()];
  if (!month) return null;
  return `${match[3]}-${String(month).padStart(2, '0')}-${match[1].padStart(2, '0')}`;
}

function imageVersion(version) {
  const parts = String(version).split('.');
  if (parts.length === 1) return `${version}.0.0`;
  if (parts.length === 2) return `${version}.0`;
  return String(version);
}

async function fetchRelease(suite) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(`${ARCHIVE}/${suite}/Release`, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'debian-club-facts-sync' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const fields = {};
    for (const line of text.split('\n')) {
      const match = /^(Version|Codename|Suite|Date|Description):\s*(.+)$/.exec(line);
      if (match) fields[match[1]] = match[2].trim();
    }
    if (!fields.Version || !fields.Codename) {
      throw new Error(`missing Version/Codename for ${suite}`);
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

function buildDateFromId(id) {
  const match = /^(\d{4})(\d{2})(\d{2})-/.exec(String(id ?? ''));
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

async function fetchJson(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'debian-club-facts-sync' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function setCloudField(cloud, key, field, value) {
  if (!value || cloud[key]?.[field] === value) return false;
  cloud[key] ??= {};
  console.log(`[facts-sync] cloud.${key}.${field}: ${cloud[key][field] ?? '—'} -> ${value}`);
  cloud[key][field] = value;
  return true;
}

async function syncCloudFacts(facts) {
  let changed = false;
  facts.cloud ??= {};
  for (const [key, meta] of Object.entries(CLOUD_META)) {
    try {
      const url = meta.daily
        ? `https://cloud.debian.org/images/cloud/${meta.suite}/daily/latest/${meta.file}`
        : `https://cloud.debian.org/images/cloud/${meta.suite}/latest/${meta.file}`;
      const data = await fetchJson(url);
      const build = data?.items?.find((item) => item.kind === 'Build')?.data?.info;
      if (!build?.version) throw new Error('metadata missing Build.version');
      changed = setCloudField(facts.cloud, key, 'suite', meta.suite) || changed;
      changed = setCloudField(facts.cloud, key, 'build', build.version) || changed;
      changed = setCloudField(facts.cloud, key, 'buildDate', buildDateFromId(build.version)) || changed;
      changed = setCloudField(facts.cloud, key, 'metadataUrl', url) || changed;
    } catch (error) {
      console.warn(`[facts-sync] cloud.${key}: fetch failed (${error instanceof Error ? error.message : String(error)}); keeping committed facts`);
    }
  }

  try {
    const pointTag = facts.releases?.stable?.version;
    const stableTag = String(pointTag ?? '').split('.')[0];
    if (pointTag && stableTag) {
      const tag = await fetchJson(`https://hub.docker.com/v2/repositories/library/debian/tags/${encodeURIComponent(pointTag)}`);
      const lastUpdated = typeof tag?.last_updated === 'string' ? tag.last_updated.slice(0, 10) : null;
      changed = setCloudField(facts.cloud, 'docker', 'stableTag', stableTag) || changed;
      changed = setCloudField(facts.cloud, 'docker', 'pointTag', pointTag) || changed;
      changed = setCloudField(facts.cloud, 'docker', 'lastUpdated', lastUpdated) || changed;
    }
  } catch (error) {
    console.warn(`[facts-sync] cloud.docker: fetch failed (${error instanceof Error ? error.message : String(error)}); keeping committed facts`);
  }

  facts.cloud.generatedAt = new Date().toISOString().slice(0, 10);
  return changed;
}

if (!existsSync(FACTS)) {
  console.error(`[facts-sync] missing ${FACTS}`);
  process.exit(1);
}

const facts = JSON.parse(readFileSync(FACTS, 'utf8'));
facts.releases ??= {};
facts.generatedAt = new Date().toISOString().slice(0, 10);

let changed = false;
let fetched = 0;

for (const suite of SUITES) {
  try {
    const live = await fetchRelease(suite);
    const release = facts.releases[suite];
    if (!release) {
      console.error(`[facts-sync] facts file has no releases.${suite}`);
      process.exit(1);
    }
    const next = {
      version: live.Version,
      imageVersion: imageVersion(live.Version),
      codename: live.Codename,
      pointReleaseDate: parseReleaseDate(live.Description) ?? release.pointReleaseDate,
    };
    for (const [key, value] of Object.entries(next)) {
      if (value && release[key] !== value) {
        console.log(`[facts-sync] ${suite}.${key}: ${release[key] ?? '—'} -> ${value}`);
        release[key] = value;
        changed = true;
      }
    }

    // Keep the point-release list and planned list in sync with the archive.
    if (suite === 'stable' || suite === 'oldstable') {
      facts.pointReleases ??= [];
      const existing = facts.pointReleases.find((entry) => entry.version === live.Version);
      if (!existing) {
        facts.pointReleases.unshift({
          version: live.Version,
          date: next.pointReleaseDate,
          channel: suite,
        });
        console.log(`[facts-sync] recorded ${suite} point release ${live.Version} (${next.pointReleaseDate})`);
        changed = true;
      } else if (next.pointReleaseDate && existing.date !== next.pointReleaseDate) {
        existing.date = next.pointReleaseDate;
        changed = true;
      }
      const planned = facts.plannedPointReleases ?? [];
      const remaining = planned.filter((entry) => entry.version !== live.Version);
      if (remaining.length !== planned.length) {
        facts.plannedPointReleases = remaining;
        changed = true;
      }
    }

    fetched += 1;
  } catch (error) {
    console.warn(`[facts-sync] ${suite}: fetch failed (${error instanceof Error ? error.message : String(error)}); keeping committed facts`);
  }
}

if (await syncCloudFacts(facts)) changed = true;

writeFileSync(FACTS, `${JSON.stringify(facts, null, 2)}\n`);
if (changed) {
  console.log(`[facts-sync] updated ${FACTS}`);
} else if (fetched > 0) {
  console.log('[facts-sync] facts are already current');
} else {
  console.warn('[facts-sync] no live source reachable; committed facts left unchanged');
}
