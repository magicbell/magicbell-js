import { RequestClient } from './lib/request-client';
import { createListener } from './listen';
import { Broadcasts } from './resources/broadcasts';
import { Imports } from './resources/imports';
import { Metrics } from './resources/metrics';
import { NotificationPreferences } from './resources/notification-preferences';
import { Notifications } from './resources/notifications';
import { PushSubscriptions } from './resources/push-subscriptions';
import { Subscriptions } from './resources/subscriptions';
import { Users } from './resources/users';

export class Client extends RequestClient {
  listen = createListener(this);

  broadcasts = new Broadcasts(this);
  imports = new Imports(this);
  metrics = new Metrics(this);
  notificationPreferences = new NotificationPreferences(this);
  notifications = new Notifications(this);
  pushSubscriptions = new PushSubscriptions(this);
  subscriptions = new Subscriptions(this);
  users = new Users(this);
}
