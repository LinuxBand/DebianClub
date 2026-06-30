import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { getPageImage } from '@/lib/source';
import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { abs, hreflang, languageAlternates, pageUrl } from '@/lib/seo';
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
  // BreadcrumbList from the page tree (named sections + page), e.g.
  // Debian.Club > Administration > Users & permissions
  const crumbs = getBreadcrumbItems(page.url, source.getPageTree(lang), { includePage: true })
    .map((c) => ({ name: typeof c.name === 'string' ? c.name : '', url: c.url }))
    .filter((c): c is { name: string; url: string } => c.name !== '' && typeof c.url === 'string');
  const breadcrumbItems: { name: string; url: string }[] = [
    { name: appName, url: pageUrl(lang, []) },
    ...crumbs,
  ];
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.url),
    })),
  };
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
  const ogImage = abs(getPageImage(page).url);
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}
