import pkg from '../../package.json';
import { mitt } from '../polyfills/mitt-module.js';
import clientSettings from '../stores/clientSettings.js';
import NotificationRepository from '../stores/notifications/NotificationRepository.js';

export function getAuthHeaders() {
  const { apiKey, userEmail, userExternalId, userKey } = clientSettings.getState();

  const headers = {
    'x-magicbell-api-key': apiKey,
    'x-magicbell-client-user-agent': `${pkg.name}/${pkg.version}`,
  };

  if (userEmail) headers['x-magicbell-user-email'] = userEmail;
  if (userKey) headers['x-magicbell-user-hmac'] = userKey;
  if (userExternalId) headers['x-magicbell-user-external-id'] = userExternalId;

  return headers;
}

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
export function handleAblyEvent(event: { name: string; data: Record<string, unknown> }) {
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
