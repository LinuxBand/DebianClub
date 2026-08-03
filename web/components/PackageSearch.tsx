'use client';

import { ExternalLink, Loader2, PackageOpen, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type Lang = 'zh' | 'en';

interface DistroEntry {
  id: string;
  version: string;
  release: string;
  source: string;
  repo: string;
}

interface SearchHit {
  name: string;
  summary: string | null;
  distros: DistroEntry[];
}

interface SearchResponse {
  hits: SearchHit[];
}

const API = 'https://pkgseek.com/v1/search';
const PACKAGE_PAGE = 'https://pkgseek.com/packages';

const STRINGS: Record<
  Lang,
  {
    placeholder: string;
    search: string;
    searching: string;
    debianVersion: string;
    moreDistros: (n: number) => string;
    empty: string;
    error: string;
    hint: string;
    poweredBy: string;
  }
> = {
  zh: {
    placeholder: '输入包名或关键词，如 nginx、ffmpeg、python3…',
    search: '查询',
    searching: '查询中…',
    debianVersion: 'Debian 13 (trixie)',
    moreDistros: (n) => `另有 ${n} 个发行版收录 →`,
    empty: '没有找到匹配的软件包，换个关键词试试。',
    error: '查询失败，请稍后重试，或直接访问 pkgseek.com。',
    hint: '数据来自 pkgseek.com，实时查询 Debian、Ubuntu、Fedora、Arch 等 25+ 发行版的官方仓库。',
    poweredBy: '由 pkgseek 提供数据',
  },
  en: {
    placeholder: 'Type a package name or keyword, e.g. nginx, ffmpeg, python3…',
    search: 'Search',
    searching: 'Searching…',
    debianVersion: 'Debian 13 (trixie)',
    moreDistros: (n) => `${n} more distributions →`,
    empty: 'No matching packages. Try another keyword.',
    error: 'Search failed. Please retry later, or visit pkgseek.com directly.',
    hint: 'Live data from pkgseek.com, covering the official repositories of 25+ distributions including Debian, Ubuntu, Fedora and Arch.',
    poweredBy: 'Data by pkgseek',
  },
};

export function PackageSearch({ lang = 'zh' }: { lang?: Lang }) {
  const t = STRINGS[lang];
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<SearchHit[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  // Monotonic request id so a slow earlier response can never overwrite a
  // newer query's results.
  const requestId = useRef(0);

  const runSearch = useCallback(async (q: string, syncUrl: boolean) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    const id = ++requestId.current;
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch(`${API}?q=${encodeURIComponent(trimmed)}&limit=8`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as SearchResponse;
      if (id !== requestId.current) return;
      setHits(data.hits ?? []);
      if (syncUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set('q', trimmed);
        window.history.replaceState(null, '', url);
      }
    } catch {
      if (id !== requestId.current) return;
      setHits(null);
      setFailed(true);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  // Deep-link: prefill and run ?q= on mount (window only exists client-side).
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('q');
    if (initial) {
      setQuery(initial);
      void runSearch(initial, false);
    }
  }, [runSearch]);

  return (
    <section className="rounded-md border border-fd-border bg-fd-card p-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void runSearch(query, true);
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          className="min-w-0 flex-1 rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm outline-none placeholder:text-fd-muted-foreground focus:border-fd-primary"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm font-medium transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground disabled:opacity-50"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          {loading ? t.searching : t.search}
        </button>
      </form>

      <p className="mt-3 text-xs leading-5 text-fd-muted-foreground">{t.hint}</p>

      {failed && (
        <p className="mt-4 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-5 text-amber-700 dark:text-amber-300">
          {t.error}
        </p>
      )}

      <div role="status" aria-live="polite">
        {hits && hits.length === 0 && !loading && (
          <p className="mt-4 text-sm text-fd-muted-foreground">{t.empty}</p>
        )}
      </div>

      {hits && hits.length > 0 && (
        <ul className="mt-4 space-y-3" aria-live="polite">
          {hits.map((hit) => {
            const debian = hit.distros.find((d) => d.id === 'debian');
            const others = hit.distros.length - (debian ? 1 : 0);
            return (
              <li
                key={hit.name}
                className="rounded-md border border-fd-border bg-fd-background p-3"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <a
                    href={`${PACKAGE_PAGE}/${encodeURIComponent(hit.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-fd-primary"
                  >
                    <PackageOpen className="size-4" />
                    {hit.name}
                  </a>
                  {debian && (
                    <span className="rounded border border-fd-primary/40 bg-fd-primary/10 px-1.5 py-0.5 text-xs text-fd-primary">
                      {t.debianVersion}: {debian.version}
                    </span>
                  )}
                </div>
                {hit.summary && (
                  <p className="mt-1 text-sm text-fd-muted-foreground">{hit.summary}</p>
                )}
                {others > 0 && (
                  <a
                    href={`${PACKAGE_PAGE}/${encodeURIComponent(hit.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-fd-muted-foreground underline-offset-2 hover:text-fd-primary hover:underline"
                  >
                    {t.moreDistros(others)}
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-4 text-right text-xs text-fd-muted-foreground">
        <a href="https://pkgseek.com" target="_blank" rel="noreferrer" className="hover:underline">
          {t.poweredBy}
        </a>
      </p>
    </section>
  );
}
