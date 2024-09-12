import { Client } from './client/client.js';
import { assertHasRequiredOptions } from './client/options.js';
import { ClientOptions, WithRequired } from './client/types.js';
import { isString } from './lib/utils.js';
import { createListener } from './resources/listen.js';
import { NotificationPreferences } from './user-resources/notification-preferences.js';
import { Notifications } from './user-resources/notifications.js';
import { PushSubscriptions } from './user-resources/push-subscriptions.js';
import { Subscriptions } from './user-resources/subscriptions.js';

export type UserClientOptions =
  | WithRequired<Omit<ClientOptions, 'apiSecret' | 'token'>, 'apiKey' | 'userEmail'>
  | WithRequired<Omit<ClientOptions, 'apiSecret' | 'token'>, 'apiKey' | 'userExternalId'>
  | WithRequired<Omit<ClientOptions, 'apiSecret' | 'apikey' | 'userEmail' | 'userExternalId'>, 'token'>;

export class UserClient extends Client {
  listen = createListener(this);

  notificationPreferences = new NotificationPreferences(this);
  notifications = new Notifications(this);
  pushSubscriptions = new PushSubscriptions(this);
  subscriptions = new Subscriptions(this);

  constructor(options: UserClientOptions) {
    if (!('token' in options) || !isString(options.token)) {
      assertHasRequiredOptions(options, ['apiKey']);
    }

    if ('apiSecret' in options) {
      throw new Error('The API secret should NOT be used on the user client.');
    }

    super(options);
  }
}
