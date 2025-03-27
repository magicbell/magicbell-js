import { clientSettings, MagicBellProvider as Provider } from '@magicbell/react-headless';
import React, { useEffect, useState } from 'react';

import CurrentProviderContext from '../../context/CurrentProviderContext.js';
import MagicBellContext from '../../context/MagicBellContext.js';
import { MagicBellThemeProvider } from '../../context/MagicBellThemeContext.js';
import { IMagicBellTheme } from '../../context/Theme.js';
import { TranslationsProvider } from '../../context/TranslationsContext.js';
import { CustomLocale, useLocale } from '../../lib/i18n.js';
import { pkg } from '../../lib/pkg.js';
import { DeepPartial } from '../../lib/types.js';
import { Props as MagicBellProps } from '../MagicBell/MagicBell.js';

export type MagicBellProviderProps = {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  children: React.ReactElement | React.ReactElement[];
  theme?: DeepPartial<IMagicBellTheme>;
  stores?: MagicBellProps['stores'];
  locale?: string | CustomLocale;
  images?: Partial<{
    emptyInboxUrl: string;
  }>;
  serverURL?: string;
  disableRealtime?: boolean;
  apiClientCacheTTL?: number;
} & ({ userExternalId: string } | { userEmail: string });

const internals = {
  appInfo: {
    name: pkg.name,
    version: pkg.version,
  },
};

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
export default function MagicBellProvider({ children, theme, images, locale, ...settings }: MagicBellProviderProps) {
  return (
    // provide private props like this, so it's not part of the public api,
    // still can be overridden by the embeddable, and consumed by headless
    <Provider {...internals} {...settings}>
      <SettingsProviders {...settings} theme={theme} images={images} locale={locale}>
        {children}
      </SettingsProviders>
    </Provider>
  );
}

function SettingsProviders({ children, theme, locale, images, ...props }: MagicBellProviderProps) {
  const needsRemoteConfig = !theme || !locale || !images;

  const [config, setConfig] = useState<Pick<MagicBellProviderProps, 'theme' | 'images' | 'locale'>>({});
  const [isFetchingConfig, setIsFetchingConfig] = useState(needsRemoteConfig);

  useEffect(() => {
    // Don't fetch remote theme config if all overrides are provided via props
    if (!needsRemoteConfig) return;

    const client = clientSettings.getState().getClient();
    client
      .request({
        method: 'POST',
        path: '/integrations/inbox/installations/start',
      })
      .then((response) => {
        if (!('inbox' in response)) return;
        setConfig(response.inbox);
      })
      .catch(() => void 0)
      .finally(() => setIsFetchingConfig(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsRemoteConfig, props.apiKey, props.userExternalId, props.userExternalId]);

  const textTranslations = useLocale(locale || config.locale || 'en');

  return (
    <CurrentProviderContext.Provider value="DEFAULT_MAGICBELL">
      <TranslationsProvider value={textTranslations}>
        <MagicBellThemeProvider value={theme || config.theme}>
          <MagicBellContext.Provider value={{ images: images || config.images, isFetchingConfig }}>
            {children}
          </MagicBellContext.Provider>
        </MagicBellThemeProvider>
      </TranslationsProvider>
    </CurrentProviderContext.Provider>
  );
}
