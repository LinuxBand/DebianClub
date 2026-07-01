import { i18n } from './i18n';

export interface ResolvedRoute {
  lang: string;
  slug: string[];
}

const localeSet = new Set<string>(i18n.languages);

export function resolveRouteSegments(segments: string[] = []): ResolvedRoute {
  const [first, ...rest] = segments;

  if (first && localeSet.has(first)) {
    return { lang: first, slug: rest };
  }

  return { lang: i18n.defaultLanguage, slug: segments };
}

export function routeSegments(lang: string, slug: string[] = []): string[] {
  return lang === i18n.defaultLanguage ? slug : [lang, ...slug];
}
