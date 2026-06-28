import { getLLMText, source } from '@/lib/source';
import { i18n } from '@/lib/i18n';

export const revalidate = false;

// Full text of the default-language docs, for LLM ingestion.
export async function GET() {
  const pages = source.getPages(i18n.defaultLanguage);
  const scanned = await Promise.all(pages.map(getLLMText));
  return new Response(scanned.join('\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
