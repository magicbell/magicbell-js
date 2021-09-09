import create from 'zustand/vanilla';

export interface ClientSettings {
  apiKey: string;
  apiSecret?: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  clientId: string;
  serverURL: string;
}

/**
 * Store for the configuration of this MagicBell client. It contains all
 * settings required to make a request to the MagicBell server.
 *
 * @example
 * const { apiKey } = clientSettings.getState()
 */
const clientSettings = create<ClientSettings>(() => ({
  apiKey: '',
  apiSecret: undefined,
  userEmail: undefined,
  userExternalId: undefined,
  userKey: undefined,
  clientId: Math.random().toString(36).substring(2) + Date.now(),
  serverURL: 'https://api.magicbell.com',
}));

export default clientSettings;
