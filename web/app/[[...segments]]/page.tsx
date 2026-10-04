import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { pickLanding } from '@/lib/landing';
import { appName, siteUrl } from '@/lib/shared';
import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/components/mdx';
import { DocsMegaHeader } from '@/components/docs-mega-header';
import { HomePage } from '@/components/home/HomePage';
import { getPageImage } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { abs, hreflang, languageAlternates, ogDefault, pageUrl } from '@/lib/seo';
import { resolveRouteSegments, routeSegments } from '@/lib/route';

type PageParams = Promise<{ segments?: string[] }>;

export const dynamicParams = false;

export default async function Page({ params }: { params: PageParams }) {
  const { segments = [] } = await params;
  const { lang, slug } = resolveRouteSegments(segments);

  if (slug.length === 0) {
    return (
      <HomeLayout {...baseOptions(lang)}>
        <HomePage lang={lang} />
      </HomeLayout>
    );
  }

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
    <DocsLayout
      tree={source.getPageTree(lang)}
      {...baseOptions(lang, true)}
      slots={{ header: DocsMegaHeader }}
    >
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { segments = [] } = await params;
  const { lang, slug } = resolveRouteSegments(segments);

  if (slug.length === 0) {
    const t = pickLanding(lang);
    const canonical = abs(pageUrl(lang, []));

    return {
      title: { absolute: `${appName} — ${t.tagline}` },
      description: t.tagline,
      alternates: { canonical, languages: languageAlternates([], () => true) },
      openGraph: {
        title: appName,
        description: t.tagline,
        url: canonical,
        type: 'website',
        siteName: appName,
        locale: hreflang(lang),
        images: [ogDefault],
      },
      twitter: { card: 'summary_large_image', title: appName, description: t.tagline, images: [ogDefault] },
    };
  }

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

export function generateStaticParams() {
  const params = i18n.languages.map((lang) => ({
    segments: routeSegments(lang),
  }));

  for (const page of source.generateParams().filter((p) => p.slug.length > 0)) {
    params.push({ segments: routeSegments(page.lang, page.slug) });
  }

  return params;
}
