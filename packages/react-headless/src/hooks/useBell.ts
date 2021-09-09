import useNotifications, { NotificationStore } from './useNotifications';

interface useBellArgs {
  storeId?: string;
}

/**
 * Hook to get a notification store to be used in a bell.
 *
 * The `markAllAsSeen` function exposed by this hook does not update the fetched
 * notifications.
 *
 * @param storeId Optional ID of the notifications store
 *
 * @example
 * const { unreadCount, markAllAsSeen } = useBell();
 */
export default function useBell({ storeId }: useBellArgs = {}): NotificationStore {
  const store = useNotifications(storeId);

  const markAllAsSeen = () => {
    if (store.unseenCount > 0) return store.markAllAsSeen({ updateModels: false });
    return Promise.resolve(true);
  };

  return { ...store, markAllAsSeen };
}
