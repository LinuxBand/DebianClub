import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowsClockwise,
  Compass,
  Cpu,
  Devices,
  Lightning,
  LockKeyOpen,
  Package,
  ShieldCheck,
  Sparkle,
  TerminalWindow,
  Translate,
} from '@phosphor-icons/react/ssr';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import {
  pickExtras,
  pickFocus,
  pickLanding,
  pickRelease,
  releaseCodenames,
  releaseUpgrades,
} from '@/lib/landing';
import { appName, siteUrl } from '@/lib/shared';
import { hreflang } from '@/lib/seo';
import facts from '@/lib/debian-facts.json';
import { HeroTerminal } from './HeroTerminal';
import { HomeMotion } from './HomeMotion';
import { Swirl } from './Swirl';

// Matches the order of `features` in lib/landing.ts.
const featureIcons = [LockKeyOpen, Compass, TerminalWindow, Translate, Devices, ArrowsClockwise];

const stagger = (i: number) => ({ '--i': i }) as CSSProperties;
const pad = (n: number) => String(n).padStart(2, '0');

function Kicker({ index, path }: { index: number; path: string }) {
  return (
    <p aria-hidden="true" className="font-code text-xs tracking-wide text-fd-muted-foreground">
      <span className="text-fd-primary">{pad(index)}</span>
      <span className="mx-2 inline-block h-px w-6 bg-fd-border align-middle" />
      {path}
    </p>
  );
}

