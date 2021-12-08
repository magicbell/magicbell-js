import { render as TLRender } from '@testing-library/react';
import { ReactNode } from 'react';

import React from 'react';
import { MagicBellThemeProvider } from '../../src/context/MagicBellThemeContext';
import { defaultTheme, IMagicBellTheme } from '../../src/context/Theme';
import { TranslationsProvider } from '../../src/context/TranslationsContext';
import MagicBellProvider from '../../src/components/MagicBellProvider';
import es from '../../src/lib/translations/es';
import pt_br from '../../src/lib/translations/pt-br';
import de from '../../src/lib/translations/de';

const locales = { es, pt_br, de } as const;

type RenderWithProvidersOptions = {
  locale: keyof typeof locales | 'en';
  apiKey: string;
  theme: IMagicBellTheme;
  stores?: any;
};

const defaultOptions: RenderWithProvidersOptions = {
  locale: 'en',
  apiKey: '',
  theme: defaultTheme,
};

export function renderWithProviders(
  node: ReactNode,
  options?: Partial<RenderWithProvidersOptions>,
) {
  const { apiKey, locale, theme, stores } = Object.assign(defaultOptions, options);

  return TLRender(
    <MagicBellProvider apiKey={apiKey} stores={stores}>
      <TranslationsProvider value={locales[locale]}>
        <MagicBellThemeProvider value={theme}>{node}</MagicBellThemeProvider>
      </TranslationsProvider>
    </MagicBellProvider>,
  );
}
