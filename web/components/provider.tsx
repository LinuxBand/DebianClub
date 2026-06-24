'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';
import type { I18nProviderProps } from 'fumadocs-ui/contexts/i18n';

export function Provider({
  i18n,
  children,
}: {
  i18n?: I18nProviderProps;
  children: ReactNode;
}) {
  return (
    <RootProvider i18n={i18n} search={{ SearchDialog }}>
      {children}
    </RootProvider>
  );
}
