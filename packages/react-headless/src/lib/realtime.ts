import * as Ably from 'ably';
import mitt from 'mitt';

import clientSettings from '../stores/clientSettings';
import NotificationRepository from '../stores/notifications/NotificationRepository';
import { WebSocketConfig } from '../types/IRemoteConfig';
import { buildAPIHeaders } from './ajax';

// Note that we have two event emitters. An internal emitter which is used to
// keep the store in sync with remote events. For example to mark a notification
// as read when the user reads it in a different tab. And a public emitter, which
// is not used by our code, but can be used by consumers such as the embeddable.
// Technically, a single emitter could serve both goals, but that would involve
// publishing a breaking change.

// The internal emitter that used to keep the store in sync with remote
/** @deprecated */
export const pushEventAggregator = mitt();

// A public emitter, that's not used by our internal code, but can be used by
// consumers, such as the embeddable.
export const eventAggregator = mitt();

export type EventSource = 'local' | 'remote';

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
 * Publish events to the internal and public event emitter, based on the event source.
 *
 * @param event The name of the event.
 * @param data The data object to pass along with the event.
 * @param source The origin of the event, local for an action that's triggered by the user in the current tab, remote if it's an event from another instance that should be mirrored.
 */
export function emitEvent(event: string, data: unknown, source: EventSource) {
  if (source === 'remote') {
    // Only to maintain backwards compatibility.
    pushEventAggregator.emit(event, data);
  }

  // wrap the argument in an object, as mitt is limited to a single argument,
  // and we don't want to change the interface of `data`.
  eventAggregator.emit(event, { data, source });
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
  const isLoopbackEvent = eventData.client_id && eventData.client_id === clientId;

  if (isLoopbackEvent) return Promise.resolve(false);

  if (typeof eventData.id === 'string') {
    if (eventName === 'notifications.delete') {
      emitEvent(eventName, eventData, 'remote');
      return Promise.resolve(true);
    } else {
      const repository = new NotificationRepository();
      return repository.get(eventData.id).then((data) => {
        emitEvent(eventName, data.notification, 'remote');
        return true;
      });
    }
  }

  emitEvent(eventName, eventData, 'remote');
  return Promise.resolve(true);
}
