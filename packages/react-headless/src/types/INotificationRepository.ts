import RemoteRepository from '../stores/repository/RemoteRepository';
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
  markAllAsSeen(): Promise<boolean>;

  /**
   * Mark all notifications as read.
   */
  markAllAsRead(): Promise<boolean>;
}
