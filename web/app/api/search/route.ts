import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer as createMandarin } from '@orama/tokenizers/mandarin';
import { createTokenizer as createJapanese } from '@orama/tokenizers/japanese';

export const revalidate = false;

// Per-locale search config. CJK (zh/ja/ko) use Fumadocs' 'cjk' tokenizer
// (via @orama/tokenizers); European locales use their Orama language.
export const { staticGET: GET } = createFromSource(source, {
  localeMap: {
    zh: { components: { tokenizer: createMandarin() }, search: { threshold: 0, tolerance: 0 } },
    ja: { components: { tokenizer: createJapanese() }, search: { threshold: 0, tolerance: 0 } },
    ko: { language: 'english' },
    de: { language: 'german' },
    es: { language: 'spanish' },
    fr: { language: 'french' },
    pt: { language: 'portuguese' },
    en: { language: 'english' },
  },
});
