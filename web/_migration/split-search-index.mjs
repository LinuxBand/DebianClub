// Split the combined Orama search index into per-locale files.
//
// Fumadocs' static i18n search emits ONE `out/api/search` file shaped
// `{ type: 'i18n', data: { zh: <index>, en: <index>, … } }`. For this site
// that is ~30 MiB, which exceeds Cloudflare Pages' 25 MiB per-file limit and
// also forces every visitor to download all 8 languages at once.
//
// We replace that single file with a directory of per-locale files at
// `out/api/search/<locale>`, each `{ type: 'i18n', data: { <locale>: <index> } }`
// so the client's `dbs.get(locale)` lookup still matches. The client
// (components/search.tsx) fetches `/api/search/<locale>`, so it only ever
// downloads the active language (≤ ~9 MiB).
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SEARCH = join('out', 'api', 'search');

let combined;
try {
  combined = JSON.parse(readFileSync(SEARCH, 'utf8'));
} catch (err) {
  console.warn(`[split-search-index] no combined index at ${SEARCH}, skipping (${err.message})`);
  process.exit(0);
}

if (combined?.type !== 'i18n' || !combined.data) {
  console.warn('[split-search-index] index is not i18n-shaped, leaving as-is');
  process.exit(0);
}

const locales = Object.keys(combined.data);

// Replace the single file with a directory of the same name.
rmSync(SEARCH, { force: true });
mkdirSync(SEARCH, { recursive: true });

for (const locale of locales) {
  const out = { type: 'i18n', data: { [locale]: combined.data[locale] } };
  const path = join(SEARCH, locale);
  writeFileSync(path, JSON.stringify(out));
  const mib = (Buffer.byteLength(JSON.stringify(out)) / 1048576).toFixed(2);
  console.log(`[split-search-index] ${path} (${mib} MiB)`);
}

console.log(`[split-search-index] split into ${locales.length} per-locale files`);
