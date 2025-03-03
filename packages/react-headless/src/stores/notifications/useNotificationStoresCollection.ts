import { produce } from 'immer';
import { findIndex, mergeRight, propEq } from 'ramda';
import { create } from 'zustand';

import { emitEvent } from '../../lib/realtime.js';
import { INotificationsStoresCollection, INotificationStore, IRemoteNotification } from '../../types/index.js';
import buildStore from './helpers/buildStore.js';
import setStoreProps from './helpers/setStoreProps.js';
import { objMatchesContext } from './helpers/strategies.js';
import NotificationRepository from './NotificationRepository.js';

function unix() {
  return Math.floor(Date.now() / 1000);
}

function addToStore(store: INotificationStore, notification: IRemoteNotification) {
  store.total += 1;
  const idx = store.notifications.findIndex((n) => n.sentAt < notification.sentAt);
  if (idx === -1) {
    store.notifications.push(notification);
  } else {
    store.notifications.splice(idx, 0, notification);
  }
}

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
                seenAt: unix(),
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
        const now = unix();
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
              addToStore(draft.stores[storeId], readNotification);
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
              addToStore(draft.stores[storeId], unreadNotification);
              if (notification.readAt) draft.stores[storeId].unreadCount += 1;
            }
          }
        }
      }),
    );

    return promise;
  },

  archiveNotification: (notification, options = {}) => {
    const { stores, _repository } = get();
    const { id: notificationId } = notification;

    let promise = Promise.resolve(true);

    // Do not persist the state if this op is a consequence of a remote event.
    if (options.persist !== false) {
      promise = _repository.archive(notificationId);
      emitEvent('notifications.archived', notification, 'local');
    }

    set(
      produce<INotificationsStoresCollection>((draft) => {
        const now = unix();
        const attrs = { archivedAt: now };

        for (const storeId in stores) {
          const store = stores[storeId];
          const index = findIndex(propEq('id', notificationId), store.notifications);

          if (index > -1) {
            const newNotification = { ...store.notifications[index], ...attrs };
            if (objMatchesContext(newNotification, store.context).result) {
              // Update the store
              draft.stores[storeId].notifications[index] = newNotification;
            } else {
              // Decrease the counters if the notification was included in it, and clamp to zero
              if (!notification.readAt) draft.stores[storeId].unreadCount = Math.max(0, store.unreadCount - 1);
              if (!notification.seenAt) draft.stores[storeId].unseenCount = Math.max(0, store.unseenCount - 1);

              // Remove notification from the store
              draft.stores[storeId].total = Math.max(0, store.total - 1);
              draft.stores[storeId].notifications.splice(index, 1);
            }
          } else {
            const newNotification = { ...notification, ...attrs };
            if (objMatchesContext(newNotification, store.context).result) {
              // Add the notification to the store
              if (!notification.readAt) draft.stores[storeId].unreadCount += 1;
              if (!notification.seenAt) draft.stores[storeId].unseenCount += 1;
              addToStore(draft.stores[storeId], newNotification);
            }
          }
        }
      }),
    );

    return promise;
  },

  unarchiveNotification: (notification, options = {}) => {
    const { stores, _repository } = get();
    const { id: notificationId } = notification;
    let promise = Promise.resolve(true);

    // Do not persist the state if this op is a consequence of a remote event.
    if (options.persist !== false) {
      promise = _repository.unarchive(notificationId);
      emitEvent('notifications.unarchived', notification, 'local');
    }

    set(
      produce<INotificationsStoresCollection>((draft) => {
        const attrs = { archivedAt: null };

        for (const storeId in stores) {
          const store = stores[storeId];
          const index = findIndex(propEq('id', notificationId), store.notifications);

          if (index > -1) {
            const newNotification = { ...store.notifications[index], ...attrs };
            if (objMatchesContext(newNotification, store.context).result) {
              draft.stores[storeId].notifications[index] = newNotification;
            } else {
              // Remove notification from the store
              if (!notification.readAt) draft.stores[storeId].unreadCount = Math.max(0, store.unreadCount - 1);
              if (!notification.seenAt) draft.stores[storeId].unseenCount = Math.max(0, store.unseenCount - 1);

              draft.stores[storeId].total = Math.max(0, store.total - 1);
              draft.stores[storeId].notifications.splice(index, 1);
            }
          } else {
            const newNotification = { ...notification, ...attrs };
            if (objMatchesContext(newNotification, store.context).result) {
              // Add the notification to the store
              if (!notification.readAt) draft.stores[storeId].unreadCount += 1;
              if (!notification.seenAt) draft.stores[storeId].unseenCount += 1;
              addToStore(draft.stores[storeId], newNotification);
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

    // Do not persist the state if this op is a consequence of a remote event.
    // Neither emit a local event.
    if (options.persist !== false) {
      const params = options.storeId ? stores[options.storeId]?.context : {};
      promise = _repository.markAllAsSeen(params);
      emitEvent('notifications.seen.all', null, 'local');
    }

    set(
      produce<INotificationsStoresCollection>((draft) => {
        const changedNotifications = new Map();
        const now = unix();

        for (const storeId in stores) {
          const { context } = stores[storeId];

          draft.stores[storeId].unseenCount = 0;

          if (options.updateModels === false) continue;

          // don't iterate over notifications in stores that only hold seen notifications
          if (context.seen !== true) {
            for (const notification of draft.stores[storeId].notifications) {
              // don't change notifications that are already seen
              if (notification.seenAt) continue;

              notification.seenAt = now;
              changedNotifications.set(notification.id, notification);
            }
          }

          // stores that don't include seen notifications, can be flushed
          if (context.seen === false) {
            draft.stores[storeId].notifications = [];
            draft.stores[storeId].total = 0;
          }
        }

        // do a second pass to update the notifications in the stores that don't hold seen notifications
        for (const storeId in stores) {
          const { context } = stores[storeId];
          // skip stores that already hold seen notifications
          if (context.seen !== true) continue;

          const notifications = draft.stores[storeId].notifications;
          for (const notification of changedNotifications.values()) {
            if (
              objMatchesContext(notification, context).result &&
              !notifications.find((n) => n.id === notification.id)
            ) {
              addToStore(draft.stores[storeId], notification);
            }
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
        const now = unix();

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
              addToStore(draft.stores[storeId], notification);
            }
          }
        }
      }),
    );

    return promise;
  },
}));

export default useNotificationStoresCollection;
