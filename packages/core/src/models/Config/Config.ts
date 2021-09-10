import camelize from '../../lib/decorators/camelize';
import ConfigRepository from './ConfigRepository';
import { Channels, Inbox, WebSocket } from './IRemoteConfig';

/**
 * A configuration object.
 *
 * @example
 * const config = new Config({ apiKey, userEmail, userKey });
 * config.fetch();
 */
export default class Config {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  apiSecret?: string;

  ws: WebSocket;
  inbox: Inbox;
  channels: Channels;
  webPushNotifications;

  repo: ConfigRepository;
  xhrFetchState: 'idle' | 'pending' | 'success' | 'failure' = 'idle';

  constructor(
    args: Partial<{
      apiKey: string;
      userEmail: string;
      userExternalId: string;
      userKey: string;
      apiSecret: string;
      ws: WebSocket;
    }>,
  ) {
    this.set(args);
    this.repo = new ConfigRepository();
  }

  /**
   * Fetch the configuration for the current user from the MagicBell server.
   */
  async fetch() {
    this.xhrFetchState = 'pending';

    try {
      const data = await this.repo.get();
      this.set(data);
      this.xhrFetchState = 'success';
    } catch (error) {
      this.xhrFetchState = 'failure';
    }
  }

  @camelize()
  set(json = {}) {
    Object.assign(this, json);
  }
}
