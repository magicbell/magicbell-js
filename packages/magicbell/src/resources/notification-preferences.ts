import { createMethod } from '../method';
import { Resource } from '../resource';

export class NotificationPreferences extends Resource {
  path = 'notification_preferences';
  entity = 'notification_preferences';

  retrieve = createMethod({
    method: 'GET',
  });

  update = createMethod({
    method: 'PUT',
  });
}
