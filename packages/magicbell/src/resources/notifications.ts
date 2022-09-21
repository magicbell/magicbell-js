// This file is generated. Do not update manually!
import { createMethod } from '../method';
import { Resource } from '../resource';

export class Notifications extends Resource {
  path = 'notifications';
  entity = 'notification';

  /**
   * Create notifications
   **/
  create = createMethod({
    method: 'POST',
  });

  /**
   * Fetch notifications
   **/
  list = createMethod({
    method: 'GET',
    type: 'list',
  });

  /**
   * Fetch a notification
   **/
  retrieve = createMethod({
    method: 'GET',
    path: '{notification_id}',
  });

  /**
   * Delete a notification
   **/
  delete = createMethod({
    method: 'DELETE',
    path: '{notification_id}',
  });

  /**
   * Mark a notification as read
   **/
  markAsRead = createMethod({
    method: 'POST',
    path: '{notification_id}/read',
  });

  /**
   * Mark a notification as unread
   **/
  markAsUnread = createMethod({
    method: 'POST',
    path: '{notification_id}/unread',
  });

  /**
   * Archive a notification
   **/
  archive = createMethod({
    method: 'POST',
    path: '{notification_id}/archive',
  });

  /**
   * Unarchive a notification
   **/
  unarchive = createMethod({
    method: 'DELETE',
    path: '{notification_id}/archive',
  });

  /**
   * Mark all notifications as read
   **/
  markAllRead = createMethod({
    method: 'POST',
    path: 'read',
  });

  /**
   * Mark all notifications as seen
   **/
  markAllSeen = createMethod({
    method: 'POST',
    path: 'seen',
  });
}
