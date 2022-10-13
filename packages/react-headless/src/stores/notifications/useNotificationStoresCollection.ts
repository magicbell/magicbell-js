import produce from 'immer';
import { findIndex, mergeRight, propEq } from 'ramda';
import create from 'zustand';

import { emitEvent } from '../../lib/realtime';
import { INotificationsStoresCollection, INotificationStore, IRemoteNotification } from '../../types';
import buildStore from './helpers/buildStore';
import setStoreProps from './helpers/setStoreProps';
import { objMatchesContext } from './helpers/strategies';
import NotificationRepository from './NotificationRepository';

/**
 * Collection of notifications store. It contains all stores of notifications
 * and exposes methods to interact with them.
 *
 * @private Use the `useNotifications` hook instead.
 */
const useNotificationStoresCollection = create<INotificationsStoresCollection>((set, get) => ({
  stores: {},
  _repository: new NotificationRepository(),

  setStore: (storeId, defaultQueryParams = {}, otherProps: Partial<INotificationStore> = {}) => {
    set(
      produce<INotificationsStoresCollection>((draft) => {
        draft.stores[storeId] = buildStore({ ...otherProps, context: defaultQueryParams });
      }),
    );
  },

  fetchStore: async (storeId, queryParams = {}, options = {}) => {
    const { stores, _repository } = get();
    const store = stores[storeId];

    if (store) {
      const response = await _repository.findBy({ ...store.context, ...queryParams });
      if (!response) return;

      set(
        produce<INotificationsStoresCollection>((draft) => {
          draft.stores[storeId] = setStoreProps(store, { ...response, lastFetchedAt: new Date() }, options);
        }),
      );
    } else {
      // Provided for development support.
      // eslint-disable-next-line no-console
      console.error(`Store not found. Define a store with the ${storeId} ID`);
    }
  },

  fetchAllStores: async (queryParams = {}, options = {}) => {
    const { stores, fetchStore } = get();

    const storeIds = Object.keys(stores);
    const fetchers = storeIds.map((storeId) => fetchStore(storeId, queryParams, options));
    await Promise.all(fetchers);
  },

  markNotificationAsSeen: (notification: IRemoteNotification) => {
    const { stores } = get();
    const notificationId = notification.id;
    emitEvent('notifications.seen', notification, 'local');

    set(
      produce<INotificationsStoresCollection>((draft) => {
        for (const storeId in stores) {
          const { notifications, unseenCount } = stores[storeId];
          const index = findIndex(propEq('id', notificationId), notifications);

          if (index > -1) {
            const notification = notifications[index];

            if (!notification.seenAt) {
              draft.stores[storeId].unseenCount = Math.max(0, unseenCount - 1);
              draft.stores[storeId].notifications[index] = mergeRight(notifications[index], {
                seenAt: Date.now() / 1000,
              });
            }
          }
        }
      }),
    );
  },

  markNotificationAsRead: (notification: IRemoteNotification) => {
    const { stores, _repository } = get();
    const { id: notificationId } = notification;
    const promise = _repository.markAsRead(notificationId);
    emitEvent('notifications.read', notification, 'local');

    set(
      produce<INotificationsStoresCollection>((draft) => {
        const now = Date.now() / 1000;
        const attrs = { readAt: now, seenAt: now };

        for (const storeId in stores) {
          const { total, notifications, context, unreadCount, unseenCount } = stores[storeId];
          const index = findIndex(propEq('id', notificationId), notifications);

          if (index > -1) {
            // Decrease the counters if the notification wasn't already read|seen, and clamp to zero as it might happen
            // that markAsSeen has set the counter to zero, while the notification.seenAt is still undefined
            if (!notification.readAt) draft.stores[storeId].unreadCount = Math.max(0, unreadCount - 1);
            if (!notification.seenAt) draft.stores[storeId].unseenCount = Math.max(0, unseenCount - 1);

            const readNotification = mergeRight(notifications[index], attrs);
            if (objMatchesContext(readNotification, context).result) {
              // Update the store
              draft.stores[storeId].notifications[index] = readNotification;
            } else {
              // Remove notification from the store
              draft.stores[storeId].total = Math.max(0, total - 1);
              draft.stores[storeId].notifications.splice(index, 1);
            }
          } else {
            const readNotification = mergeRight(notification, attrs);
            if (objMatchesContext(readNotification, context).result) {
              // Add the notification to the store
              draft.stores[storeId].total += 1;
              draft.stores[storeId].notifications.push(readNotification);
            }
          }
        }
      }),
    );

    return promise;
  },

  markNotificationAsUnread: (notification: IRemoteNotification) => {
    const { stores, _repository } = get();
    const { id: notificationId } = notification;
    const promise = _repository.markAsUnread(notificationId);
    emitEvent('notifications.unread', notification, 'local');

    set(
      produce<INotificationsStoresCollection>((draft) => {
        const attrs = { readAt: null };

        for (const storeId in stores) {
          const { notifications, context } = stores[storeId];
          const index = findIndex(propEq('id', notificationId), notifications);

          if (index > -1) {
            const unreadNotification = mergeRight(notifications[index], attrs);
            if (objMatchesContext(unreadNotification, context).result) {
              // Update the store
              if (notification.readAt) draft.stores[storeId].unreadCount += 1;
              draft.stores[storeId].notifications[index] = unreadNotification;
            } else {
              // Remove notification from the store
              draft.stores[storeId].total = Math.max(0, draft.stores[storeId].total - 1);
              draft.stores[storeId].notifications.splice(index, 1);
            }
          } else {
            const unreadNotification = mergeRight(notification, attrs);
            if (objMatchesContext(unreadNotification, context).result) {
              // Add the notification to the store
              draft.stores[storeId].total += 1;
              if (notification.readAt) draft.stores[storeId].unreadCount += 1;
              draft.stores[storeId].notifications.push(unreadNotification);
            }
          }
        }
      }),
    );

    return promise;
  },

  deleteNotification: (notification: IRemoteNotification, options = {}) => {
    const { stores, _repository } = get();
    const notificationId = notification.id;
    let promise = Promise.resolve(true);

    // Do not persist the state is this op is a consequence of a remote event.
    // Neither emit a local event.
    if (options.persist !== false) {
      promise = _repository.delete(notificationId);
      emitEvent('notifications.delete', notification, 'local');
    }

    set(
      produce<INotificationsStoresCollection>((draft) => {
        for (const storeId in stores) {
          const { notifications, total, unseenCount, unreadCount } = stores[storeId];
          const index = findIndex(propEq('id', notificationId), notifications);

          if (index > -1) {
            const notification = notifications[index];

            if (!notification.seenAt) draft.stores[storeId].unseenCount = Math.max(0, unseenCount - 1);
            if (!notification.readAt) draft.stores[storeId].unreadCount = Math.max(0, unreadCount - 1);

            draft.stores[storeId].total = Math.max(0, total - 1);
            draft.stores[storeId].notifications.splice(index, 1);
          }
        }
      }),
    );

    return promise;
  },

  markAllAsSeen: (options = { persist: true, updateModels: true }) => {
    const { stores, _repository } = get();
    let promise = Promise.resolve(true);

    // Do not persist the state is this op is a consequence of a remote event.
    // Neither emit a local event.
    if (options.persist !== false) {
      const params = options.storeId ? stores[options.storeId]?.context : {};
      promise = _repository.markAllAsSeen(params);
      emitEvent('notifications.seen.all', null, 'local');
    }

    set(
      produce<INotificationsStoresCollection>((draft) => {
        for (const storeId in stores) {
          const { notifications } = stores[storeId];

          draft.stores[storeId].unseenCount = 0;

          if (options.updateModels !== false) {
            notifications.forEach((notification, index) => {
              draft.stores[storeId].notifications[index] = mergeRight(notification, { seenAt: Date.now() / 1000 });
            });
          }
        }
      }),
    );

    return promise;
  },

  markAllAsRead: (options = { persist: true, updateModels: true }) => {
    const { stores, _repository } = get();
    let promise = Promise.resolve(true);

    // Do not persist the state if this op is a consequence of a remote event.
    // Neither emit a local event.
    if (options.persist !== false) {
      const params = options.storeId ? stores[options.storeId]?.context : {};
      promise = _repository.markAllAsRead(params);
      emitEvent('notifications.read.all', null, 'local');
    }

    set(
      produce<INotificationsStoresCollection>((draft) => {
        const changedNotifications = new Map();
        const now = Date.now() / 1000;

        for (const storeId in stores) {
          const { context } = stores[storeId];

          draft.stores[storeId].unreadCount = 0;
          draft.stores[storeId].unseenCount = 0;

          if (options.updateModels === false) continue;

          // don't iterate over notifications in stores that only hold read notifications
          if (context.read !== true) {
            for (const notification of draft.stores[storeId].notifications) {
              // don't change notifications that are already read
              if (notification.readAt) continue;

              notification.readAt = now;
              notification.seenAt = now;
              changedNotifications.set(notification.id, notification);
            }
          }

          // stores that don't include read notifications, can be flushed
          if (context.read === false) {
            draft.stores[storeId].notifications = [];
            draft.stores[storeId].total = 0;
          }
        }

        // do a second run to add changed notifications to stores that didn't hold unread notifications
        for (const storeId in stores) {
          const { context } = stores[storeId];

          // skip stores that already contain the notification
          if (context.read !== true) continue;

          const notifications = draft.stores[storeId].notifications;
          for (const notification of changedNotifications.values()) {
            if (
              objMatchesContext(notification, context).result &&
              !notifications.find((n) => n.id === notification.id)
            ) {
              notifications.push(notification);
              draft.stores[storeId].total += 1;
            }
          }
        }
      }),
    );

    return promise;
  },
}));

export default useNotificationStoresCollection;
