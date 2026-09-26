// Release-gate verification: compare version claims in the versions and
// comparison pages (all 8 locales) against live package data from pkgseek
// (https://pkgseek.com/v1/packages/{distro}/{name}, default release = newest).
// Follows the sync-links.mjs pattern: on network failure it falls back to
// the committed cache so the build never breaks on connectivity (important
// for CI / Cloudflare Pages).
//
// Fails when either side drifts:
//   a) pkgseek reports a value that no longer matches the expected pattern
//      (upstream moved on → content needs review), or
//   b) any locale's mdx table no longer contains the claim
//      (content regressed or was edited without checking facts).
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE = resolve(__dirname, 'pkgseek-facts.json');
const API = 'https://pkgseek.com/v1/packages';

// Debian 13 (trixie) column of the unified core-component table on the
// versions pages. pattern must match the pkgseek version string (note Debian
// epoch/revision prefixes, e.g. clang "1:19.0-63", golang-go "2:1.24~2").
// claimZh/claimEn/claimSmall must appear verbatim in every locale's mdx.
const DEBIAN_COMPONENTS = [
  { pkg: 'linux-image-amd64', label: 'Linux kernel', pattern: '^6\\.12', claimZh: '| Linux 内核 | 6.12', claimEn: '| Linux kernel | 6.12', claimSmall: '| **Linux kernel** | 6.12 |' },
  { pkg: 'gnome-shell', label: 'GNOME', pattern: '^48', claimZh: '| GNOME | 48', claimEn: '| GNOME | 48', claimSmall: '| **GNOME** | 48 |' },
  { pkg: 'gcc-14', label: 'GCC', pattern: '^14', claimZh: '| GCC | 14', claimEn: '| GCC | 14', claimSmall: '| **GCC** | 14.2 |' },
  { pkg: 'clang', label: 'LLVM/Clang', pattern: '^1:19', claimZh: '| LLVM/Clang | 19 |', claimEn: '| LLVM/Clang | 19 |', claimSmall: '| **LLVM/Clang** | 19 |' },
  { pkg: 'python3.13', label: 'Python', pattern: '^3\\.13', claimZh: '| Python | 3.13', claimEn: '| Python | 3.13', claimSmall: '| **Python** | 3.13 |' },
  { pkg: 'golang-go', label: 'Go', pattern: '^2:1\\.24', claimZh: '| Go | 1.24 |', claimEn: '| Go | 1.24 |', claimSmall: '| **Go** | 1.24 |' },
  { pkg: 'rustc', label: 'Rust', pattern: '^1\\.85', claimZh: '| Rust | 1.85 |', claimEn: '| Rust | 1.85 |', claimSmall: '| **Rust** | 1.85 |' },
  { pkg: 'nodejs', label: 'Node.js', pattern: '^20', claimZh: '| Node.js | 20', claimEn: '| Node.js | 20', claimSmall: '| **Node.js** | 20.x |' },
  { pkg: 'php8.4', label: 'PHP', pattern: '^8\\.4', claimZh: '| PHP | 8.4', claimEn: 'PHP | Closer to the 8.4', claimSmall: '| **PHP** | 8.4 |' },
  { pkg: 'openssl', label: 'OpenSSL', pattern: '^3', claimZh: '| OpenSSL | 3.x', claimEn: '| OpenSSL | 3.x', claimSmall: '| **OpenSSL** | 3.x |' },
];

// Distribution facts backing the comparison pages' distro columns.
// field/expect (or field/pattern) is checked against the pkgseek payload;
// claim must appear verbatim in every locale's comparison page.
// Note: Ubuntu uses codenames in the release field — "resolute" is 26.04 LTS,
// so the claim maps codename → marketing version.
const DISTRO_CLAIMS = [
  { distro: 'fedora', pkg: 'kernel', label: 'Fedora', field: 'release', expect: '44', claim: 'Fedora 44' },
  { distro: 'ubuntu', pkg: 'vim', label: 'Ubuntu', field: 'release', expect: 'resolute', claim: 'Ubuntu 26.04 LTS' },
  { distro: 'rhel', pkg: 'nodejs', label: 'RHEL', field: 'version', pattern: 'el10', claim: 'RHEL 10' },
];

const SMALL_LOCALES = ['de', 'es', 'fr', 'ja', 'ko', 'pt'];
const ALL_LOCALES = ['zh', 'en', ...SMALL_LOCALES];

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`[pkgseek-verify] FAIL ${message}`);
}

function pass(message) {
  console.log(`[pkgseek-verify] OK   ${message}`);
}

