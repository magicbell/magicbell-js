import { UserClient } from 'magicbell/user-client';
import { createStore } from 'zustand/vanilla';

import { pkg } from '../lib/pkg.js';

export type ClientSettings = {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  token?: string;
  clientId: string;
  serverURL: string;
  getClient(): InstanceType<typeof UserClient>;
  appInfo?: { name: string; version: string };
} & ({ userEmail: string } | { userExternalId: string });

/**
 * Store for the configuration of this MagicBell client. It contains all
 * settings required to make a request to the MagicBell server.
 *
 * @example
 * const { apiKey } = clientSettings.getState()
 */
const clientSettings = createStore<ClientSettings>((set, get) => {
  let _client: InstanceType<typeof UserClient> | null = null;
  let _key = '';

  return {
    apiKey: '',
    userEmail: undefined,
    userExternalId: undefined,
    userKey: undefined,
    token: undefined,
    clientId: Math.random().toString(36).substring(2) + Date.now(),
    serverURL: 'https://api.magicbell.com',
    appInfo: undefined,

    getClient() {
      const state = get();
      const key = JSON.stringify([state.apiKey, state.userEmail, state.userExternalId, state.userKey, state.token]);

      if (key !== _key) {
        _key = key;
        _client = new UserClient({
          userExternalId: state.userExternalId,
          userEmail: state.userEmail,
          userHmac: state.userKey,
          apiKey: state.apiKey,
          token: state.token,
          host: state.serverURL,
          appInfo: state.appInfo || {
            name: pkg.name,
            version: pkg.version,
          },
        });
      }

      return _client;
    },
  };
});

export default clientSettings;
