import produce from 'immer';
import findIndex from 'ramda/src/findIndex';
import mergeRight from 'ramda/src/mergeRight';
import propEq from 'ramda/src/propEq';
import create from 'zustand';
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

      set(
        produce<INotificationsStoresCollection>((draft) => {
          draft.stores[storeId] = setStoreProps(store, { ...response, lastFetchedAt: new Date() }, options);
        }),
      );
    } else {
      console.error(`Store not found. Define a store with the ${storeId} ID`);
    }
  },

  fetchAllStores: async (queryParams = {}, options = {}) => {
    const { stores, fetchStore } = get();
    for (const storeId in stores) {
      fetchStore(storeId, queryParams, options);
    }
  },

  markNotificationAsSeen: (notification: IRemoteNotification) => {
    const { stores } = get();
    const notificationId = notification.id;

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

    set(
      produce<INotificationsStoresCollection>((draft) => {
        const attrs = { readAt: Date.now() / 1000 };

        for (const storeId in stores) {
          const { total, notifications, unreadCount, context } = stores[storeId];
          const index = findIndex(propEq('id', notificationId), notifications);

          if (index > -1) {
            draft.stores[storeId].unreadCount = Math.max(0, unreadCount - 1);

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

    set(
      produce<INotificationsStoresCollection>((draft) => {
        const attrs = { readAt: null };

        for (const storeId in stores) {
          const { total, notifications, context } = stores[storeId];
          const index = findIndex(propEq('id', notificationId), notifications);

          if (index > -1) {
            const unreadNotification = mergeRight(notifications[index], attrs);
            if (objMatchesContext(unreadNotification, context).result) {
              // Update the store
              draft.stores[storeId].unreadCount += 1;
              draft.stores[storeId].notifications[index] = unreadNotification;
            } else {
              // Remove notification from the store
              draft.stores[storeId].total -= Math.max(0, total - 1);
              draft.stores[storeId].notifications.splice(index, 1);
            }
          } else {
            const unreadNotification = mergeRight(notification, attrs);
            if (objMatchesContext(unreadNotification, context).result) {
              // Add the notification to the store
              draft.stores[storeId].total += 1;
              draft.stores[storeId].unreadCount += 1;
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
    const promise = options.persist === false ? Promise.resolve(true) : _repository.delete(notificationId);

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
    const promise = options.persist !== false ? _repository.markAllAsSeen() : Promise.resolve(true);

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
    const promise = options.persist !== false ? _repository.markAllAsRead() : Promise.resolve(true);

    set(
      produce<INotificationsStoresCollection>((draft) => {
        for (const storeId in stores) {
          const { notifications } = stores[storeId];

          draft.stores[storeId].unreadCount = 0;

          if (options.updateModels !== false) {
            notifications.forEach((notification, index) => {
              draft.stores[storeId].notifications[index] = mergeRight(notification, { readAt: Date.now() / 1000 });
            });
          }
        }
      }),
    );

    return promise;
  },
}));

export default useNotificationStoresCollection;
