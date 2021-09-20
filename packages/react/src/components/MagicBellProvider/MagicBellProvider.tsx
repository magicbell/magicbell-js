import { MagicBellProvider as Provider } from '@magicbell/react-headless';
import mergeDeepRight from 'ramda/src/mergeDeepRight';
import React from 'react';
import MagicBellContext from '../../context/MagicBellContext';
import { MagicBellThemeProvider } from '../../context/MagicBellThemeContext';
import { defaultTheme, IMagicBellTheme } from '../../context/Theme';
import { TranslationsProvider } from '../../context/TranslationsContext';
import { CustomLocale, useLocale } from '../../lib/i18n';
import { DeepPartial } from '../../lib/types';

export interface Props {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  children: React.ReactElement | React.ReactElement[];
  theme?: DeepPartial<IMagicBellTheme>;
  stores?;
  locale?: string | CustomLocale;
  images?: Partial<{
    emptyInboxUrl: string;
  }>;
  serverURL?: string;
}

/**
 * Provider component for Magicbell.
 *
 * @param apiKey API key of the MagicBell project
 * @param userEmail Email of the user whose notifications will be displayed
 * @param userExternalId External ID of the user whose notifications will be displayed
 * @param userKey Computed HMAC of the user whose notifications will be displayed, compute this with the secret of the magicbell project
 * @param theme Object to customize the theme
 * @param stores List of stores to be created
 * @param locale Locale to use in the components
 *
 * @example
 * ```javascript
 * <MagicBellProvider apiKey={MAGICBELL_API_KEY} userEmail={email}>
 *   <App />
 * </MagicBellProvider>
 * ```
 */
export default function MagicBellProvider({
  children,
  theme = {},
  images,
  locale = 'en',
  ...settings
}: Props) {
  const textTranslations = useLocale(locale);

  return (
    <TranslationsProvider value={textTranslations}>
      <MagicBellThemeProvider value={mergeDeepRight(defaultTheme, theme)}>
        <MagicBellContext.Provider value={{ images }}>
          <Provider {...settings}>{children}</Provider>
        </MagicBellContext.Provider>
      </MagicBellThemeProvider>
    </TranslationsProvider>
  );
}
