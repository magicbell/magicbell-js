import { render as TLRender } from '@testing-library/react';
import React, { ReactElement } from 'react';

import MagicBellProvider from '../../src/components/MagicBellProvider';
import { defaultTheme, IMagicBellTheme } from '../../src/context/Theme';

type RenderWithProvidersOptions = {
  locale: 'en' | 'es' | 'pt_br' | 'de';
  apiKey: string;
  theme: IMagicBellTheme;
  stores?: any;
  images?: { emptyInboxUrl?: string };
};

const defaultOptions: RenderWithProvidersOptions = {
  locale: 'en',
  apiKey: 'fake-api-key',
  theme: defaultTheme,
  images: {},
};

export function renderWithProviders(node: ReactElement, options?: Partial<RenderWithProvidersOptions>) {
  const { apiKey, locale, theme, images, stores } = Object.assign(defaultOptions, options);

  return TLRender(
    <MagicBellProvider
      disableRealtime
      apiKey={apiKey}
      userEmail="-"
      stores={stores}
      images={images}
      locale={locale}
      theme={theme}
    >
      {node}
    </MagicBellProvider>,
  );
}
