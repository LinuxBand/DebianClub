// Navigation-site partners (from directories-links link.json -> footer_navigation_sites).
// All links dofollow (no rel="nofollow"). Shared across all locales.
const navSites = [
  { name: 'aat.ee', url: 'https://www.aat.ee/', logo: '/assets/logos/aat-ee.svg' },
  { name: 'MiFar', url: 'http://mifar.net/', logo: '/assets/logos/mifar.svg' },
  { name: 'Qoo.IM', url: 'https://qoo.im/', logo: '/assets/logos/qoo-im.svg' },
  { name: 'FastD', url: 'http://fastd.top/', logo: '/assets/logos/fastd.svg' },
  { name: 'Xlayers', url: 'http://xlayers.dev/', logo: '/assets/logos/xlayers.svg' },
  { name: 'Upperstory', url: 'http://upperstory.io/', logo: '/assets/logos/upperstory.svg' },
  { name: 'XemVIP', url: 'http://xemvip.com/', logo: '/assets/logos/xemvip.svg' },
  { name: 'SkaChat', url: 'http://skachat.xyz/', logo: '/assets/logos/skachat.svg' },
  { name: 'NexaBlocks', url: 'http://nexablocks.com/', logo: '/assets/logos/nexablocks.svg' },
  { name: 'BlackHawkGame', url: 'http://blackhawkegames.com/', logo: '/assets/logos/blackhawkgame.svg' },
  { name: 'HiCyou', url: 'https://hicyou.com/', logo: '/assets/logos/hicyou.svg' },
  { name: 'BigKr', url: 'https://bigkr.com/', logo: '/assets/logos/bigkr.svg' },
  { name: 'MF8', url: 'https://www.mf8.biz/', logo: '/assets/logos/mf8.svg' },
];

export function CustomFooter() {
  return (
    <footer className="border-t border-fd-border bg-fd-background px-6 py-7">
      <nav
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3"
        aria-label="Navigation partners"
      >
        {navSites.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-3 py-1.5 no-underline transition-colors hover:border-fd-primary"
          >
            <img src={s.logo} alt="" loading="lazy" className="block h-[22px] w-auto" />
            <span className="whitespace-nowrap text-[13px] font-medium text-fd-muted-foreground">
              {s.name}
            </span>
          </a>
        ))}
      </nav>
    </footer>
  );
}
