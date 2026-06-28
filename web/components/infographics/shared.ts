// Map Fumadocs short locale codes -> infographics i18n data keys.
const KEY: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  ja: 'ja-JP',
  ko: 'ko-KR',
  pt: 'pt-BR',
};

export function localeKey(locale: string | undefined): string {
  return (locale && KEY[locale]) || 'en-US';
}
