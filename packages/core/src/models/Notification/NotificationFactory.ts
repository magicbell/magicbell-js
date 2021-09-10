import Notification from './Notification';

/**
 * A factory to create notifications. It implements identity map so there is
 * one and only one representation of a notification in the system.
 *
 * @example
 * const notification = NotificationFactory.create({ id });
 * notification.fetch();
 */
export default class NotificationFactory {
  static identityMap = new Map();

  static create(data) {
    if (data instanceof Notification) return data;

    let instance = this.identityMap.get(data.id);
    if (!instance) {
      instance = new Notification(data);
      this.cacheInstance(instance);
    }

    return instance;
  }

  static cacheInstance(instance) {
    this.identityMap.set(instance.id, instance);
  }
}
