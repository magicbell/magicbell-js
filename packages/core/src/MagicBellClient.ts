import isNil from 'lodash/isNil.js';

import { setupAjax } from './lib/ajax.js';
import { connectToAbly, handleAblyEvent, pushEventAggregator } from './lib/realtime.js';
import Config from './models/Config/index.js';
import NotificationStoreWithContext from './stores/NotificationStoreWithContext.js';

export type MagicBellConfigOptions = {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  apiSecret?: string;
  _baseURL?: string;
};

export default class MagicBellClient {
  config?: Config;
  _store: NotificationStoreWithContext;

  static async createInstance(options: MagicBellConfigOptions) {
    const client = new MagicBellClient(options);
    await client.config?.fetch();

    return client;
  }

  static configure(options: MagicBellConfigOptions) {
    const { _baseURL: baseURL, ...otherOptions } = options;
    setupAjax({ ...otherOptions, baseURL });
  }

  /**
   * Create a MagicBell instance.
   *
   * @param apiKey API key of your MagicBell project
   * @param userEmail Email of the user whose notifications will be displayed
   * @param userExternalId External ID of the user whose notifications will be displayed
   * @param userKey Computed HMAC of the user whose notifications will be displayed, compute this with the secret of the magicbell project
   * @param apiSecret API secret of your MagicBell project (required to create notifications)
   */
  constructor(options: MagicBellConfigOptions) {
    // Setup the axios instance
    MagicBellClient.configure(options);

    const isFrontendClient = !isNil(options.userEmail) || !isNil(options.userExternalId);
    if (isFrontendClient) {
      const { apiKey, userEmail, userExternalId, userKey, apiSecret } = options;
      this.config = new Config({ apiKey, userEmail, userExternalId, userKey, apiSecret });
    }
  }

  /**
   * @deprecated To create notifications pUse Notification.create() instead
   */
  get store() {
    if (!this._store) this._store = new NotificationStoreWithContext({});
    return this._store;
  }

  /**
   * @deprecated To create notifications pUse Notification.create() instead
   */
  getStore() {
    return this.store;
  }

  /**
   * Connect to a magicbell websocket to get real-time events.
   *
   * @return {Function} Function to close the connection and stop the listeners. YOU MUST CALL THIS FUNCTION in order to prevent memory leaks.
   */
  startRealTimeListener() {
    if (!this.config) throw Error('Set a user email or id for this client');

    const ablyClient = connectToAbly(this.config);

    const emitWakeup = () => pushEventAggregator.emit('wakeup');
    ablyClient.connection.on('disconnected', emitWakeup);
    ablyClient.connection.on('suspended', emitWakeup);

    const ablyChannel = ablyClient.channels.get(this.config.ws.channel);
    ablyChannel.subscribe(handleAblyEvent);

    return () => {
      ablyClient.connection.off('disconnected', emitWakeup);
      ablyClient.connection.off('suspended', emitWakeup);
      ablyChannel.unsubscribe(handleAblyEvent);
      ablyChannel.detach();
      ablyClient.close();
    };
  }
}
