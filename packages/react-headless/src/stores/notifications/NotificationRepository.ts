import { postAPI } from '../../lib/ajax.js';
import INotificationRepository from '../../types/INotificationRepository.js';
import { QueryParams } from '../../types/INotificationsStoresCollection.js';
import INotificationStore from '../../types/INotificationStore.js';
import IRemoteNotification from '../../types/IRemoteNotification.js';
import RemoteRepository from '../repository/RemoteRepository.js';

interface IWrappedNotification {
  notification: IRemoteNotification;
}

/**
 * Class to interact with the notification API endpoints.
 *
 * @example
 * const repo = new NotificationRepository();
 * const notifications = repo.findBy({ unseen: true });
 */
export default class NotificationRepository
  extends RemoteRepository<IWrappedNotification, INotificationStore>
  implements INotificationRepository
{
  constructor(remotePathOrUrl = '/notifications') {
    super(remotePathOrUrl);
  }

  archive(id: string): Promise<boolean> {
    const url = `${this.remotePathOrUrl}/${id}/archive`;

    return postAPI(url)
      .then(() => true)
      .catch(() => false);
  }

  unarchive(id: string): Promise<boolean> {
    const url = `${this.remotePathOrUrl}/${id}/unarchive`;

    return postAPI(url)
      .then(() => true)
      .catch(() => false);
  }

  markAsRead(id: string): Promise<boolean> {
    const url = `${this.remotePathOrUrl}/${id}/read`;

    return postAPI(url)
      .then(() => true)
      .catch(() => false);
  }

  markAsUnread(id: string): Promise<boolean> {
    const url = `${this.remotePathOrUrl}/${id}/unread`;

    return postAPI(url)
      .then(() => true)
      .catch(() => false);
  }

  markAllAsSeen(params?: Omit<QueryParams, 'page' | 'per_page'>) {
    const url = `${this.remotePathOrUrl}/seen`;
    return postAPI(url, undefined, params)
      .then(() => true)
      .catch(() => false);
  }

  markAllAsRead(params?: Omit<QueryParams, 'page' | 'per_page'>) {
    const url = `${this.remotePathOrUrl}/read`;
    return postAPI(url, undefined, params)
      .then(() => true)
      .catch(() => false);
  }
}
