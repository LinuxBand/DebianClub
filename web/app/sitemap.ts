import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { abs, hreflang, pageUrl } from '@/lib/seo';

export const dynamic = 'force-static';

function altMap(slug: string[], langs: Iterable<string>): Record<string, string> {
  const m: Record<string, string> = {};
  let hasDefault = false;
  for (const l of langs) {
    m[hreflang(l)] = abs(pageUrl(l, slug));
    if (l === i18n.defaultLanguage) hasDefault = true;
  }
  if (hasDefault) m['x-default'] = abs(pageUrl(i18n.defaultLanguage, slug));
  return m;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // landing (no content page) — exists for every locale
  const homeAlts = altMap([], i18n.languages);
  for (const l of i18n.languages) {
    entries.push({ url: abs(pageUrl(l, [])), changeFrequency: 'weekly', priority: 1, alternates: { languages: homeAlts } });
  }

  // docs pages, grouped by slug to compute per-URL hreflang alternates
  const bySlug = new Map<string, Set<string>>();
  for (const lang of i18n.languages) {
    for (const page of source.getPages(lang)) {
      const key = page.slugs.join('/');
      let set = bySlug.get(key);
      if (!set) {
        set = new Set();
        bySlug.set(key, set);
      }
      set.add(lang);
    }
  }
  for (const [key, langs] of bySlug) {
    const slug = key ? key.split('/') : [];
    const alts = altMap(slug, langs);
    for (const l of langs) {
      entries.push({ url: abs(pageUrl(l, slug)), changeFrequency: 'weekly', priority: 0.7, alternates: { languages: alts } });
    }
  }
  return entries;
}
