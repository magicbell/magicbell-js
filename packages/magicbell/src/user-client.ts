import { RequestClient } from './lib/request-client';
import { createListener } from './listen';
import { assertHasRequiredOptions } from './options';
import { ClientOptions as RequestClientOptions, WithRequired } from './types';
import { NotificationPreferences } from './user-resources/notification-preferences';
import { Notifications } from './user-resources/notifications';
import { PushSubscriptions } from './user-resources/push-subscriptions';
import { Subscriptions } from './user-resources/subscriptions';

export type ClientOptions =
  | WithRequired<RequestClientOptions, 'apiKey' | 'userEmail'>
  | WithRequired<RequestClientOptions, 'apiKey' | 'userExternalId'>;

export class Client extends RequestClient {
  listen = createListener(this);

  notificationPreferences = new NotificationPreferences(this);
  notifications = new Notifications(this);
  pushSubscriptions = new PushSubscriptions(this);
  subscriptions = new Subscriptions(this);

  constructor(options: ClientOptions) {
    assertHasRequiredOptions(options, ['apiKey']);
    if (options.apiSecret && typeof document !== 'undefined') {
      throw new Error('The API secret should NOT be used on the user client.');
    }

    super(options);
  }
}
