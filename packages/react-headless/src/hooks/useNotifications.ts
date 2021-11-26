import { useEffect } from 'react';
import useConfig from '../stores/config';
import { useNotificationStoresCollection } from '../stores/notifications';
import INotificationStore from '../types/INotificationStore';

type FetchOptions = Partial<{
  reset: boolean;
}>;

export interface NotificationStore extends INotificationStore {
  isEmpty: boolean;
  hasNextPage: boolean;

  /**
   * Fetch notifications from the API server. The pagination data is also
   * updated. By default the array of notifications is not reset.
   *
   * @param queryParams Parameters to send to the API.
   */
  fetch: (queryParams?: Object, options?: FetchOptions) => Promise<void>;

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
export default function useNotifications(storeId: string = 'default'): NotificationStore | null {
  const { stores, fetchStore, markAllAsSeen, markAllAsRead } = useNotificationStoresCollection();
  const config = useConfig();
  const store = stores[storeId];

  const fetch = (queryParams?: Object, options?: FetchOptions) => fetchStore(storeId, queryParams, options);

  const fetchNextPage = (queryParams: Object = {}, options?: FetchOptions) => {
    const page = store.currentPage + 1;
    return fetchStore(storeId, { ...queryParams, page }, options);
  };

  useEffect(() => {
    if (!store) return;
    if (config.lastFetchedAt && !store.lastFetchedAt) fetch({ page: 1 });
  }, [config.lastFetchedAt]);

  if (!store) return null;

  return {
    ...store,
    isEmpty: store.notifications.length === 0,
    hasNextPage: store.currentPage < store.totalPages,
    fetch,
    fetchNextPage,
    markAllAsSeen,
    markAllAsRead,
  };
}
