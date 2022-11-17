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
    id: 'notifications-create',
    method: 'POST',
  });

  /**
   * Fetch notifications
   **/
  list = createMethod({
    id: 'notifications-list',
    method: 'GET',
    type: 'list',
  });

  /**
   * Fetch a notification
   **/
  get = createMethod({
    id: 'notifications-get',
    method: 'GET',
    path: '{notification_id}',
  });

  /**
   * Delete a notification
   **/
  delete = createMethod({
    id: 'notifications-delete',
    method: 'DELETE',
    path: '{notification_id}',
  });

  /**
   * Mark a notification as read
   **/
  markAsRead = createMethod({
    id: 'notifications-mark-as-read',
    method: 'POST',
    path: '{notification_id}/read',
  });

  /**
   * Mark a notification as unread
   **/
  markAsUnread = createMethod({
    id: 'notifications-mark-as-unread',
    method: 'POST',
    path: '{notification_id}/unread',
  });

  /**
   * Archive a notification
   **/
  archive = createMethod({
    id: 'notifications-archive',
    method: 'POST',
    path: '{notification_id}/archive',
  });

  /**
   * Unarchive a notification
   **/
  unarchive = createMethod({
    id: 'notifications-unarchive',
    method: 'DELETE',
    path: '{notification_id}/archive',
  });

  /**
   * Mark all notifications as read
   **/
  markAllRead = createMethod({
    id: 'notifications-mark-all-read',
    method: 'POST',
    path: 'read',
  });

  /**
   * Mark all notifications as seen
   **/
  markAllSeen = createMethod({
    id: 'notifications-mark-all-seen',
    method: 'POST',
    path: 'seen',
  });
}
