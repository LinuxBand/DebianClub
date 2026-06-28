import { i18n } from './i18n';
import { siteUrl } from './shared';

const HREFLANG: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  ja: 'ja-JP',
  ko: 'ko-KR',
  pt: 'pt-BR',
};

export function hreflang(l: string): string {
  return HREFLANG[l] ?? l;
}

// URL path for a page in a locale, matching the existing site (zh at root).
export function pageUrl(lang: string, slug: string[] = []): string {
  const prefix = lang === i18n.defaultLanguage ? '' : `/${lang}`;
  const path = slug.join('/');
  const url = `${prefix}/${path}`.replace(/\/+$/, '');
  return url === '' ? '/' : url;
}

export function abs(path: string): string {
  return path === '/' ? siteUrl : siteUrl + path;
}

export const ogDefault = `${siteUrl}/images/hero-home.png`;

// hreflang alternates map for the locales where a page exists (`has` decides).
export function languageAlternates(slug: string[], has: (lang: string) => boolean): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of i18n.languages) {
    if (has(l)) langs[hreflang(l)] = abs(pageUrl(l, slug));
  }
  if (has(i18n.defaultLanguage)) langs['x-default'] = abs(pageUrl(i18n.defaultLanguage, slug));
  return langs;
}
