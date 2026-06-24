'use client';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { Cpu, ListBullets, Circuitry, Gear, DesktopTower } from '@phosphor-icons/react';
import { pickStrings } from '@/lib/infographics';
import { localeKey } from './shared';

const ICONS = [Cpu, ListBullets, Circuitry, Gear, DesktopTower];
const RED = '#D70A53';

export function BootChain() {
  const { locale } = useI18n();
  const t = pickStrings(localeKey(locale)).boot;
  return (
    <figure className="my-6 rounded-xl border bg-fd-card/40 p-5">
      <figcaption className="mb-4 flex items-center justify-between gap-3 text-sm font-semibold text-fd-foreground">
        <span>{t.title}</span>
        <img src="/images/info-chip.png" alt="" loading="lazy" className="h-12 w-12 shrink-0" />
      </figcaption>
      <ol className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-0">
        {t.nodes.map((n, i) => {
          const Icon = ICONS[i] ?? Cpu;
          return (
            <li
              key={i}
              className="relative flex flex-1 items-center gap-3 sm:flex-col sm:items-center sm:px-3 sm:text-center"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white sm:mb-2"
                style={{ background: RED }}
              >
                <Icon size={22} weight="duotone" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-fd-foreground">{n.name}</div>
                <div className="mt-1 text-xs text-fd-muted-foreground">{n.desc}</div>
              </div>
              {i < t.nodes.length - 1 && (
                <svg
                  className="absolute left-[18px] bottom-[-18px] h-5 w-5 rotate-90 sm:left-auto sm:bottom-auto sm:right-[-10px] sm:top-2 sm:rotate-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={RED}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12h15M13 6l6 6-6 6" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
