'use client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { oramaStaticClient } from 'fumadocs-core/search/client/orama-static';
import { create } from '@orama/orama';
import { createTokenizer as createMandarin } from '@orama/tokenizers/mandarin';
import { createTokenizer as createJapanese } from '@orama/tokenizers/japanese';
import { useI18n } from 'fumadocs-ui/contexts/i18n';

const schema = { _: 'string' } as const;

// Must match the per-locale tokenizers used to build the index
// (app/api/search/route.ts), or CJK queries won't tokenize the same way.
function initOrama(locale?: string) {
  switch (locale) {
    case 'zh':
      return create({ schema, components: { tokenizer: createMandarin() } });
    case 'ja':
      return create({ schema, components: { tokenizer: createJapanese() } });
    case 'de':
      return create({ schema, language: 'german' });
    case 'es':
      return create({ schema, language: 'spanish' });
    case 'fr':
      return create({ schema, language: 'french' });
    case 'pt':
      return create({ schema, language: 'portuguese' });
    default:
      // en, ko (Korean is space-separated; english tokenizer is adequate)
      return create({ schema, language: 'english' });
  }
}

export default function DefaultSearchDialog(props: SharedProps) {
  const { locale } = useI18n(); // (optional) for i18n
  const { search, setSearch, query } = useDocsSearch({
    client: oramaStaticClient({
      initOrama,
      locale,
      // Per-locale index file (built by _migration/split-search-index.mjs):
      // only the active language is fetched, and each file stays under
      // Cloudflare Pages' 25 MiB per-file limit.
      from: `/api/search/${locale || 'zh'}`,
    }),
  });

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
