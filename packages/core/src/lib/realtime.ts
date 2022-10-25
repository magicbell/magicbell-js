import * as Ably from 'ably';
import get from 'lodash/get';
import mitt from 'mitt';

import Config from '../models/Config';
import Notification from '../models/Notification';
import { api } from './ajax';

const pushEventAggregator = mitt();
export { pushEventAggregator };

/**
 * Open an authenticated connection to ably.
 *
 * @param config The configuration used to open the connection.
 */
export function connectToAbly(config: Config, authServerUrl = 'https://api.magicbell.com') {
  const authUrl = `${authServerUrl}${config.ws.authUrl}`;

  const authHeaders = { 'X-MAGICBELL-API-KEY': config.apiKey };
  if (config.userEmail) authHeaders['X-MAGICBELL-USER-EMAIL'] = config.userEmail;
  if (config.userExternalId) authHeaders['X-MAGICBELL-USER-EXTERNAL-ID'] = config.userExternalId;
  if (config.userKey) authHeaders['X-MAGICBELL-USER-HMAC'] = config.userKey;

  const client = new Ably.Realtime({
    authUrl,
    authHeaders,
    authMethod: 'POST',
    log: { level: 0 },
    transports: ['web_socket'],
  });

  return client;
}

/**
 * Publish an ably event to the push event emitter. If the push event contains
 * the ID of a notification, this is fetched before emitting the event.
 *
 * @param event Ably event
 */
export function handleAblyEvent(event: Ably.Types.Message) {
  const name = event.name.replace(/\//gi, '.');
  const eventData = event.data;

  if (eventData.client_id && eventData.client_id === get(api, 'defaults.headers.X-MAGICBELL-CLIENT-ID')) {
    return Promise.resolve();
  }

  if (typeof eventData.id === 'string') {
    const notification = new Notification({ id: eventData.id });
    return notification.fetch().then(() => {
      pushEventAggregator.emit(name, notification);
    });
  }

  pushEventAggregator.emit(name, eventData);
  return Promise.resolve();
}
