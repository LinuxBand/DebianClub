import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { abs, hreflang, languageAlternates, ogDefault, pageUrl } from '@/lib/seo';
import { appName, siteUrl } from '@/lib/shared';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}) {
  const { lang, slug } = await params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const canonical = abs(pageUrl(lang, slug));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.data.title,
    description: page.data.description,
    url: canonical,
    inLanguage: hreflang(lang),
    publisher: {
      '@type': 'Organization',
      name: appName,
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/images/debian-logo.svg` },
    },
  };
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams().filter((p) => p.slug.length > 0);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const canonical = abs(pageUrl(lang, slug));
  const title = page.data.title;
  const description = page.data.description ?? undefined;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(slug, (l) => Boolean(source.getPage(slug, l))),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      siteName: appName,
      locale: hreflang(lang),
      images: [ogDefault],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogDefault] },
  };
}
