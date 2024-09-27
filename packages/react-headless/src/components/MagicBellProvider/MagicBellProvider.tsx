import React, { useEffect, useState } from 'react';

import clientSettings, { ClientSettings } from '../../stores/clientSettings.js';
import useConfig from '../../stores/config/useConfig.js';
import buildStore from '../../stores/notifications/helpers/buildStore.js';
import useNotificationStoresCollection from '../../stores/notifications/useNotificationStoresCollection.js';
import { QueryParams } from '../../types/INotificationsStoresCollection.js';
import INotificationStore from '../../types/INotificationStore.js';
import RealtimeListener from '../RealtimeListener.js';

type StoreConfig = {
  id: string;
  defaultQueryParams: QueryParams;
  defaults?: Partial<Omit<INotificationStore, 'context'>>;
};

export interface MagicBellProviderProps {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  children: React.ReactElement | React.ReactElement[];
  stores?: StoreConfig[];
  serverURL?: string;
  disableRealtime?: boolean;
}

function setupXHR({ serverURL, ...userSettings }: Omit<MagicBellProviderProps, 'children' | 'stores'>) {
  const settings = userSettings as ClientSettings;
  if (serverURL) settings.serverURL = serverURL;
  clientSettings.setState(settings);

  return settings;
}

function setupStores(storesConfig: StoreConfig[]) {
  const stores = {};

  storesConfig.forEach((store) => {
    const { defaultQueryParams: context, defaults = {} } = store;
    stores[store.id] = buildStore({ context, ...defaults });
  });

  useNotificationStoresCollection.setState({ stores });

  return stores;
}

/**
 * Provider component for Magicbell.
 *
 * @param props
 * @param props.apiKey API key of the MagicBell project
 * @param props.userEmail Email of the user whose notifications will be displayed
 * @param props.userExternalId External ID of the user whose notifications will be displayed
 * @param props.userKey Computed HMAC of the user whose notifications will be displayed, compute this with the secret of the magicbell project
 * @param props.stores List of stores to be created
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
  stores = [{ id: 'default', defaultQueryParams: {} }],
  disableRealtime,
  ...clientSettings
}: MagicBellProviderProps) {
  useState(() => setupXHR(clientSettings));
  useEffect(() => {
    setupStores(stores);
  }, []);

  const config = useConfig();

  useEffect(() => {
    if (!config.lastFetchedAt) config.fetch();
  }, [config]);

  return (
    <>
      {disableRealtime ? null : <RealtimeListener />}
      {children}
    </>
  );
}
