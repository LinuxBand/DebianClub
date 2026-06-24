import Link from 'next/link';
import type { Metadata } from 'next';
import { i18n } from '@/lib/i18n';
import { source } from '@/lib/source';
import { pickLanding, pickExtras } from '@/lib/landing';
import { abs, hreflang, languageAlternates, ogDefault, pageUrl } from '@/lib/seo';
import { appName } from '@/lib/shared';

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = pickLanding(lang);
  const canonical = abs(pageUrl(lang, []));
  return {
    title: appName,
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

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = pickLanding(lang);
  const x = pickExtras(lang);
  const prefix = lang === i18n.defaultLanguage ? '' : `/${lang}`;
  // Resolve a doc link to a locale where it actually exists (fallback is
  // disabled), so localized landings never link to missing pages: current
  // locale -> English -> zh (default, root).
  const href = (h: string) => {
    const slug = h.replace(/^\//, '').split('/').filter(Boolean);
    if (slug.length === 0) return prefix || '/';
    if (source.getPage(slug, lang)) return `${prefix}${h}`;
    if (lang !== 'en' && source.getPage(slug, 'en')) return `/en${h}`;
    return h;
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* hero */}
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
        />
      </section>

      {/* features */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.map((f) => (
          <div key={f.title} className="rounded-xl border border-fd-border bg-fd-card/40 p-5">
            <h3 className="font-semibold text-fd-foreground">{f.title}</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">{f.detail}</p>
          </div>
        ))}
      </section>

      {/* learning path */}
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

      {/* stats */}
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

      {/* testimonials */}
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

      {/* try */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <h2 className="mb-5 text-2xl font-bold">{t.tryTitle}</h2>
        <img src="/images/devices.png" alt="" className="mb-4 w-full rounded-xl" loading="lazy" />
        <p className="text-fd-muted-foreground">{t.tryText}</p>
      </section>

      {/* cta */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <Link href={href(t.ctaHref)} className="text-fd-primary hover:underline">
          {t.ctaLabel}
        </Link>
      </section>
    </main>
  );
}
