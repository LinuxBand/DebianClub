import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { pickLanding, pickExtras } from '@/lib/landing';
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
        <HomeContent lang={lang} />
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
    <DocsLayout tree={source.getPageTree(lang)} {...baseOptions(lang)}>
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

function HomeContent({ lang }: { lang: string }) {
  const t = pickLanding(lang);
  const x = pickExtras(lang);
  const prefix = lang === i18n.defaultLanguage ? '' : `/${lang}`;
  const href = (h: string) => {
    const slug = h.replace(/^\//, '').split('/').filter(Boolean);
    if (slug.length === 0) return prefix || '/';
    if (source.getPage(slug, lang)) return `${prefix}${h}`;
    if (lang !== 'en' && source.getPage(slug, 'en')) return `/en${h}`;
    return h;
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#org`,
        name: appName,
        url: siteUrl,
        logo: `${siteUrl}/images/debian-logo.svg`,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#site`,
        name: appName,
        url: siteUrl,
        inLanguage: hreflang(lang),
        publisher: { '@id': `${siteUrl}/#org` },
      },
    ],
  };

  return (
    <main className="flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 py-16 md:flex-row md:py-24">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Debian.Club</h1>
          <p className="mt-4 text-lg text-fd-muted-foreground">{t.tagline}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            {t.actions.map((a) => (
              <Link
                key={a.href}
                href={href(a.href)}
                className={
                  a.primary
                    ? 'rounded-lg bg-fd-primary px-5 py-2.5 font-medium text-fd-primary-foreground no-underline'
                    : 'rounded-lg border border-fd-border px-5 py-2.5 font-medium no-underline hover:bg-fd-accent'
                }
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
        <img
          src="/images/hero-home.png"
          alt="Debian.Club"
          className="w-full max-w-md rounded-xl md:flex-1"
          loading="lazy"
        />
      </section>

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.map((f) => (
          <div key={f.title} className="rounded-xl border border-fd-border bg-fd-card/40 p-5">
            <h3 className="font-semibold text-fd-foreground">{f.title}</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">{f.detail}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <h2 className="mb-5 text-2xl font-bold">{t.pathTitle}</h2>
        <img src="/images/scene-learn.png" alt="" className="mb-6 w-full rounded-xl" loading="lazy" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s) => (
            <div key={s.title} className="rounded-xl border border-fd-border p-5">
              <h3 className="mb-2 font-semibold text-fd-foreground">{s.title}</h3>
              <ul className="space-y-1.5 text-sm">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link href={href(l.href)} className="text-fd-muted-foreground hover:text-fd-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-fd-border bg-fd-card/30 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="mb-8 text-center text-2xl font-bold">{x.statsTitle}</h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {x.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-fd-primary md:text-4xl">{s.number}</div>
                <div className="mt-1 text-sm text-fd-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">{x.voicesTitle}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {x.testimonials.map((tm) => (
            <figure key={tm.name} className="flex flex-col rounded-xl border border-fd-border bg-fd-card/40 p-5">
              <blockquote className="flex-1 text-sm text-fd-foreground">“{tm.quote}”</blockquote>
              <figcaption className="mt-4">
                <div className="font-semibold text-fd-foreground">{tm.name}</div>
                <div className="text-xs text-fd-muted-foreground">{tm.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <h2 className="mb-5 text-2xl font-bold">{t.tryTitle}</h2>
        <img src="/images/devices.png" alt="" className="mb-4 w-full rounded-xl" loading="lazy" />
        <p className="text-fd-muted-foreground">{t.tryText}</p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <Link href={href(t.ctaHref)} className="text-fd-primary hover:underline">
          {t.ctaLabel}
        </Link>
      </section>
    </main>
  );
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
