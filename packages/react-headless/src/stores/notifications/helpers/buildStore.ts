import mergeRight from 'ramda/src/mergeRight';
import { IRemoteNotification } from '../../..';
import INotificationStore, { IStrategyComparator } from '../../../types/INotificationStore';
import { compareAttributeStrategy, NotificationCompareStrategy } from './strategies';

/**
 * Factory of notifications stores.
 *
 * @param props Properties to initialize the store with
 * @param strategy Function to compare notifications with the context
 * @returns An empty store of notifications
 */
export default function buildStore(
  props: Object,
  strategy: NotificationCompareStrategy = compareAttributeStrategy,
): INotificationStore {
  const defaults = {
    context: {},
    total: 0,
    totalPages: 0,
    perPage: 0,
    currentPage: 1,
    unreadCount: 0,
    unseenCount: 0,
    notifications: [],

    objMatchesContext: (notification: IRemoteNotification, comparator: IStrategyComparator): boolean => {
      return strategy(notification, this.context, comparator).result;
    },
  };

  return mergeRight(defaults, props);
}
