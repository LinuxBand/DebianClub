import './global.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { appName, siteUrl } from '@/lib/shared';

// Resolves relative metadata URLs + brands page titles in SERPs.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { template: `%s | ${appName}`, default: appName },
};

// Root layout is a passthrough; the per-locale <html>/<body> live in app/[lang]/layout.tsx
// so the `lang` attribute is correct for each language (i18n).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
