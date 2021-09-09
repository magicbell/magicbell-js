import produce from 'immer';
import { findIndex, merge as setProp, propEq } from 'ramda';
import create from 'zustand';
import INotificationsStore from '../../types/INotificationsStore';
import INotificationsStoresCollection from '../../types/INotificationsStoresCollection';
import buildStore from './helpers/buildStore';
import setStoreProps from './helpers/setStoreProps';
import NotificationRepository from './NotificationRepository';

/**
 * Collection of notifications store. It contains all stores of notifications
 * and exposes methods to interact with them.
 *
 * @private Use the `useNotifications` hook instead.
 */
const useNotificationsStoresCollection = create<INotificationsStoresCollection>((set, get) => ({
  stores: {},
  _repository: new NotificationRepository(),

  setStore: (storeId, defaultQueryParams = {}, otherProps: Partial<INotificationsStore> = {}) => {
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
      throw new Error(`Store not found. Define a store with the ${storeId} ID`);
    }
  },

  fetchAllStores: async (queryParams = {}, options = {}) => {
    const { stores, fetchStore } = get();
    for (const storeId in stores) {
      fetchStore(storeId, queryParams, options);
    }
  },

  markNotificationAsSeen: (notificationId: string) => {
    const { stores } = get();

    set(
      produce<INotificationsStoresCollection>((draft) => {
        for (const storeId in stores) {
          const { notifications, unseenCount } = stores[storeId];
          const index = findIndex(propEq('id', notificationId), notifications);

          if (index > -1) {
            const notification = notifications[index];

            if (!notification.seenAt) {
              draft.stores[storeId].unseenCount = Math.max(0, unseenCount - 1);
              draft.stores[storeId].notifications[index] = setProp(notifications[index], {
                seenAt: Date.now() / 1000,
              });
            }
          }
        }
      }),
    );
  },

  markNotificationAsRead: (notificationId: string) => {
    const { stores, _repository } = get();
    const promise = _repository.markAsRead(notificationId);

    set(
      produce<INotificationsStoresCollection>((draft) => {
        for (const storeId in stores) {
          const { notifications, unreadCount } = stores[storeId];
          const index = findIndex(propEq('id', notificationId), notifications);

          if (index > -1) {
            draft.stores[storeId].unreadCount = Math.max(0, unreadCount - 1);
            draft.stores[storeId].notifications[index] = setProp(notifications[index], {
              readAt: Date.now() / 1000,
            });
          }
        }
      }),
    );

    return promise;
  },

  markNotificationAsUnread: (notificationId: string) => {
    const { stores, _repository } = get();
    const promise = _repository.markAsUnread(notificationId);

    set(
      produce<INotificationsStoresCollection>((draft) => {
        for (const storeId in stores) {
          const { notifications, unreadCount } = stores[storeId];
          const index = findIndex(propEq('id', notificationId), notifications);

          if (index > -1) {
            draft.stores[storeId].unreadCount = unreadCount + 1;
            draft.stores[storeId].notifications[index] = setProp(notifications[index], { readAt: null });
          }
        }
      }),
    );

    return promise;
  },

  deleteNotification: (notificationId: string, options = {}) => {
    const { stores, _repository } = get();
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
              draft.stores[storeId].notifications[index] = setProp(notification, { seenAt: Date.now() / 1000 });
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
              draft.stores[storeId].notifications[index] = setProp(notification, { readAt: Date.now() / 1000 });
            });
          }
        }
      }),
    );

    return promise;
  },
}));

export default useNotificationsStoresCollection;
