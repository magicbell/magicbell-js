import { useCallback, useEffect } from 'react';

import useConfig from '../stores/config/useConfig.js';
import useNotificationStoresCollection from '../stores/notifications/useNotificationStoresCollection.js';
import { QueryParams } from '../types/INotificationsStoresCollection.js';
import INotificationStore from '../types/INotificationStore.js';

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
  fetch: (queryParams?: QueryParams, options?: FetchOptions) => Promise<void>;

  /**
   * Fetch the next page of notifications from the API server. The notifications
   * will be appended to the current list of notifications.
   *
   * @param queryParams Parameters to send to the API.
   */
  fetchNextPage: (queryParams?: Omit<QueryParams, 'page' | 'per_page'>, options?: FetchOptions) => Promise<void>;

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
export default function useNotifications(storeId = 'default'): NotificationStore | null {
  const { stores, fetchStore, markAllAsSeen, markAllAsRead } = useNotificationStoresCollection();
  const config = useConfig();
  const store = stores[storeId];

  const fetch = useCallback<NotificationStore['fetch']>(
    (queryParams, options) => fetchStore(storeId, queryParams, options),
    [fetchStore, storeId],
  );

  const fetchNextPage = useCallback<NotificationStore['fetchNextPage']>(
    (queryParams = {}, options) => {
      const page = store.currentPage + 1;
      return fetchStore(storeId, { ...queryParams, page }, options);
    },
    [fetchStore, storeId, store?.currentPage],
  );

  useEffect(() => {
    if (!store) return;
    if (config.lastFetchedAt && !store.lastFetchedAt) fetch({ page: 1 });
  }, [config.lastFetchedAt, store, fetch]);

  const markAllAsReadFn = useCallback<NotificationStore['markAllAsRead']>(
    (options) => markAllAsRead({ ...options, storeId }),
    [markAllAsRead, storeId],
  );

  const markAllAsSeenFn = useCallback<NotificationStore['markAllAsSeen']>(
    (options) => markAllAsSeen({ ...options, storeId }),
    [markAllAsSeen, storeId],
  );

  if (!store) return null;

  return {
    ...store,
    isEmpty: store.notifications.length === 0,
    hasNextPage: store.currentPage < store.totalPages,
    fetch,
    fetchNextPage,
    markAllAsSeen: markAllAsSeenFn,
    markAllAsRead: markAllAsReadFn,
  };
}
