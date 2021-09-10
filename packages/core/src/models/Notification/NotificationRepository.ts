import { postAPI } from '../../lib/ajax';
import RemoteRepository from '../../repository/RemoteRepository';
import IRemoteNotification from './IRemoteNotification';

/**
 * Class to interact with the notification API endpoints.
 *
 * @example
 * const repo = new NotificationRepository();
 * const notifications = repo.findBy({ unseen: true });
 */
export default class NotificationRepository extends RemoteRepository<IRemoteNotification> {
  constructor(remotePathOrUrl = '/notifications') {
    super(remotePathOrUrl);
  }

  /**
   * Mark a notification as read in the API server.
   */
  markAsRead(id: string): Promise<boolean> {
    const url = `${this.remotePathOrUrl}/${id}/read`;

    return postAPI(url)
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Mark a notification as unread in the API server.
   */
  markAsUnread(id: string): Promise<boolean> {
    const url = `${this.remotePathOrUrl}/${id}/unread`;

    return postAPI(url)
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Mark all notifications as seen.
   */
  markAllAsSeen() {
    const url = `${this.remotePathOrUrl}/seen`;
    return postAPI(url);
  }

  /**
   * Mark all notifications as read.
   */
  markAllAsRead() {
    const url = `${this.remotePathOrUrl}/read`;
    return postAPI(url);
  }
}
