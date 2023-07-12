import { Client } from './client/client';
import { assertHasRequiredOptions } from './client/options';
import { ClientOptions, WithRequired } from './client/types';
import { createListener } from './resources/listen';
import { NotificationPreferences } from './user-resources/notification-preferences';
import { Notifications } from './user-resources/notifications';
import { PushSubscriptions } from './user-resources/push-subscriptions';
import { Subscriptions } from './user-resources/subscriptions';

export type UserClientOptions =
  | WithRequired<Omit<ClientOptions, 'apiSecret'>, 'apiKey' | 'userEmail'>
  | WithRequired<Omit<ClientOptions, 'apiSecret'>, 'apiKey' | 'userExternalId'>;

export class UserClient extends Client {
  listen = createListener(this);

  notificationPreferences = new NotificationPreferences(this);
  notifications = new Notifications(this);
  pushSubscriptions = new PushSubscriptions(this);
  subscriptions = new Subscriptions(this);

  constructor(options: UserClientOptions) {
    assertHasRequiredOptions(options, ['apiKey']);
    if ('apiSecret' in options) {
      throw new Error('The API secret should NOT be used on the user client.');
    }

    super(options);
  }
}
