import RemoteRepository from '../stores/repository/RemoteRepository.js';
import { QueryParams } from './INotificationsStoresCollection.js';
import INotificationStore from './INotificationStore.js';
import IRemoteNotification from './IRemoteNotification.js';

interface IWrappedNotification {
  notification: IRemoteNotification;
}

export default interface INotificationRepository extends RemoteRepository<IWrappedNotification, INotificationStore> {
  /**
   * Mark a notification as archived in the API server.
   *
   * @param id ID of the notification
   */
  archive(id: string): Promise<boolean>;

  /**
   * Mark a notification as unarchived in the API server.
   *
   * @param id ID of the notification
   */
  unarchive(id: string): Promise<boolean>;

  /**
   * Mark a notification as read in the API server.
   *
   * @param id ID of the notification
   */
  markAsRead(id: string): Promise<boolean>;

  /**
   * Mark a notification as unread in the API server.
   *
   * @param id ID of the notification
   */
  markAsUnread(id: string): Promise<boolean>;

  /**
   * Mark all notifications as seen.
   */
  markAllAsSeen(params?: Omit<QueryParams, 'page' | 'per_page'>): Promise<boolean>;

  /**
   * Mark all notifications as read.
   */
  markAllAsRead(params?: Omit<QueryParams, 'page' | 'per_page'>): Promise<boolean>;
}
