'use client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { pickStrings } from '@/lib/infographics';
import { localeKey } from './shared';

const SEGS = [
  { key: 'efi', mount: '/boot/efi', bar: 'EFI', fs: 'FAT32', color: '#6366f1', x: 0, w: 66 },
  { key: 'root', mount: '/', bar: '/', fs: 'ext4', color: '#D70A53', x: 70, w: 300 },
  { key: 'home', mount: '/home', bar: '/home', fs: 'ext4', color: '#16a34a', x: 374, w: 540 },
  { key: 'swap', mount: 'swap', bar: 'swap', fs: 'swap', color: '#71717a', x: 918, w: 82 },
] as const;

export function DiskPartition() {
  const { locale } = useI18n();
  const t = pickStrings(localeKey(locale)).disk as Record<string, any>;
  return (
    <figure className="my-6 rounded-xl border bg-fd-card/40 p-5">
      <figcaption className="mb-3 text-sm font-semibold text-fd-foreground">{t.title}</figcaption>
      <div className="flex flex-wrap items-center gap-5">
        <div className="min-w-0 flex-1 basis-[360px]">
          <svg viewBox="0 0 1000 56" className="block h-auto w-full" role="img" aria-label={t.title}>
            {SEGS.map((s) => (
              <rect
                key={s.key}
                x={s.x}
                y={6}
                width={s.w}
                height={44}
                rx={5}
                fill={s.color}
                stroke="var(--color-fd-card)"
                strokeWidth={3}
              />
            ))}
            {SEGS.map((s) => (
              <text
                key={s.key + 'l'}
                x={s.x + s.w / 2}
                y={34}
                textAnchor="middle"
                fontSize={15}
                fontWeight={600}
                fill="#fff"
                fontFamily="var(--font-mono, monospace)"
              >
                {s.bar}
              </text>
            ))}
          </svg>
          <ul className="mt-4 grid list-none grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-4 gap-y-2.5 p-0">
            {SEGS.map((s) => (
              <li key={s.key} className="flex gap-2">
                <span className="mt-1.5 h-3 w-3 shrink-0 rounded-sm" style={{ background: s.color }} />
                <div>
                  <div className="text-sm text-fd-foreground">
                    <code className="text-[13px]">{s.mount}</code>{' '}
                    <span className="text-xs text-fd-muted-foreground">
                      {s.fs} · {t[s.key].size}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-fd-muted-foreground">{t[s.key].desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <img src="/images/info-disk.png" alt="" loading="lazy" className="h-auto w-[130px] shrink-0" />
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-fd-muted-foreground">{t.note}</p>
    </figure>
  );
}