async function fetchPackage(distro, pkg) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    // Keep the abort timer armed through the body read so a stalled stream
    // (headers sent, body never finishes) still aborts and falls back.
    const res = await fetch(`${API}/${distro}/${pkg}`, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'debian-club-release-gate' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (typeof data?.version !== 'string' || typeof data?.release !== 'string') {
      throw new Error('payload missing version/release fields');
    }
    return { version: data.version, release: data.release };
  } finally {
    clearTimeout(timer);
  }
}

const QUERIES = [
  ...DEBIAN_COMPONENTS.map((c) => ({ key: `debian/${c.pkg}`, distro: 'debian', pkg: c.pkg })),
  ...DISTRO_CLAIMS.map((c) => ({ key: `${c.distro}/${c.pkg}`, distro: c.distro, pkg: c.pkg })),
];

async function getFacts() {
  try {
    const entries = await Promise.all(
      QUERIES.map(async (q) => [q.key, await fetchPackage(q.distro, q.pkg)]),
    );
    const facts = Object.fromEntries(entries);
    writeFileSync(CACHE, `${JSON.stringify(facts, null, 2)}\n`);
    console.log('[pkgseek-verify] fetched live facts from pkgseek');
    return facts;
  } catch (err) {
    if (existsSync(CACHE)) {
      console.warn(`[pkgseek-verify] fetch failed (${err.message}); using committed cache`);
      const cached = JSON.parse(readFileSync(CACHE, 'utf8'));
      for (const q of QUERIES) {
        if (typeof cached[q.key]?.version !== 'string' || typeof cached[q.key]?.release !== 'string') {
          fail(`cache ${CACHE} is missing ${q.key}`);
          return null;
        }
      }
      return cached;
    }
    fail(`cannot reach pkgseek and no committed cache exists: ${err.message}`);
    return null;
  }
}

function readPages(basename) {
  const pages = {};
  for (const loc of ALL_LOCALES) {
    const suffix = loc === 'zh' ? '' : `.${loc}`;
    pages[loc] = readFileSync(resolve(__dirname, `../content/docs/${basename}${suffix}.mdx`), 'utf8');
  }
  return pages;
}

const facts = await getFacts();

if (facts) {
  const versionsPages = readPages('versions');
  for (const c of DEBIAN_COMPONENTS) {
    const fact = facts[`debian/${c.pkg}`];
    if (fact.release !== 'trixie') {
      fail(`${c.label}: pkgseek reports release ${fact.release}, expected trixie`);
      continue;
    }
    if (!new RegExp(c.pattern).test(fact.version)) {
      fail(`${c.label}: pkgseek reports ${fact.version} (Debian 13), expected ${c.pattern} — review the component tables`);
      continue;
    }
    let ok = true;
    if (!versionsPages.zh.includes(c.claimZh)) { fail(`versions.mdx is missing "${c.claimZh}"`); ok = false; }
    if (!versionsPages.en.includes(c.claimEn)) { fail(`versions.en.mdx is missing "${c.claimEn}"`); ok = false; }
    for (const loc of SMALL_LOCALES) {
      if (!versionsPages[loc].includes(c.claimSmall)) {
        fail(`versions.${loc}.mdx is missing "${c.claimSmall}"`);
        ok = false;
      }
    }
    if (ok) pass(`${c.label}: pkgseek ${fact.version} matches ${c.pattern}; claim present in all 8 locales`);
  }

  const comparisonPages = readPages('comparison');
  for (const c of DISTRO_CLAIMS) {
    const fact = facts[`${c.distro}/${c.pkg}`];
    const value = c.field === 'release' ? fact.release : fact.version;
    const matches = c.expect ? value === c.expect : new RegExp(c.pattern).test(value);
    if (!matches) {
      fail(`${c.label}: pkgseek reports ${c.field}=${value}, expected ${c.expect ?? c.pattern} — review the comparison tables`);
      continue;
    }
    let ok = true;
    for (const loc of ALL_LOCALES) {
      const suffix = loc === 'zh' ? '' : `.${loc}`;
      if (!comparisonPages[loc].includes(c.claim)) {
        fail(`comparison${suffix}.mdx is missing "${c.claim}"`);
        ok = false;
      }
    }
    if (ok) pass(`${c.label}: pkgseek ${c.field}=${value} matches; "${c.claim}" present in all 8 locales`);
  }
}

if (failures.length > 0) {
  console.error(`[pkgseek-verify] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[pkgseek-verify] all pkgseek version checks passed');
