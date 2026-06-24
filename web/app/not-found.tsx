'use client';
import { useEffect } from 'react';

const LOCALES = ['en', 'de', 'es', 'fr', 'ja', 'ko', 'pt'];

// Graceful 404 for static export: if a localized URL has no translation
// (fallback is disabled for SEO), drop the locale prefix and go to the
// default-language version, which exists. Covers the header language switcher
// landing on an untranslated page.
export default function NotFound() {
  useEffect(() => {
    const p = window.location.pathname;
    const seg = p.split('/').filter(Boolean);
    if (seg.length >= 2 && LOCALES.includes(seg[0])) {
      window.location.replace('/' + seg.slice(1).join('/'));
    }
  }, []);
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-fd-muted-foreground">Page not found · 页面不存在</p>
      <a href="/" className="text-fd-primary hover:underline">
        ← Home
      </a>
    </main>
  );
}
