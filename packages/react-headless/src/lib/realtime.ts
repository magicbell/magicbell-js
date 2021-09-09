import * as Ably from 'ably';
import mitt from 'mitt';
import clientSettings from '../stores/clientSettings';
import NotificationRepository from '../stores/notifications/NotificationRepository';
import { WebSocketConfig } from '../types/IRemoteConfig';
import { buildAPIHeaders } from './ajax';

const pushEventAggregator = mitt();
export { pushEventAggregator };

/**
 * Open an authenticated connection to ably.
 *
 * @param config The configuration used to open the connection.
 */
export function connectToAbly(config: WebSocketConfig) {
  const { serverURL } = clientSettings.getState();
  const authUrl = `${serverURL}/${config.authUrl}`;
  const authHeaders = buildAPIHeaders();

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
 * @param event The realtime event
 */
export function handleAblyEvent(event: Ably.Types.Message) {
  const { clientId } = clientSettings.getState();
  const eventName = event.name.replace(/\//gi, '.');
  const eventData = event.data;

  if (eventData.client_id && eventData.client_id === clientId) return Promise.resolve();

  if (typeof eventData.id === 'string') {
    const repository = new NotificationRepository();
    return repository.get(eventData.id).then((data) => {
      pushEventAggregator.emit(eventName, data.notification);
    });
  }

  pushEventAggregator.emit(eventName, eventData);
  return Promise.resolve();
}
