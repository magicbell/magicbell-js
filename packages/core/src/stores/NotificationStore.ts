import camelize from '../lib/decorators/camelize.js';
import Notification from '../models/Notification/index.js';
import NotificationFactory from '../models/Notification/NotificationFactory.js';
import NotificationRepository from '../models/Notification/NotificationRepository.js';
import RemoteStore from './RemoteStore.js';

export type NotificationStoreAttrs = {
  items: Notification[] | any[];
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  unseenCount: number;
  unreadCount: number;
};

/**
 * A synced collection, or store, of notifications.
 *
 * @example
 * const store = new NotificationStore()
 */
export default class NotificationStore extends RemoteStore<Notification> {
  unseenCount = 0;
  unreadCount = 0;

  repo: NotificationRepository;

  constructor(attrs = {}) {
    super();

    this.set(attrs);
    this.repo = new NotificationRepository();
  }

  get notifications() {
    return this.items;
  }

  /**
   * Create a notification, store it in the API server and add it to the store.
   *
   * @param data Data of the notification.
   */
  create = async (data): Promise<Notification> => {
    const notification = await Notification.create(data);
    this.push(notification);

    return notification;
  };

  /**
   * Mark all notifications as read. Resets the `unreadCount` attribute.
   *
   * @param omitRequest Update notifications locally only.
   */
  markAllAsRead = async ({ omitRequest = false } = {}) => {
    this.unreadCount = 0;

    // @TODO Remove the deep observer so the items array changes only after
    // the action is completed. In the meantime we clone the items array.
    for (const notification of this.items.slice()) notification.isRead = true;

    if (!omitRequest) return this.repo.markAllAsRead();
  };

  /**
   * Mark all notifications as seen. Resets the `unseenCount` attribute.
   *
   * @param omitRequest Update notifications locally only.
   * @param updateItems Mark all notifications as seen.
   */
  markAllAsSeen = async ({ omitRequest = false, updateItems = true } = {}) => {
    this.unseenCount = 0;

    if (updateItems) {
      // @TODO Remove the deep observer so the items array changes only after
      // the action is completed. In the meantime we clone the items array.
      for (const notification of this.items.slice()) notification.isSeen = true;
    }

    if (!omitRequest) this.repo.markAllAsSeen();
  };

  push(notification: Notification) {
    const added = super.push(notification);
    if (added && !notification.isRead) this.incrementUnreadCount();
    if (added && !notification.isSeen) this.incrementUnseenCount();

    return added;
  }

  remove(notification: Notification) {
    const removed = super.remove(notification);
    if (removed && !notification.isRead) this.decrementUnreadCount();
    if (removed && !notification.isSeen) this.decrementUnseenCount();

    return removed;
  }

  incrementUnreadCount() {
    this.unreadCount = this.unreadCount + 1;
  }

  decrementUnreadCount() {
    this.unreadCount = Math.max(0, this.unreadCount - 1);
  }

  incrementUnseenCount() {
    this.unseenCount = this.unseenCount + 1;
  }

  decrementUnseenCount() {
    this.unseenCount = Math.max(0, this.unseenCount - 1);
  }

  @camelize()
  set(json) {
    const { notifications, ...metadata } = json;

    Object.assign(this, metadata);
    if (notifications) this.setItems(notifications);
  }

  /**
   * Append notifications to the store.
   *
   * @param items Object containing the pagination data
   */
  setItems(items) {
    const notifications = items.map((notification) => this.createNotification(notification));
    this.items.push(...notifications);

    return this;
  }

  private createNotification(data) {
    return NotificationFactory.create(data);
  }
}
