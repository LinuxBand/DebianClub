import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

// Per-locale Orama language. CJK (zh/ja/ko) fall back to english tokenization
// for now; proper @orama/tokenizers (mandarin/japanese) come in P6.
export const { staticGET: GET } = createFromSource(source, {
  localeMap: {
    zh: { language: 'english' },
    ja: { language: 'english' },
    ko: { language: 'english' },
    de: { language: 'german' },
    es: { language: 'spanish' },
    fr: { language: 'french' },
    pt: { language: 'portuguese' },
    en: { language: 'english' },
  },
});
