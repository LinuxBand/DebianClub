'use client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { pickStrings } from '@/lib/infographics';
import { localeKey } from './shared';

const RWX = ['r', 'w', 'x'];
const WEIGHTS = [4, 2, 1];

function digit(bits: boolean[]) {
  return (bits[0] ? 4 : 0) + (bits[1] ? 2 : 0) + (bits[2] ? 1 : 0);
}

export function Permissions() {
  const { locale } = useI18n();
  const t = pickStrings(localeKey(locale)).perms;
  const groups = [
    { key: 'owner', label: t.owner, bits: [true, true, true], color: '#D70A53', soft: 'rgba(215,10,83,.12)' },
    { key: 'group', label: t.group, bits: [true, false, true], color: '#16a34a', soft: 'rgba(22,163,74,.12)' },
    { key: 'other', label: t.other, bits: [true, false, true], color: '#6366f1', soft: 'rgba(99,102,241,.12)' },
  ];
  return (
    <figure className="my-6 rounded-xl border bg-fd-card/40 p-5">
      <figcaption className="mb-4 flex items-center justify-between gap-3 text-sm font-semibold text-fd-foreground">
        <span>{t.title}</span>
        <img src="/images/info-lock.png" alt="" loading="lazy" className="h-12 w-12 shrink-0" />
      </figcaption>

      <div className="flex flex-wrap items-baseline gap-2 font-mono text-2xl font-bold tracking-widest">
        <span className="text-fd-muted-foreground">-</span>
        {groups.map((g) => (
          <span key={g.key} className="rounded-md px-2 py-0.5" style={{ background: g.soft, color: g.color }}>
            {g.bits.map((b, i) => (b ? RWX[i] : '-')).join('')}
          </span>
        ))}
        <span className="ml-1 text-xl text-fd-muted-foreground">= 755</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {groups.map((g) => (
          <div key={g.key} className="rounded-lg border bg-fd-background p-2.5 text-center">
            <div className="mb-1.5 text-[13px] font-semibold text-fd-foreground">{g.label}</div>
            <div className="flex justify-center gap-1.5">
              {g.bits.map((b, i) => (
                <div
                  key={i}
                  className="flex h-9 w-10 flex-col items-center justify-center rounded border text-[13px] font-bold"
                  style={
                    b
                      ? { background: g.soft, borderColor: g.color, color: 'var(--color-fd-foreground)' }
                      : { borderColor: 'var(--color-fd-border)', color: 'var(--color-fd-muted-foreground)' }
                  }
                >
                  <span className="font-mono">{b ? RWX[i] : '-'}</span>
                  <span className="text-[9px] text-fd-muted-foreground">{WEIGHTS[i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-1 font-mono text-xl font-bold" style={{ color: g.color }}>
              {digit(g.bits)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-fd-muted-foreground">
        <span>
          <b className="font-mono text-fd-foreground">r</b> {t.r} · 4
        </span>
        <span>
          <b className="font-mono text-fd-foreground">w</b> {t.w} · 2
        </span>
        <span>
          <b className="font-mono text-fd-foreground">x</b> {t.x} · 1
        </span>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-fd-muted-foreground">{t.note}</p>
    </figure>
  );
}
