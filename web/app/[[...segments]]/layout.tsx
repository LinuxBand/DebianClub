import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google';
import { Provider } from '@/components/provider';
import { CustomFooter } from '@/components/CustomFooter';
import { Matomo } from '@/components/Matomo';
import { provider } from '@/lib/i18n';
import { resolveRouteSegments } from '@/lib/route';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// Landing-page faces, exposed as CSS variables (see app/global.css).
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export default async function LocaleLayout({
  params,
  children,
}: {
  params: Promise<{ segments?: string[] }>;
  children: ReactNode;
}) {
  const { segments = [] } = await params;
  const { lang } = resolveRouteSegments(segments);

  return (
    <html lang={lang} className={`${inter.className} ${inter.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider i18n={provider(lang)}>
          {children}
          <CustomFooter />
        </Provider>
        {process.env.NODE_ENV === 'production' && <Matomo />}
      </body>
    </html>
  );
}
