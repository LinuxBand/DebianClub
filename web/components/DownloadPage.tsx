'use client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';

const CD = 'https://cdimage.debian.org/debian-cd/current';
const LIVE = 'https://cdimage.debian.org/debian-cd/current-live';

interface Strings {
  netinst: string;
  netinstDesc: string;
  dvd: string;
  dvdDesc: string;
  live: string;
  liveDesc: string;
  note: string;
  link: string;
}

const en: Strings = {
  netinst: 'Network install (netinst)',
  netinstDesc: '~600 MB · downloads packages during install (recommended, most common)',
  dvd: 'Full DVD',
  dvdDesc: 'Complete offline image · install many packages without a network',
  live: 'Live image',
  liveDesc: 'Try Debian without installing · can also install from the live session',
  note: 'Images come from the official Debian cdimage (current = stable Debian 13). Verify the SHA256 checksum after downloading. More mirrors and architectures at',
  link: 'the official Debian download page',
};

const zh: Strings = {
  netinst: '网络安装 (netinst)',
  netinstDesc: '约 600 MB · 安装时从网络下载软件包（推荐，最常用）',
  dvd: '完整 DVD',
  dvdDesc: '完整离线镜像 · 无需联网即可安装大量软件包',
  live: 'Live 体验版',
  liveDesc: '无需安装即可体验 · 也支持从 Live 环境安装',
  note: '镜像来自 Debian 官方 cdimage（current = 当前稳定版 Debian 13）。下载后请校验 SHA256。更多镜像与架构见',
  link: 'Debian 官方下载页',
};

export function DownloadPage() {
  const { locale } = useI18n();
  const t = locale === 'zh' ? zh : en;
  const types = [
    { title: t.netinst, desc: t.netinstDesc, links: [
      { a: 'amd64', href: `${CD}/amd64/iso-cd/` },
      { a: 'arm64', href: `${CD}/arm64/iso-cd/` },
    ] },
    { title: t.dvd, desc: t.dvdDesc, links: [
      { a: 'amd64', href: `${CD}/amd64/iso-dvd/` },
      { a: 'arm64', href: `${CD}/arm64/iso-dvd/` },
    ] },
    { title: t.live, desc: t.liveDesc, links: [
      { a: 'amd64', href: `${LIVE}/amd64/iso-hybrid/` },
    ] },
  ];
  return (
    <div className="not-prose">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {types.map((ty) => (
          <div key={ty.title} className="flex flex-col rounded-xl border border-fd-border bg-fd-card/40 p-5">
            <h3 className="font-semibold text-fd-foreground">{ty.title}</h3>
            <p className="mt-1.5 flex-1 text-sm text-fd-muted-foreground">{ty.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ty.links.map((l) => (
                <a
                  key={l.a}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="rounded-lg bg-fd-primary px-3 py-1.5 text-sm font-medium text-fd-primary-foreground no-underline"
                >
                  {l.a} ↓
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-fd-muted-foreground">
        {t.note}{' '}
        <a href="https://www.debian.org/distrib/" target="_blank" rel="noopener" className="text-fd-primary hover:underline">
          {t.link}
        </a>
        .
      </p>
    </div>
  );
}
