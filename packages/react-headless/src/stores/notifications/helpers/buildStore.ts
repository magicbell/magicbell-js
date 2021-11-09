import mergeRight from 'ramda/src/mergeRight';
import INotificationStore from '../../../types/INotificationStore';

/**
 * Factory of notifications stores.
 *
 * @param props Properties to initialize the store with
 * @param strategy Function to compare notifications with the context
 * @returns An empty store of notifications
 */
export default function buildStore(props: Object): INotificationStore {
  const defaults = {
    context: {},
    total: 0,
    totalPages: 0,
    perPage: 0,
    currentPage: 1,
    unreadCount: 0,
    unseenCount: 0,
    notifications: [],
  };

  return mergeRight(defaults, props);
}
