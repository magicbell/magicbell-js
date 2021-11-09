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
 * @param props
 * @param props.storeId Optional ID of the notifications store
 * @returns A store of notifications (if the store exists)
 *
 * @example
 * const { unreadCount, markAllAsSeen } = useBell();
 */
export default function useBell({ storeId }: useBellArgs = {}): NotificationStore | null {
  const store = useNotifications(storeId);

  const markAllAsSeen = () => {
    if (store && store.unseenCount > 0) return store?.markAllAsSeen({ updateModels: false });
    return Promise.resolve(true);
  };

  if (store) return { ...store, markAllAsSeen };
  return null;
}
