import { UserClient } from 'magicbell/user-client';
import create from 'zustand/vanilla';

export type ClientSettings = {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
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
const clientSettings = create<ClientSettings>((set, get) => ({
  apiKey: '',
  userEmail: undefined,
  userExternalId: undefined,
  userKey: undefined,
  clientId: Math.random().toString(36).substring(2) + Date.now(),
  serverURL: 'https://api.magicbell.com',
  appInfo: undefined,

  getClient() {
    const state = get();

    return new UserClient({
      userExternalId: state.userExternalId,
      userEmail: state.userEmail,
      userHmac: state.userKey,
      apiKey: state.apiKey,
      host: state.serverURL,
      appInfo: state.appInfo || {
        name: __PACKAGE_NAME__,
        version: __PACKAGE_VERSION__,
      },
    });
  },
}));

export default clientSettings;
