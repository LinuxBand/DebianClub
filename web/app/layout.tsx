import './global.css';
import type { ReactNode } from 'react';

// Root layout is a passthrough; the per-locale <html>/<body> live in app/[lang]/layout.tsx
// so the `lang` attribute is correct for each language (i18n).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
