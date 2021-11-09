import { IRemoteNotification } from '../types';
import INotificationRepository from './INotificationRepository';
import INotificationStore from './INotificationStore';

export default interface INotificationsStoresCollection {
  stores: Record<string, INotificationStore>;

  /**
   * Add a store to the collection.
   *
   * @param storeId ID of the store to add.
   * @param defaultQueryParams Optional default query parameters used to fetch the store.
   * @param otherProps Properties used to initialize the store with
   */
  setStore: (storeId: string, defaultQueryParams?: Object, otherProps?: Partial<INotificationStore>) => void;

  /**
   * Fetch a store from the MagicBell server.
   *
   * @param storeId ID of the store to fetch.
   * @param queryParams Optional query parameters to fetch.
   * @param options.reset Whether to prepend notifications to the store or not
   */
  fetchStore: (
    storeId: string,
    queryParams?: Object,
    options?: Partial<{ reset: boolean; prepend: boolean }>,
  ) => Promise<void>;

  /**
   * Fetch all stores from the MagicBell server.
   *
   * @param queryParams Optional query parameters to fetch.
   * @param options.reset Whether to prepend notifications to the store or not
   */
  fetchAllStores: (queryParams?: Object, options?: Partial<{ reset: boolean; prepend: boolean }>) => Promise<void>;

  /**
   * Mark a notification as seen.
   *
   * @param notification Notification to mark as seen.
   */
  markNotificationAsSeen: (notification: IRemoteNotification) => void;

  /**
   * Mark a notification as read. Makes a request to the MagicBell server and
   * marks the notification as read immediately.
   *
   * @param notification Notification to mark as read.
   */
  markNotificationAsRead: (notification: IRemoteNotification) => Promise<boolean>;

  /**
   * Mark a notification as unread. Makes a request to the MagicBell server and
   * marks the notification as unread immediately.
   *
   * @param notification Notification to mark as read.
   */
  markNotificationAsUnread: (notification: IRemoteNotification) => Promise<boolean>;

  /**
   * Delets a notification. Makes a request to the MagicBell server and
   * removes the notification immediately.
   *
   * @param notification Notification to mark as read.
   */
  deleteNotification: (notification: IRemoteNotification, options?: Partial<{ persist: boolean }>) => Promise<boolean>;

  /**
   * Marks all notifications as seen. Makes a request to the MagicBell server
   * and sets the `seenAt` attribute of all notifications immediately.
   */
  markAllAsSeen: (options?: Partial<{ persist: boolean; updateModels: boolean }>) => Promise<boolean>;

  /**
   * Marks all notifications as read. Makes a request to the MagicBell server
   * and sets the `readAt` attribute of all notifications immediately.
   */
  markAllAsRead: (options?: Partial<{ persist: boolean; updateModels: boolean }>) => Promise<boolean>;

  _repository: INotificationRepository;
}
