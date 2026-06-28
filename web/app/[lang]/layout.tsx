import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import { CustomFooter } from '@/components/CustomFooter';
import { Matomo } from '@/components/Matomo';
import { provider } from '@/lib/i18n';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default async function LangLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
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
