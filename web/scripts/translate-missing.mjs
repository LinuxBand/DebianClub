#!/usr/bin/env node
// Batch translator for missing locale pages. zh MDX is the canonical source.
//
// Usage:
//   node scripts/translate-missing.mjs --dry-run                     # show the plan, no API calls
//   node scripts/translate-missing.mjs --locales ja,ko --limit 10    # translate up to 10 pages per locale
//
// Environment (OpenAI-compatible chat completions):
//   TRANSLATE_API_KEY    required unless --dry-run (e.g. a DeepSeek key)
//   TRANSLATE_API_BASE   default https://api.deepseek.com
//   TRANSLATE_API_MODEL  default deepseek-chat
//
// The run is resumable: existing translations are skipped, so re-run after
// interruption. Follow every real run with `pnpm i18n:check` and human review.

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { readdirSync, statSync } from 'node:fs';
import { relative } from 'node:path';

const DOCS = join(process.cwd(), 'content', 'docs');
const LOCALES = ['en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];
const LANGUAGE_NAMES = {
  en: 'English', de: 'German', es: 'Spanish', fr: 'French',
  ja: 'Japanese', ko: 'Korean', pt: 'Brazilian Portuguese',
};

// ---------------------------------------------------------------- args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const localeArg = args.find((value) => value.startsWith('--locales'))?.split('=')[1]
  ?? args[args.indexOf('--locales') + 1];
const locales = localeArg ? localeArg.split(',') : LOCALES;
const limitArg = args.find((value) => value.startsWith('--limit'))?.split('=')[1]
  ?? args[args.indexOf('--limit') + 1];
const limit = Number(limitArg ?? 5);
const apiKey = process.env.TRANSLATE_API_KEY;
const apiBase = (process.env.TRANSLATE_API_BASE ?? 'https://api.deepseek.com').replace(/\/$/, '');
const model = process.env.TRANSLATE_API_MODEL ?? 'deepseek-chat';

for (const locale of locales) {
  if (!LOCALES.includes(locale)) {
    console.error(`unknown locale: ${locale} (known: ${LOCALES.join(', ')})`);
    process.exit(1);
  }
}
if (!dryRun && !apiKey) {
  console.error('TRANSLATE_API_KEY is required (or pass --dry-run to preview the plan)');
  process.exit(1);
}

// ----------------------------------------------------------- inventory
function* walkMdx(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walkMdx(full);
    else if (entry.endsWith('.mdx')) yield full;
  }
}

const zhPages = [];
for (const file of walkMdx(DOCS)) {
  const rel = relative(DOCS, file).replaceAll('\\', '/');
  const base = rel.split('/').pop().replace(/\.mdx$/, '');
  if (!/^(.*)\.([a-z]{2})$/.test(base)) zhPages.push(rel);
}

function targetPath(rel, locale) {
  return join(DOCS, rel.replace(/\.mdx$/, `.${locale}.mdx`));
}

function zhSlugExists(slug) {
  return existsSync(join(DOCS, `${slug}.mdx`));
}

// ------------------------------------------------------ link fix-up
function localizeLinks(text, locale) {
  return text.replace(/\]\((\/[^)#\s]*)(#[^)]*)?\)/g, (whole, path, anchor = '') => {
    if (!zhSlugExists(path.replace(/^\//, ''))) return whole; // unknown target: leave untouched
    if (locale === 'en') return `](${path}${anchor})`; // en falls back to the zh root page
    return `](/${locale}${path}${anchor})`;
  });
}

function enforceComponentLangs(text, locale) {
  return text.replace(/(<(?:InteractiveTools|PackageSearch)[^>]*lang=")zh(")/g, `$1${locale}$2`);
}

function stripFence(text) {
  const trimmed = text.trim();
  const match = trimmed.match(/^```(?:mdx|markdown)?\n([\s\S]*?)\n```$/);
  return match ? match[1] : trimmed;
}

function buildPrompt(source, locale) {
  return [
    '你是 Debian.Club 的技术翻译，面向 Linux 初学者。把下面的简体中文教程 MDX 翻译成'
    + `${LANGUAGE_NAMES[locale]}。规则：`,
    '1. 保持 MDX 结构不变：frontmatter 键名、标题层级、列表、表格、代码块、MDX 组件标签原样保留。',
    `2. frontmatter 的 title 与 description 翻译成${LANGUAGE_NAMES[locale]}。`,
    '3. 命令、路径、包名、配置片段、URL 一律不翻译。',
    '4. 以 / 开头的站内链接路径保持不变（脚本会统一处理本地化前缀）。',
    `5. <InteractiveTools lang="zh" />、<PackageSearch lang="zh" /> 等组件的 lang 属性改为 "${locale}"。`,
    '6. Debian、GNOME、KDE、apt 等专有名词保留原文，并遵循目标语言 Debian 官方文档的术语习惯。',
    '7. 语气保持对初学者友好，与现有页面一致。',
    '8. 只输出翻译后的完整 MDX 内容，不要任何解释，也不要用代码围栏包裹。',
    '',
    '--- 源文件开始 ---',
    source,
    '--- 源文件结束 ---',
  ].join('\n');
}

async function translate(source, locale) {
  const response = await fetch(`${apiBase}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: buildPrompt(source, locale) }],
      temperature: 0.3,
    }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${(await response.text()).slice(0, 200)}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? '';
}

function validate(output) {
  const text = stripFence(output);
  if (!text.startsWith('---')) return null;
  if (text.length < 200) return null;
  if (!text.includes('title:')) return null;
  return text;
}

// ------------------------------------------------------------- main
let planned = 0;
let done = 0;
let failed = 0;

for (const locale of locales) {
  const missing = zhPages.filter((rel) => !existsSync(targetPath(rel, locale)));
  console.log(`\n[${locale}] ${missing.length} missing, translating up to ${limit}`);
  for (const rel of missing.slice(0, limit)) {
    planned += 1;
    const outPath = targetPath(rel, locale);
    if (dryRun) {
      console.log(`  would translate ${rel} -> ${relative(process.cwd(), outPath)}`);
      continue;
    }
    try {
      const source = readFileSync(join(DOCS, rel), 'utf8');
      const output = validate(await translate(source, locale)) ?? validate(await translate(source, locale));
      if (!output) {
        failed += 1;
        console.error(`  FAIL ${rel}: model output failed validation`);
        continue;
      }
      const finalText = enforceComponentLangs(localizeLinks(output, locale), locale);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, finalText.endsWith('\n') ? finalText : `${finalText}\n`);
      done += 1;
      console.log(`  OK   ${rel} -> ${relative(process.cwd(), outPath)}`);
    } catch (error) {
      failed += 1;
      console.error(`  FAIL ${rel}: ${error.message}`);
    }
  }
}

console.log(`\ndry-run=${dryRun} planned=${planned} written=${done} failed=${failed}`);
if (!dryRun) {
  console.log('next: review the diff, then run `pnpm i18n:check` before committing');
}