export function HomePage({ lang }: { lang: string }) {
  const t = pickLanding(lang);
  const x = pickExtras(lang);
  const focus = pickFocus(lang);
  const rel = pickRelease(lang);
  const stable = facts.releases.stable;
  const prefix = lang === i18n.defaultLanguage ? '' : `/${lang}`;
  const href = (h: string) => {
    const slug = h.replace(/^\//, '').split('/').filter(Boolean);
    if (slug.length === 0) return prefix || '/';
    if (source.getPage(slug, lang)) return `${prefix}${h}`;
    if (lang !== 'en' && source.getPage(slug, 'en')) return `/en${h}`;
    return h;
  };

  // "Learn Debian 13 from zero · the most stable Linux distribution"
  // The release number never wraps away from the name ("Debian 13").
  const [headline, subline] = t.tagline.replace(/Debian (\d+)/, 'Debian\u00a0$1').split(/\s*[·・]\s*/);
  const [primary, secondary, tertiary] = t.actions;
  const [leadVoice, ...voices] = x.testimonials;
  const [brand, brandTld] = appName.split('.');
  const whatsNew = source.getPage(['basics', 'whats-new'], lang) ?? source.getPage(['basics', 'whats-new'], 'en');

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

  const ticker = (hidden: boolean) => (
    <ul className="home-marquee__track" aria-hidden={hidden || undefined}>
      {releaseCodenames.map((release) => {
        const current = release.name === stable.codename;
        return (
          <li key={release.name} className="flex items-baseline gap-2 px-6">
            <span
              className={
                current
                  ? 'font-display text-lg font-semibold text-fd-primary'
                  : 'font-display text-lg font-medium text-fd-foreground/70'
              }
            >
              {release.name}
            </span>
            <span className="font-code text-[11px] text-fd-muted-foreground">{release.version}</span>
            {current && (
              <span className="rounded-sm bg-fd-primary px-1.5 py-0.5 font-code text-[10px] font-medium uppercase tracking-wider text-fd-primary-foreground">
                stable
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <main data-home="" className="flex flex-1 flex-col overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeMotion />

      {/* Hero */}
      <section className="relative isolate overflow-clip">
        <div aria-hidden="true" className="home-dots absolute inset-0 -z-10" />
        <div className="mx-auto grid w-full max-w-(--fd-layout-width) items-center gap-x-8 gap-y-10 px-4 pb-14 pt-12 sm:pt-16 lg:min-h-[min(46rem,calc(100dvh-7.5rem))] lg:grid-cols-12 lg:pb-20 lg:pt-16">
          <div className="relative z-10 min-w-0 lg:col-span-7">
            <Link
              href={href('/versions')}
              style={stagger(0)}
              className="home-rise group inline-flex items-center gap-2.5 rounded-full border border-fd-border bg-fd-background/70 py-1 pe-3 ps-2.5 font-code text-xs text-fd-muted-foreground no-underline backdrop-blur transition-colors hover:border-fd-primary/50 hover:text-fd-foreground"
            >
              <span className="home-pulse" />
              <span>
                debian <span className="text-fd-foreground">{stable.version}</span> · {stable.codename} · stable
              </span>
              <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <h1
              style={stagger(1)}
              className={`home-rise mt-7 text-balance wrap-anywhere font-display text-[clamp(2.6rem,7.2vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fd-foreground ${
                // Keep CJK phrases whole ("从零开始学习 / Debian 13"); Japanese has
                // no spaces to break on, so it breaks at phrase boundaries.
                lang === 'ja' ? '[word-break:auto-phrase]' : 'break-keep'
              }`}
            >
              <span className="sr-only">{appName} — </span>
              {headline}
            </h1>

            {subline && (
              <p
                style={stagger(2)}
                className="home-rise mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fd-muted-foreground md:text-xl"
              >
                {subline}
              </p>
            )}

            <div style={stagger(3)} className="home-rise mt-9 flex flex-wrap items-center gap-x-3 gap-y-4">
              {primary && (
                <Link href={href(primary.href)} className="home-btn home-btn--primary group">
                  {primary.label}
                  <ArrowRight weight="bold" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
              {secondary && (
                <Link href={href(secondary.href)} className="home-btn home-btn--ghost">
                  {secondary.label}
                </Link>
              )}
              {tertiary && (
                <Link href={href(tertiary.href)} className="home-link ms-2 text-sm font-medium text-fd-foreground">
                  {tertiary.label}
                </Link>
              )}
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:h-full lg:min-h-[30rem]">
            <Swirl className="home-swirl" />
            <HeroTerminal
              version={stable.version}
              codename={stable.codename}
              className="home-rise relative mx-auto mt-[56vw] w-full max-w-md sm:mt-72 lg:absolute lg:-bottom-12 lg:-left-16 lg:mt-0 lg:w-[27rem] lg:max-w-none"
            />
          </div>
        </div>
      </section>

      {/* Release ticker: every Debian codename, buzz → forky */}
      <div className="home-marquee border-y border-fd-border py-4">
        {ticker(false)}
        {ticker(true)}
      </div>

      {/* What you get */}
      <section className="mx-auto w-full max-w-(--fd-layout-width) px-4 pt-20 lg:pt-28">
        <div
          data-spot=""
          className="home-spot grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.features.map((feature, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <div key={feature.title} className="group bg-fd-background p-7 lg:p-9">
                <div data-reveal="" style={stagger(i % 3)}>
                  <div className="flex items-center justify-between">
                    <Icon className="size-6 text-fd-primary transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-110" />
                    <span aria-hidden="true" className="font-code text-[11px] text-fd-muted-foreground/70">
                      {pad(i + 1)}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-lg font-semibold tracking-tight text-fd-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">{feature.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* What's new in the current stable release — bento */}
      <section className="mx-auto w-full max-w-(--fd-layout-width) px-4 pt-24 lg:pt-36">
        <div data-reveal="" className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker index={1} path="release" />
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-[-0.03em] text-fd-foreground md:text-5xl">
              {whatsNew?.data.title ?? `Debian ${stable.number}`}
            </h2>
          </div>
          <Link
            href={href('/basics/whats-new')}
            className="home-link group inline-flex items-center gap-1.5 text-sm font-medium text-fd-foreground"
          >
            {rel.viewAll}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-12">
          <div data-reveal="" className="flex min-w-0 lg:col-span-7 lg:row-span-2">
            <TileLink href={href(rel.hero.href)} variant="hero">
              <div aria-hidden="true" className="home-tile__stage">
                <span className="home-tile__numeral font-display">{stable.number}</span>
              </div>
              <TileCaption
                icon={<Sparkle />}
                title={`Debian ${stable.number} \u201c${stable.codenameTitle}\u201d`}
                detail={rel.released(stable.releaseDate, stable.ltsEnd)}
              />
            </TileLink>
          </div>

          <div data-reveal="" style={stagger(1)} className="flex min-w-0 lg:col-span-5">
            <TileLink href={href(rel.apt.href)}>
              <div aria-hidden="true" className="home-tile__stage flex-wrap content-center gap-y-2 font-code">
                <span className="home-strike text-base text-fd-muted-foreground sm:text-xl md:text-2xl">sources.list</span>
                <ArrowRight className="mx-2 size-4 shrink-0 text-fd-muted-foreground sm:mx-3" />
                <span className="text-base font-semibold text-fd-foreground sm:text-xl md:text-2xl">debian.sources</span>
              </div>
              <TileCaption icon={<TerminalWindow />} title={rel.apt.title} detail={rel.apt.detail} />
            </TileLink>
          </div>

          <div data-reveal="" style={stagger(2)} className="flex min-w-0 lg:col-span-5">
            <TileLink href={href(rel.packages.href)}>
              <div aria-hidden="true" className="home-tile__stage">
                <ul className="w-full max-w-xs space-y-3 font-code text-xs">
                  {releaseUpgrades.map((pkg, i) => (
                    <li key={pkg.name} className="grid grid-cols-[3.75rem_1fr_auto] items-center gap-3">
                      <span className="text-fd-muted-foreground">{pkg.name}</span>
                      <span className="home-meter" style={{ '--w': 0.55 + i * 0.2, '--i': i } as CSSProperties} />
                      <span className="text-fd-muted-foreground">
                        {pkg.from} <span className="text-fd-primary">→</span>{' '}
                        <span className="font-semibold text-fd-foreground">{pkg.to}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <TileCaption icon={<Package />} title={rel.packages.title} detail={rel.packages.detail} />
            </TileLink>
          </div>

          <div data-reveal="" className="flex min-w-0 lg:col-span-4">
            <TileLink href={href(rel.time.href)}>
              <div aria-hidden="true" className="home-tile__stage">
                <span className="home-rings">
                  <ShieldCheck weight="bold" className="size-6" />
                </span>
              </div>
              <TileCaption icon={<ShieldCheck />} title={rel.time.title} detail={rel.time.detail} />
            </TileLink>
          </div>

          <div data-reveal="" style={stagger(1)} className="flex min-w-0 lg:col-span-4">
            <TileLink href={href(rel.riscv.href)}>
              <div aria-hidden="true" className="home-tile__stage home-tile__stage--dots">
                <span className="home-chip">
                  <Cpu className="size-7" />
                </span>
              </div>
              <TileCaption icon={<Cpu />} title={rel.riscv.title} detail={rel.riscv.detail} />
            </TileLink>
          </div>

          <div data-reveal="" style={stagger(2)} className="flex min-w-0 lg:col-span-4">
            <TileLink href={href(rel.tmp.href)}>
              <div aria-hidden="true" className="home-tile__stage gap-4">
                <span className="font-code text-sm text-fd-muted-foreground">tmpfs</span>
                <span className="home-toggle" />
              </div>
              <TileCaption icon={<Lightning />} title={rel.tmp.title} detail={rel.tmp.detail} />
            </TileLink>
          </div>
        </div>
      </section>

      {/* Learning path — fills like the installer's progress bar as you scroll */}
      <section className="mx-auto w-full max-w-(--fd-layout-width) px-4 pt-24 lg:pt-36">
        <div data-scroll-progress="" className="home-path">
          <div data-reveal="" className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker index={2} path="learn" />
              <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-[-0.03em] text-fd-foreground md:text-5xl">
                {t.pathTitle}
              </h2>
            </div>
            <p aria-hidden="true" className="font-code text-xs text-fd-muted-foreground">
              debian-installer{' '}
              <span data-progress-label="" className="inline-block w-[4ch] text-end tabular-nums text-fd-primary">
                100%
              </span>
            </p>
          </div>

          <div className="home-path__steps mt-12 lg:mt-16">
            <div aria-hidden="true" className="home-path__track">
              <span className="home-path__fill" />
            </div>
            <ol>
            {t.steps.map((step, i) => (
              <li
                key={step.title}
                className="home-path__step"
                style={{ '--at': i / t.steps.length } as CSSProperties}
              >
                <span aria-hidden="true" className="home-path__node" />
                <div data-reveal="" style={stagger(i)}>
                  <span aria-hidden="true" className="home-path__num font-code text-xs">
                    {pad(i + 1)}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-fd-foreground">
                    {step.title.replace(/^\d+\.\s*/, '')}
                  </h3>
                  <ul className="mt-5 border-t border-fd-border">
                    {step.links.map((link) => (
                      <li key={link.href} className="border-b border-fd-border">
                        <Link
                          href={href(link.href)}
                          className="group flex items-center justify-between gap-3 py-3 text-sm text-fd-muted-foreground no-underline transition-colors duration-300 hover:text-fd-foreground"
                        >
                          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                            {link.label}
                          </span>
                          <ArrowRight className="size-3.5 shrink-0 -translate-x-2 text-fd-primary opacity-0 transition duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Featured areas — editorial index */}
      <section className="mx-auto grid w-full max-w-(--fd-layout-width) gap-x-8 gap-y-10 px-4 pt-24 lg:grid-cols-12 lg:pt-36">
        <div className="lg:col-span-4">
          <div data-reveal="" className="lg:sticky lg:top-28">
            <Kicker index={3} path="explore" />
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-[-0.03em] text-fd-foreground md:text-5xl">
              {focus.title}
            </h2>
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-fd-muted-foreground">{focus.detail}</p>
          </div>
        </div>
        <ul className="border-t border-fd-border lg:col-span-8">
          {focus.areas.map((area, i) => (
            <li key={area.href} data-reveal="" style={stagger(i)} className="border-b border-fd-border">
              <Link href={href(area.href)} className="home-row group">
                <span aria-hidden="true" className="font-code text-xs text-fd-muted-foreground">
                  {pad(i + 1)}
                </span>
                <span className="min-w-0">
                  <span className="home-row__title font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {area.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-fd-muted-foreground">
                    {area.detail}
                  </span>
                </span>
                <span aria-hidden="true" className="home-row__arrow">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Debian by the numbers */}
      <section className="relative isolate mt-24 border-y border-fd-border bg-fd-card/40 lg:mt-36">
        <div aria-hidden="true" className="home-dots home-dots--wide absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-(--fd-layout-width) px-4 py-20 lg:py-28">
          <div data-reveal="">
            <Kicker index={4} path="numbers" />
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-fd-foreground md:text-5xl">
              {x.statsTitle}
            </h2>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
            {x.stats.map((stat, i) => {
              const [, value, suffix] = /^(.*?)(\+?)$/.exec(stat.number) ?? [];
              return (
                <div
                  key={stat.label}
                  data-reveal=""
                  style={stagger(i)}
                  className="flex flex-col-reverse gap-3 border-s border-fd-border ps-5 lg:ps-7"
                >
                  <dt className="text-sm text-fd-muted-foreground">{stat.label}</dt>
                  <dd className="font-display text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums text-fd-foreground">
                    <span data-count="">{value}</span>
                    {suffix && <span className="text-fd-primary">{suffix}</span>}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* Community voices */}
      <section className="mx-auto w-full max-w-(--fd-layout-width) px-4 pt-24 lg:pt-36">
        <div data-reveal="">
          <Kicker index={5} path="voices" />
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-fd-foreground md:text-5xl">
            {x.voicesTitle}
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-fd-border bg-fd-border lg:mt-16 lg:grid-cols-12">
          {leadVoice && (
            <figure className="flex flex-col justify-between gap-12 bg-fd-background p-8 lg:col-span-7 lg:row-span-2 lg:p-12">
              <blockquote data-reveal="" className="home-quote text-pretty font-display text-2xl font-medium leading-snug tracking-tight text-fd-foreground md:text-[2rem] md:leading-[1.25]">
                {leadVoice.quote}
              </blockquote>
              <Attribution name={leadVoice.name} role={leadVoice.role} />
            </figure>
          )}
          {voices.map((voice, i) => (
            <figure
              key={voice.name}
              className="flex flex-col justify-between gap-8 bg-fd-background p-8 lg:col-span-5"
            >
              <blockquote data-reveal="" style={stagger(i + 1)} className="text-pretty leading-relaxed text-fd-foreground">
                {voice.quote}
              </blockquote>
              <Attribution name={voice.name} role={voice.role} />
            </figure>
          ))}
        </div>
      </section>

      {/* Try Debian */}
      <section className="mx-auto grid w-full max-w-(--fd-layout-width) items-center gap-x-12 gap-y-10 px-4 pt-24 lg:grid-cols-12 lg:pt-36">
        <div data-reveal="wipe" className="lg:col-span-7">
          <div className="home-frame">
          <img
            src="/images/devices.webp"
            alt=""
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
          </div>
        </div>
        <div data-reveal="" className="lg:col-span-5">
          <Kicker index={6} path="try" />
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-[-0.03em] text-fd-foreground md:text-5xl">
            {t.tryTitle}
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-fd-muted-foreground">{t.tryText}</p>
          {secondary && (
            <Link href={href(secondary.href)} className="home-btn home-btn--ghost group mt-8">
              {secondary.label}
              <ArrowRight weight="bold" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </section>

      {/* Closer — the wordmark fills in as it scrolls into place */}
      <section className="mx-auto w-full max-w-(--fd-layout-width) px-4 pb-20 pt-28 lg:pb-28 lg:pt-44">
        <div data-scroll-progress="enter" className="home-closer">
          <p aria-hidden="true" className="home-wordmark font-display">
            <span className="home-wordmark__outline">{appName}</span>
            <span className="home-wordmark__fill">
              {brand}
              <span className="text-fd-primary">.</span>
              {brandTld}
            </span>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-fd-border pt-8">
            <p className="max-w-md text-pretty text-lg text-fd-muted-foreground">{t.tagline}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              {primary && (
                <Link href={href(primary.href)} className="home-btn home-btn--primary group">
                  {primary.label}
                  <ArrowRight weight="bold" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
              <Link href={href(t.ctaHref)} className="home-link text-sm font-medium text-fd-foreground">
                {t.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// A whole release-bento tile as one link: the corner arrow appears on hover
// to signal "this card opens a feature page".
function TileLink({
  href: to,
  variant,
  children,
}: {
  href: string;
  variant?: 'hero';
  children: ReactNode;
}) {
  return (
    <Link
      href={to}
      className={`home-tile group min-w-0 flex-1 no-underline ${variant === 'hero' ? 'home-tile--hero' : ''}`}
    >
      <ArrowUpRight weight="bold" aria-hidden="true" className="home-tile__more" />
      {children}
    </Link>
  );
}

function TileCaption({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) {
  return (
    <div className="relative">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-fd-foreground [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-fd-primary">
        {icon}
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">{detail}</p>
    </div>
  );
}

function Attribution({ name, role }: { name: string; role: string }) {
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('');
  return (
    <figcaption className="flex items-center gap-3.5">
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-fd-primary/10 font-code text-xs font-medium text-fd-primary"
      >
        {initials}
      </span>
      <span>
        <span className="block text-sm font-semibold text-fd-foreground">{name}</span>
        <span className="block text-xs text-fd-muted-foreground">{role}</span>
      </span>
    </figcaption>
  );
}
