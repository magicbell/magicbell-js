import RemoteRepository from '../stores/repository/RemoteRepository';
import { QueryParams } from './INotificationsStoresCollection';
import INotificationStore from './INotificationStore';
import IRemoteNotification from './IRemoteNotification';

interface IWrappedNotification {
  notification: IRemoteNotification;
}

export default interface INotificationRepository extends RemoteRepository<IWrappedNotification, INotificationStore> {
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
