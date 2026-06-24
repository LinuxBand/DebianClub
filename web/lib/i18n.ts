import { defineI18n } from 'fumadocs-core/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

// URL scheme matches the existing VitePress site exactly (SEO-preserving):
//   zh = default, served at root with NO prefix  (hideLocale: 'default-locale')
//   others = /en, /de, /es, /fr, /ja, /ko, /pt
export const i18n = defineI18n({
  defaultLanguage: 'zh',
  languages: ['zh', 'en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'],
  hideLocale: 'default-locale',
});

export const languageNames: Record<string, string> = {
  zh: '简体中文',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
  pt: 'Português',
};

// UI provider for RootProvider (language switcher + UI string translations)
export const { provider } = defineI18nUI(i18n, {
  zh: { displayName: '简体中文' },
  en: { displayName: 'English' },
  de: { displayName: 'Deutsch' },
  es: { displayName: 'Español' },
  fr: { displayName: 'Français' },
  ja: { displayName: '日本語' },
  ko: { displayName: '한국어' },
  pt: { displayName: 'Português' },
});
