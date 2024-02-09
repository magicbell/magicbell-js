import INotificationStore from '../../../types/INotificationStore';

const emptyStore = {
  // the context defaults to unarchived notifications, as that's the behaviour
  // defined in the backend, it's needed here as wel for multi store sync.
  context: {},
  total: 0,
  totalPages: 0,
  perPage: 0,
  currentPage: 1,
  unreadCount: 0,
  unseenCount: 0,
  notifications: [],
};

/**
 * Factory of notifications stores.
 *
 * @param props Properties to initialize the store with
 * @param strategy Function to compare notifications with the context
 * @returns An empty store of notifications
 */
export default function buildStore(props: Record<string, unknown>): INotificationStore {
  return { ...emptyStore, ...props };
}
