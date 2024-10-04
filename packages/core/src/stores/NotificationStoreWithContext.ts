import Notification from '../models/Notification/index.js';
import NotificationStore from './NotificationStore.js';
import { compareAttributeStrategy, NotificationCompareStrategy } from './strategy.js';

type StrategyComparator = (attribute, rule) => boolean;

/**
 * A notification store with a context. Actions are executed taking into
 * consideration the context.
 *
 * @example
 * const store = new NotificationStoreWithContext({ read: true });
 * store.fetch({ page: 2 });
 */
export default class NotificationStoreWithContext extends NotificationStore {
  context = {};
  strategy: NotificationCompareStrategy;

  constructor(context) {
    super();

    this.strategy = compareAttributeStrategy;
    this.context = context;
    Object.freeze(this.context);
  }

  /**
   * Add or remove a notification that changed. Changes can be tracked using the
   * `observe` or `observeKey` functions.
   *
   * @param notification Notification to add or remove to the store
   * @param stategy Function to test the notification against the context
   * @returns Whether the notification store was modified or not
   */
  handleNotificationChange(notification: Notification, comparator?: StrategyComparator) {
    const removed = this.removeUnlessMatchesContext(notification, comparator);

    if (removed) return true;
    else return this.addIfMatchesContext(notification, comparator);
  }

  /**
   * Remove a notification from the store if it does not match the context.
   * Deleted notifications are removed.
   *
   * @param notification Notification to remove
   * @param stategy Function to test the notification against the context
   */
  removeUnlessMatchesContext(notification: Notification, comparator?: StrategyComparator) {
    const matches = this.strategy(notification, this.context, comparator);
    if (notification.deletedAt || !matches.result) {
      const removed = this.remove(notification);

      if (removed) {
        // Though the `remove` method updates the counters, in this scenario some
        // attributes changed before removing the model.
        if (matches.delta.indexOf('read') >= 0) this.decrementUnreadCount();
        if (matches.delta.indexOf('seen') >= 0) this.decrementUnseenCount();
      }

      return removed;
    }

    return false;
  }

  /**
   * Add a notification to the store if it matches the context. Deleted
   * notifications are not added.
   *
   * @param notification Notification to add
   * @param stategy Function to test the notification against the context
   */
  addIfMatchesContext(notification: Notification, comparator?: StrategyComparator) {
    const matches = this.strategy(notification, this.context, comparator);
    if (!notification.deletedAt && matches.result) {
      return this.push(notification);
    }

    return false;
  }

  fetch(queryParams = {}, options = { reset: false }) {
    return super.fetch({ ...queryParams, ...this.context }, options);
  }

  fetchNextPage(queryParams = {}) {
    return super.fetchNextPage({ ...queryParams, ...this.context });
  }

  fetchAndReset(queryParams = {}) {
    return this.fetch({ page: 1, ...queryParams }, { reset: true });
  }
}
