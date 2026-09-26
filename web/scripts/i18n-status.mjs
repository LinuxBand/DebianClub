#!/usr/bin/env node
// Reports which zh source pages have no translation in each locale.
// The zh pages (no .locale suffix) are the canonical content source.

import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DOCS = join(process.cwd(), 'content', 'docs');
const LOCALES = ['en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];

function* walkMdx(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walkMdx(full);
    } else if (entry.endsWith('.mdx')) {
      yield full;
    }
  }
}

const zhPages = [];
const localized = new Map(); // locale -> Set<slug>
for (const locale of LOCALES) localized.set(locale, new Set());

for (const file of walkMdx(DOCS)) {
  const rel = relative(DOCS, file).replaceAll('\\', '/');
  const dir = relative(DOCS, file).split(/[\\/]/).slice(0, -1).join('/');
  const base = rel.split('/').pop().replace(/\.mdx$/, '');
  const match = base.match(/^(.*)\.([a-z]{2})$/);
  const isLocalized = match && LOCALES.includes(match[2]);
  const slug = dir ? `${dir}/${isLocalized ? match[1] : base}` : (isLocalized ? match[1] : base);
  if (isLocalized) localized.get(match[2]).add(slug);
  else zhPages.push({ slug, rel });
}

const totals = {};
for (const locale of LOCALES) {
  const missing = zhPages.filter((page) => !localized.get(locale).has(page.slug));
  totals[locale] = missing;
}

console.log(`zh source pages: ${zhPages.length}`);
for (const locale of LOCALES) {
  const missing = totals[locale];
  const pct = Math.round(((zhPages.length - missing.length) / zhPages.length) * 100);
  console.log(`${locale}: ${missing.length} missing (${pct}% covered)`);
}

const firstMissing = totals.ja?.[0];
if (firstMissing) {
  console.log('\nexample missing (ja):');
  for (const page of totals.ja.slice(0, 10)) console.log(`  ${page.rel}`);
}

const grandTotal = LOCALES.reduce((sum, locale) => sum + totals[locale].length, 0);
console.log(`\ntotal missing translations: ${grandTotal}`);
if (process.env.I18N_STATUS_JSON) {
  const { writeFileSync } = await import('node:fs');
  writeFileSync(
    process.env.I18N_STATUS_JSON,
    JSON.stringify(
      Object.fromEntries(LOCALES.map((locale) => [locale, totals[locale].map((page) => page.rel)])),
      null,
      2,
    ) + '\n',
  );
  console.log(`json written to ${process.env.I18N_STATUS_JSON}`);
}
