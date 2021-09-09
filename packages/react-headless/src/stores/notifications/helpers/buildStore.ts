import { merge } from 'ramda';
import INotificationsStore from '../../../types/INotificationsStore';

/**
 * Factory of notifications stores.
 *
 * @param props Properties to initialize the store with
 * @returns An empty store of notifications.
 */
export default function buildStore(props: Object): INotificationsStore {
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

  return merge(defaults, props);
}
