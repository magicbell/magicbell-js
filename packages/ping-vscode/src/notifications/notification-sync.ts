import { Signal } from '@preact/signals-core';
import MagicBell from 'magicbell';

import { NotificationHandler } from './notification-handler';

export class NotificationSync {
  #notificationHandler: NotificationHandler;
  #notificationsStore: Signal<Array<any>>;
  #magicbell: MagicBell;

  constructor(
    notificationHandler: NotificationHandler,
    notificationsStore: Signal<Array<any>[]>,
    magicbell: MagicBell,
  ) {
    this.#notificationHandler = notificationHandler;
    this.#notificationsStore = notificationsStore;
    this.#magicbell = magicbell;
  }

  public async pull() {
    const isFirstPull = this.#notificationsStore.value.length === 0;

    const response = await this.#magicbell.notifications.list();
    const count = response.unseen_count;

    await this.#magicbell.notifications.list().forEach((notification) => {
      if (this.#notificationsStore.value.find((n) => n.id === notification.id)) {
        return;
      }
      this.#notificationHandler.handle(notification);
    });

    // Reschedule pull.
    setTimeout(this.pull.bind(this), 10000);

    if (!isFirstPull || !count) {
      return;
    }
    this.#notificationHandler.onFirstPull(count);
  }
}
