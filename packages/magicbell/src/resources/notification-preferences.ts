// This file is generated. Do not update manually!
import { createMethod } from '../method';
import { Resource } from '../resource';

export class NotificationPreferences extends Resource {
  path = 'notification_preferences';
  entity = 'notification_preferences';

  /**
   * Fetch user notification preferences
   **/
  get = createMethod({
    method: 'GET',
  });

  /**
   * Update user notification preferences
   **/
  update = createMethod({
    method: 'PUT',
  });
}
