// Build-time sync: pull the latest friend-links data from the directories-links
// repo and regenerate content/docs/links*.mdx (8 languages). Runs before
// `next build`. On network failure it falls back to the committed cache so the
// build never breaks (important for CI / Cloudflare Pages).
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = 'https://raw.githubusercontent.com/yeagoo/directories-links/main/link.json';
const CACHE = resolve(__dirname, 'link.json');
const DOCS = resolve(__dirname, '../content/docs');

// Reject anything that isn't the expected shape, so a syntactically-valid but
// incomplete upstream payload can't poison the committed fallback cache.
function assertShape(data) {
  if (
    !data ||
    !Array.isArray(data.authority_documentation_sites) ||
    !Array.isArray(data.footer_navigation_sites) ||
    !data.i18n ||
    typeof data.i18n !== 'object'
  ) {
    throw new Error('payload missing required fields (authority_documentation_sites / footer_navigation_sites / i18n)');
  }
  return data;
}

async function getData() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    // Keep the abort timer armed through the body read so a stalled stream
    // (headers sent, body never finishes) still aborts and falls back.
    const res = await fetch(SOURCE, { signal: ctrl.signal, headers: { 'User-Agent': 'debian-club-build' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const data = assertShape(JSON.parse(text));
    writeFileSync(CACHE, text);
    console.log('[sync-links] fetched latest link.json from GitHub');
    return data;
  } catch (err) {
    if (existsSync(CACHE)) {
      console.warn(`[sync-links] fetch failed (${err.message}); using committed cache`);
      return assertShape(JSON.parse(readFileSync(CACHE, 'utf8')));
    }
    throw new Error(`[sync-links] fetch failed and no cache available: ${err.message}`);
  } finally {
    clearTimeout(timer);
  }
}

// web lang -> i18n locale key (section titles); description_i18n only has zh/en
const LOC = { zh: 'zh-CN', en: 'en-US', de: 'de-DE', es: 'es-ES', fr: 'fr-FR', ja: 'ja-JP', ko: 'ko-KR', pt: 'pt-PT' };
const DESC = { zh: 'zh-CN' }; // anything else -> en-US fallback
const COLS = {
  zh: ['站点', '描述'], en: ['Site', 'Description'], de: ['Seite', 'Beschreibung'],
  es: ['Sitio', 'Descripción'], fr: ['Site', 'Description'], ja: ['サイト', '説明'],
  ko: ['사이트', '설명'], pt: ['Site', 'Descrição'],
};
const INTRO = {
  zh: '以下为我们认可的权威文档站与导航站合作伙伴，均为 dofollow 外链。DR 表示 Domain Rating（域名权重）。',
  en: 'Our trusted authoritative documentation and navigation site partners — all dofollow links. DR is Domain Rating.',
  de: 'Unsere vertrauenswürdigen Partner: autoritative Dokumentations- und Navigationsseiten — alle dofollow. DR steht für Domain Rating.',
  es: 'Nuestros socios de confianza: sitios de documentación autorizada y de navegación, todos enlaces dofollow. DR significa Domain Rating.',
  fr: 'Nos partenaires de confiance : sites de documentation de référence et de navigation, tous en liens dofollow. DR signifie Domain Rating.',
  ja: '信頼できる権威あるドキュメントサイトとナビゲーションサイトのパートナー（すべて dofollow リンク）。DR は Domain Rating を表します。',
  ko: '신뢰할 수 있는 권위 문서 사이트 및 내비게이션 사이트 파트너 — 모두 dofollow 링크입니다. DR은 Domain Rating을 의미합니다.',
  pt: 'Nossos parceiros confiáveis: sites de documentação autorizada e de navegação, todos com links dofollow. DR significa Domain Rating.',
};

const visible = (e) => e.status !== 'archived' && e.links_page_included !== false;
const drStr = (e) => (e.dr === null || e.dr === undefined || e.dr === '' || e.dr === '—' ? '—' : String(e.dr));

// Neutralize MDX/JSX + table metacharacters in table-cell text so a hostile or
// malformed upstream record renders as plain text instead of injecting markup.
const escCell = (s) =>
  String(s ?? '')
    .replace(/[\\<>{}|`]/g, (c) => '\\' + c)
    .replace(/\r?\n/g, ' ')
    .trim();
// Link text additionally can't contain unescaped brackets ([text](url)).
const escName = (s) => escCell(s).replace(/[[\]]/g, (c) => '\\' + c);
// Only allow http(s) links; reject javascript:/data:/etc. Returns null if unsafe.
function safeUrl(u) {
  try {
    const url = new URL(String(u));
    if (url.protocol === 'http:' || url.protocol === 'https:') return url.href;
  } catch {
    /* fall through */
  }
  return null;
}
function desc(e, lang) {
  const di = e.description_i18n || {};
  const key = DESC[lang] || 'en-US';
  return di[key] || di['en-US'] || di['zh-CN'] || e.description || '';
}
function table(entries, lang) {
  const [s, d] = COLS[lang];
  const rows = [`| ${s} | ${d} | DR |`, '|------|------|------|'];
  for (const e of entries) {
    if (!visible(e)) continue;
    const url = safeUrl(e.url);
    if (!url) continue; // skip records with a missing/unsafe URL
    rows.push(`| [${escName(e.name)}](${url}) | ${escCell(desc(e, lang))} | ${escCell(drStr(e))} |`);
  }
  return rows.join('\n');
}

const data = await getData();
const auth = data.authority_documentation_sites;
const nav = data.footer_navigation_sites;
const I18N = data.i18n;

let n = 0;
for (const [lang, loc] of Object.entries(LOC)) {
  const t = I18N[loc];
  const body = `---
title: "${t.friend_links_title}"
---

${INTRO[lang]}

## ${t.authority_documentation_sites_title}

${table(auth, lang)}

## ${t.footer_navigation_sites_title}

${table(nav, lang)}
`;
  writeFileSync(resolve(DOCS, lang === 'zh' ? 'links.mdx' : `links.${lang}.mdx`), body);
  n++;
}
console.log(`[sync-links] regenerated ${n} links pages (${auth.filter(visible).length} auth + ${nav.filter(visible).length} nav)`);
