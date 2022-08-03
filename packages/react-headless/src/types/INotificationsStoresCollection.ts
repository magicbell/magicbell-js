import { IRemoteNotification } from '../types';
import INotificationRepository from './INotificationRepository';
import INotificationStore from './INotificationStore';

export type QueryParams = {
  /**
   * A filter on the notifications based on read state.
   */
  read?: boolean;
  /**
   * A filter on the notifications based on seen state.
   */
  seen?: boolean;
  /**
   * A filter on the notifications based on archived state.
   */
  archived?: boolean;
  /**
   * A filter on the notifications based on category. Use "uncategorized" to
   * to target notifications without a category.
   */
  categories?: string[];
  /**
   * A filter on the notifications based on topic.
   */
  topics?: string[];
  /**
   * A limit on the number of notifications to be returned.
   */
  per_page?: number;
  /**
   * The page number to be returned.
   */
  page?: number;

  // accept any other key supported by the backend, but not yet typed in this SDK
  [key: string]: unknown;
};

export default interface INotificationsStoresCollection {
  stores: Record<string, INotificationStore>;

  /**
   * Add a store to the collection.
   *
   * @param storeId ID of the store to add.
   * @param defaultQueryParams Optional default query parameters used to fetch the store.
   * @param otherProps Properties used to initialize the store with
   */
  setStore: (storeId: string, defaultQueryParams?: QueryParams, otherProps?: Partial<INotificationStore>) => void;

  /**
   * Fetch a store from the MagicBell server.
   *
   * @param storeId ID of the store to fetch.
   * @param queryParams Optional query parameters to fetch.
   * @param options.reset Whether to prepend notifications to the store or not
   */
  fetchStore: (
    storeId: string,
    queryParams?: Record<string, unknown>,
    options?: Partial<{ reset: boolean; prepend: boolean }>,
  ) => Promise<void>;

  /**
   * Fetch all stores from the MagicBell server.
   *
   * @param queryParams Optional query parameters to fetch.
   * @param options.reset Whether to prepend notifications to the store or not
   */
  fetchAllStores: (
    queryParams?: Record<string, unknown>,
    options?: Partial<{ reset: boolean; prepend: boolean }>,
  ) => Promise<void>;

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
   * Deletes a notification. Makes a request to the MagicBell server and
   * removes the notification immediately.
   *
   * @param notification Notification to mark as read.
   */
  deleteNotification: (notification: IRemoteNotification, options?: Partial<{ persist: boolean }>) => Promise<boolean>;

  /**
   * Marks all notifications as seen. Makes a request to the MagicBell server
   * and sets the `seenAt` attribute of all notifications immediately.
   */
  markAllAsSeen: (options?: Partial<{ persist: boolean; updateModels: boolean; storeId?: string }>) => Promise<boolean>;

  /**
   * Marks all notifications as read. Makes a request to the MagicBell server
   * and sets the `readAt` attribute of all notifications immediately.
   */
  markAllAsRead: (options?: Partial<{ persist: boolean; updateModels: boolean; storeId?: string }>) => Promise<boolean>;

  _repository: INotificationRepository;
}
