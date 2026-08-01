// Release-gate verification: compare the Debian 13 (trixie) version claims in
// versions.mdx / versions.en.mdx against live package data from pkgseek
// (https://pkgseek.com/v1/packages/debian/{name}, default release = newest =
// trixie). Follows the sync-links.mjs pattern: on network failure it falls
// back to the committed cache so the build never breaks on connectivity
// (important for CI / Cloudflare Pages).
//
// Fails when either side drifts:
//   a) pkgseek reports a version that no longer matches the expected pattern
//      (trixie moved on → content needs review), or
//   b) the mdx tables no longer contain the claimed version
//      (content regressed or was edited without checking facts).
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE = resolve(__dirname, 'pkgseek-versions.json');
const API = 'https://pkgseek.com/v1/packages/debian';

// Debian 13 (trixie) column of the core-component table.
// pattern must match the pkgseek version string; claimZh/claimEn must appear
// verbatim in the corresponding mdx table row.
const COMPONENTS = [
  { pkg: 'linux-image-amd64', label: 'Linux kernel', pattern: '^6\\.12', claimZh: '| Linux 内核 | 6.12', claimEn: '| Linux kernel | 6.12' },
  { pkg: 'gnome-shell', label: 'GNOME', pattern: '^48', claimZh: '| GNOME | 48', claimEn: '| GNOME | 48' },
  { pkg: 'gcc-14', label: 'GCC', pattern: '^14', claimZh: '| GCC | 14', claimEn: '| GCC | 14' },
  { pkg: 'python3.13', label: 'Python', pattern: '^3\\.13', claimZh: '| Python | 3.13', claimEn: '| Python | 3.13' },
  { pkg: 'php8.4', label: 'PHP', pattern: '^8\\.4', claimZh: '| PHP | 8.4', claimEn: 'PHP | Closer to the 8.4' },
  { pkg: 'nodejs', label: 'Node.js', pattern: '^20', claimZh: '| Node.js | 20', claimEn: '| Node.js | 20' },
  { pkg: 'openssl', label: 'OpenSSL', pattern: '^3', claimZh: '| OpenSSL | 3.x', claimEn: '| OpenSSL | 3.x' },
];

// Extra rows that exist only in the 6 small-locale component tables
// (de/es/fr/ja/ko/pt). row must appear verbatim in every small-locale file.
const SMALL_LOCALE_COMPONENTS = [
  { pkg: 'clang', label: 'LLVM/Clang', pattern: '^1:19', row: '| **LLVM/Clang** | 19 |' },
  { pkg: 'golang-go', label: 'Go', pattern: '^2:1\\.24', row: '| **Go** | 1.24 |' },
  { pkg: 'rustc', label: 'Rust', pattern: '^1\\.85', row: '| **Rust** | 1.85 |' },
];

const SMALL_LOCALES = ['de', 'es', 'fr', 'ja', 'ko', 'pt'];

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`[pkgseek-verify] FAIL ${message}`);
}

function pass(message) {
  console.log(`[pkgseek-verify] OK   ${message}`);
}

async function fetchVersion(pkg) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    // Keep the abort timer armed through the body read so a stalled stream
    // (headers sent, body never finishes) still aborts and falls back.
    const res = await fetch(`${API}/${pkg}`, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'debian-club-release-gate' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (typeof data?.version !== 'string' || typeof data?.release !== 'string') {
      throw new Error('payload missing version/release fields');
    }
    if (data.release !== 'trixie') {
      throw new Error(`expected release trixie, got ${data.release}`);
    }
    return data.version;
  } finally {
    clearTimeout(timer);
  }
}

async function getVersions() {
  const names = [...COMPONENTS, ...SMALL_LOCALE_COMPONENTS].map((c) => c.pkg);
  try {
    const entries = await Promise.all(names.map(async (pkg) => [pkg, await fetchVersion(pkg)]));
    const versions = Object.fromEntries(entries);
    writeFileSync(CACHE, `${JSON.stringify(versions, null, 2)}\n`);
    console.log('[pkgseek-verify] fetched live versions from pkgseek');
    return versions;
  } catch (err) {
    if (existsSync(CACHE)) {
      console.warn(`[pkgseek-verify] fetch failed (${err.message}); using committed cache`);
      const cached = JSON.parse(readFileSync(CACHE, 'utf8'));
      for (const pkg of names) {
        if (typeof cached[pkg] !== 'string') {
          fail(`cache ${CACHE} is missing ${pkg}`);
          return null;
        }
      }
      return cached;
    }
    fail(`cannot reach pkgseek and no committed cache exists: ${err.message}`);
    return null;
  }
}

const versions = await getVersions();

if (versions) {
  for (const c of COMPONENTS) {
    const version = versions[c.pkg];
    if (!new RegExp(c.pattern).test(version)) {
      fail(`${c.label}: pkgseek reports ${version} (Debian 13), expected ${c.pattern} — review the component table`);
      continue;
    }
    pass(`${c.label}: pkgseek ${version} matches ${c.pattern}`);
  }

  const zh = readFileSync(resolve(__dirname, '../content/docs/versions.mdx'), 'utf8');
  const en = readFileSync(resolve(__dirname, '../content/docs/versions.en.mdx'), 'utf8');
  for (const c of COMPONENTS) {
    if (!zh.includes(c.claimZh)) fail(`versions.mdx is missing "${c.claimZh}"`);
    else if (!en.includes(c.claimEn)) fail(`versions.en.mdx is missing "${c.claimEn}"`);
    else pass(`${c.label}: mdx tables carry the claim`);
  }

  for (const c of SMALL_LOCALE_COMPONENTS) {
    const version = versions[c.pkg];
    if (!new RegExp(c.pattern).test(version)) {
      fail(`${c.label}: pkgseek reports ${version} (Debian 13), expected ${c.pattern} — review the small-locale component tables`);
      continue;
    }
    for (const loc of SMALL_LOCALES) {
      const mdx = readFileSync(resolve(__dirname, `../content/docs/versions.${loc}.mdx`), 'utf8');
      if (!mdx.includes(c.row)) {
        fail(`versions.${loc}.mdx is missing "${c.row}" (pkgseek: ${version})`);
        continue;
      }
    }
    pass(`${c.label}: pkgseek ${version} matches ${c.pattern} in ${SMALL_LOCALES.length} small-locale tables`);
  }
}

if (failures.length > 0) {
  console.error(`[pkgseek-verify] ${failures.length} check(s) failed`);
  process.exit(1);
}

console.log('[pkgseek-verify] all pkgseek version checks passed');
