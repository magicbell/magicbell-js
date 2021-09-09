import { useEffect } from 'react';
import useConfig from '../stores/config';
import { useNotificationStoresCollection } from '../stores/notifications';
import INotificationStore from '../types/INotificationStore';

export interface NotificationStore extends INotificationStore {
  /**
   * Fetch notifications from the API server. The pagination data is also
   * updated. By default the array of notifications is not reset.
   *
   * @param queryParams Parameters to send to the API.
   */
  fetch: (queryParams?: Object) => Promise<void>;

  /**
   * Fetch the next page of notifications from the API server. The notifications
   * will be appended to the current list of notifications.
   *
   * @param queryParams Parameters to send to the API.
   */
  fetchNextPage: (queryParams?: Object) => Promise<void>;

  /**
   * Mark all notifications as seen. Resets the `unseenCount` attribute.
   *
   * @param options.persist Mark all notifications as seen in the server
   * @param options.updateModels Mark all fetched notifications as seen
   */
  markAllAsSeen: (options?: Partial<{ persist: boolean; updateModels: boolean }>) => Promise<boolean>;

  /**
   * Mark all notifications as read. Resets the `unreadCount` attribute.
   *
   * @param options.persist Mark all notifications as read in the server
   * @param options.updateModels Mark all fetched notifications as read
   */
  markAllAsRead: (options?: Partial<{ persist: boolean; updateModels: boolean }>) => Promise<boolean>;
}

/**
 * Hook to get a notifications store from the stores collection. It fetches the
 * first page of the store if it is not fetched already.
 *
 * @param storeId ID of the notifications store (optional)
 *
 * @example
 * const store = useNotifications('mentions');
 */
export default function useNotifications(storeId: string = 'default'): NotificationStore {
  const { stores, fetchStore, markAllAsSeen, markAllAsRead } = useNotificationStoresCollection();
  const config = useConfig();
  const store = stores[storeId];
  if (!store) throw new Error(`Store not found. Define a store with the ${storeId} ID`);

  const fetch = (queryParams?: Object) => fetchStore(storeId, queryParams);

  const fetchNextPage = (queryParams: Object = {}) => {
    const page = store.currentPage + 1;
    return fetchStore(storeId, { ...queryParams, page });
  };

  useEffect(() => {
    if (config.lastFetchedAt && !store.lastFetchedAt) fetch({ page: 1 });
  }, [config.lastFetchedAt]);

  return {
    ...store,
    fetch,
    fetchNextPage,
    markAllAsSeen,
    markAllAsRead,
  };
}
