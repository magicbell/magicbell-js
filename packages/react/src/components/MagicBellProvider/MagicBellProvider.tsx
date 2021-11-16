import { MagicBellProvider as Provider } from '@magicbell/react-headless';
import mergeDeepRight from 'ramda/src/mergeDeepRight';
import React from 'react';
import CurrentProviderContext from '../../context/CurrentProviderContext';
import MagicBellContext from '../../context/MagicBellContext';
import { MagicBellThemeProvider } from '../../context/MagicBellThemeContext';
import { defaultTheme, IMagicBellTheme } from '../../context/Theme';
import { TranslationsProvider } from '../../context/TranslationsContext';
import { CustomLocale, useLocale } from '../../lib/i18n';
import { DeepPartial } from '../../lib/types';

export interface OptionalProps {
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
  disableRealtime?: boolean;
}

export interface Props extends OptionalProps {
  apiKey: string;
}

/**
 * Provider component for Magicbell.
 *
 * @param props.apiKey API key of the MagicBell project
 * @param props.userEmail Email of the user whose notifications will be displayed
 * @param props.userExternalId External ID of the user whose notifications will be displayed
 * @param props.userKey Computed HMAC of the user whose notifications will be displayed, compute this with the secret of the magicbell project
 * @param props.theme Object to customize the theme
 * @param props.stores List of stores to be created
 * @param props.locale Locale to use in the components
 * @param props.disableRealtime Disable realtime updates
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
    <CurrentProviderContext.Provider value="DEFAULT_MAGICBELL">
      <TranslationsProvider value={textTranslations}>
        <MagicBellThemeProvider value={mergeDeepRight(defaultTheme, theme)}>
          <MagicBellContext.Provider value={{ images }}>
            <Provider {...settings}>{children}</Provider>
          </MagicBellContext.Provider>
        </MagicBellThemeProvider>
      </TranslationsProvider>
    </CurrentProviderContext.Provider>
  );
}
