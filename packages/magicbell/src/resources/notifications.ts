import { createMethod } from '../method';
import { Resource } from '../resource';

export class Notifications extends Resource {
  path = 'notifications';
  entity = 'notification';

  create = createMethod({
    method: 'POST',
  });

  list = createMethod({
    method: 'GET',
    type: 'list',
  });

  retrieve = createMethod({
    method: 'GET',
    path: '{notification_id}',
  });

  delete = createMethod({
    method: 'DELETE',
    path: '{notification_id}',
  });

  markAsRead = createMethod({
    method: 'POST',
    path: '{notification_id}/read',
  });

  markAsUnread = createMethod({
    method: 'POST',
    path: '{notification_id}/read',
  });

  archive = createMethod({
    method: 'POST',
    path: '{notification_id}/archive',
  });

  unarchive = createMethod({
    method: 'DELETE',
    path: '{notification_id}/archive',
  });

  markAllRead = createMethod({
    method: 'POST',
    path: 'read',
  });

  markAllSeen = createMethod({
    method: 'POST',
    path: 'seen',
  });
}
