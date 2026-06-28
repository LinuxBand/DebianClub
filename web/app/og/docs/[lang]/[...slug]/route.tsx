import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName } from '@/lib/shared';

export const revalidate = false;

// Per-page, per-locale OG image (1200x630) with the localized title.
export async function GET(_req: Request, { params }: { params: Promise<{ lang: string; slug: string[] }> }) {
  const { lang, slug } = await params;
  const page = source.getPage(slug.slice(0, -1), lang); // drop trailing 'image.png'
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage title={page.data.title} description={page.data.description} site={appName} />,
    { width: 1200, height: 630 },
  );
}

export function generateStaticParams() {
  const out: { lang: string; slug: string[] }[] = [];
  for (const lang of i18n.languages) {
    for (const page of source.getPages(lang)) {
      out.push({ lang, slug: [...page.slugs, 'image.png'] });
    }
  }
  return out;
}
