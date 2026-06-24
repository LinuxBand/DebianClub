'use client';
import { useEffect, useState } from 'react';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { pickStrings } from '@/lib/infographics';
import { localeKey } from './shared';

// language-neutral data (decimal years). End dates for 13/14 are estimates.
const A0 = 2021,
  A1 = 2031,
  PX0 = 168,
  PX1 = 975,
  TOP = 26,
  ROWH = 40;
const x = (y: number) => PX0 + ((y - A0) / (A1 - A0)) * (PX1 - PX0);

type Row = { v: string; code: string; rel: number; reg?: number; lts?: number; planned?: boolean };
const DATA: Row[] = [
  { v: 'Debian 14', code: 'Forky', rel: 2027.4, planned: true },
  { v: 'Debian 13', code: 'Trixie', rel: 2025.6, reg: 2028.6, lts: 2030.6 },
  { v: 'Debian 12', code: 'Bookworm', rel: 2023.45, reg: 2026.45, lts: 2028.45 },
  { v: 'Debian 11', code: 'Bullseye', rel: 2021.6, reg: 2024.55, lts: 2026.6 },
];

const TICKS = [2021, 2023, 2025, 2027, 2029, 2031];
const axisY = TOP + 4 * ROWH + 4;
const H = axisY + 26;

const FULL = '#16a34a'; // green-600
const LTS = '#d97706'; // amber-600
const PLANNED = '#6366f1'; // indigo-500
const TODAY = '#D70A53'; // Debian red
const fg = 'var(--color-fd-foreground)';
const muted = 'var(--color-fd-muted-foreground)';
const border = 'var(--color-fd-border)';

export function ReleaseTimeline() {
  const { locale } = useI18n();
  const t = pickStrings(localeKey(locale)).timeline;
  const [today, setToday] = useState(2026.45);
  useEffect(() => {
    const d = new Date();
    setToday(d.getFullYear() + d.getMonth() / 12 + d.getDate() / 365);
  }, []);
  const todayX = x(Math.min(A1, Math.max(A0, today)));

  return (
    <figure className="my-6 rounded-xl border bg-fd-card/40 p-5" style={{ borderColor: border }}>
      <figcaption className="mb-3 text-sm font-semibold text-fd-foreground">{t.title}</figcaption>
      <div className="flex flex-wrap items-center gap-4">
        <div className="min-w-0 flex-1 basis-[380px]">
          <svg viewBox={`0 0 1000 ${H}`} className="block h-auto w-full" role="img" aria-label={t.title}>
            <line x1={todayX} y1={14} x2={todayX} y2={axisY} stroke={TODAY} strokeWidth={2} strokeDasharray="4 3" />
            <text x={todayX} y={10} textAnchor="middle" fontSize={11} fontWeight={700} fill={TODAY}>
              {t.today}
            </text>
            {DATA.map((d, i) => {
              const y = TOP + i * ROWH;
              return (
                <g key={d.v}>
                  <text x={6} y={y + 9} fontSize={13} fontWeight={600} fill={fg}>
                    {d.v}
                  </text>
                  <text x={6} y={y + 22} fontSize={11} fill={muted}>
                    {d.code}
                  </text>
                  {d.planned ? (
                    <rect
                      x={x(d.rel)}
                      y={y}
                      width={Math.max(8, x(2029.4) - x(d.rel))}
                      height={22}
                      rx={5}
                      fill={PLANNED}
                      fillOpacity={0.18}
                      stroke={PLANNED}
                      strokeWidth={1.5}
                      strokeDasharray="5 4"
                    />
                  ) : (
                    <>
                      <rect x={x(d.rel)} y={y} width={x(d.reg!) - x(d.rel)} height={22} rx={5} fill={FULL} />
                      <rect x={x(d.reg!)} y={y} width={x(d.lts!) - x(d.reg!)} height={22} rx={5} fill={LTS} />
                    </>
                  )}
                </g>
              );
            })}
            <line x1={PX0} y1={axisY} x2={PX1} y2={axisY} stroke={border} />
            {TICKS.map((yr) => (
              <g key={yr}>
                <line x1={x(yr)} y1={axisY} x2={x(yr)} y2={axisY + 5} stroke={border} />
                <text x={x(yr)} y={axisY + 18} textAnchor="middle" fontSize={11} fill={muted}>
                  {yr}
                </text>
              </g>
            ))}
          </svg>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-fd-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block h-2.5 w-3.5 rounded-sm" style={{ background: FULL }} />
              {t.full}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block h-2.5 w-3.5 rounded-sm" style={{ background: LTS }} />
              {t.lts}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i
                className="inline-block h-2.5 w-3.5 rounded-sm border border-dashed"
                style={{ background: `${PLANNED}2e`, borderColor: PLANNED }}
              />
              {t.planned}
            </span>
          </div>
        </div>
        <img src="/images/info-calendar.png" alt="" loading="lazy" className="h-auto w-[120px] shrink-0" />
      </div>
      <p className="mt-3 text-sm text-fd-muted-foreground">{t.note}</p>
    </figure>
  );
}
