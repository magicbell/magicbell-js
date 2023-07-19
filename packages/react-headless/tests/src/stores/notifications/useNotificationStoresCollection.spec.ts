import faker from '@faker-js/faker';
import { fake, setupMockServer } from '@magicbell/utils';
import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import dayjs from 'dayjs';
import { beforeEach, vi } from 'vitest';

import { useNotification } from '../../../../src';
import useNotifications from '../../../../src/hooks/useNotifications';
import * as ajax from '../../../../src/lib/ajax';
import { eventAggregator } from '../../../../src/lib/realtime';
import clientSettings from '../../../../src/stores/clientSettings';
import { useNotificationStoresCollection } from '../../../../src/stores/notifications';
import NotificationFactory from '../../../factories/NotificationFactory';

const fiveSecondsAgo = () => Math.floor(Date.now() / 1_000) - 5_000;

const server = setupMockServer();

beforeEach(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });
});

describe('useNotificationStoresCollection', () => {
  it('.setStore builds a store and sets it', () => {
    const { result } = renderHook(() => useNotificationStoresCollection());
    act(() => result.current.setStore('is-read', { read: true }));

    expect(result.current.stores['is-read']).toEqual({
      context: { read: true },
      total: 0,
      totalPages: 0,
      perPage: 0,
      currentPage: 1,
      unreadCount: 0,
      unseenCount: 0,
      notifications: [],
    });
  });

  describe('.fetchStore', () => {
    describe('.fetchStore successful response', () => {
      it('.fetchStore fetches a store from the MagicBell server', async () => {
        const status = server.intercept('get', '/notifications', {
          ...fake.notificationPage,
          notifications: [fake.notification],
        });

        const { result } = renderHook(() => useNotificationStoresCollection());

        await act(async () => {
          await result.current.setStore('default', { read: false });
          await result.current.fetchStore('default', { page: 2 });
        });

        expect(status.handledRequests).toEqual(1);
        expect(status.lastRequest.url.pathname).toEqual('/notifications');
        expect(status.lastRequest.url.searchParams.get('read')).toEqual('false');
        expect(status.lastRequest.url.searchParams.get('page')).toEqual('2');
      });

      it('updates the store with the response', async () => {
        server.intercept('get', '/notifications', {
          ...fake.notificationPage,
          current_page: 2,
          per_page: 4,
          total_pages: 2,
          total: 8,
          notifications: [fake.notification],
          unreadCount: 2,
          unseenCount: 3,
        });

        const { result } = renderHook(() => useNotificationStoresCollection());

        await act(async () => {
          await result.current.setStore('default', { read: true });
          await result.current.fetchStore('default', { page: 2 });
        });

        expect(result.current.stores['default']).toMatchObject({
          context: { read: true },
          currentPage: 2,
          perPage: 4,
          totalPages: 2,
          total: 8,
          projectId: 7,
          unseenCount: 3,
          unreadCount: 2,
        });
      });

      it('merges notifications', async () => {
        server.intercept('get', '/notifications', {
          ...fake.notificationPage,
          notifications: [fake.notification],
        });

        const notifications = NotificationFactory.buildList(4);
        const { result } = renderHook(() => useNotificationStoresCollection());

        await act(async () => {
          await result.current.setStore('default', { read: true }, { notifications });
          await result.current.fetchStore('default', { page: 2 });
        });

        expect(result.current.stores['default'].notifications).toHaveLength(5);
        expect(result.current.stores['default'].notifications[0]).toEqual(notifications[0]);
        expect(result.current.stores['default'].notifications[1]).toEqual(notifications[1]);
        expect(result.current.stores['default'].notifications[2]).toEqual(notifications[2]);
        expect(result.current.stores['default'].notifications[3]).toEqual(notifications[3]);
      });

      it('sets the fetch timestamp for the store', async () => {
        const { result } = renderHook(() => useNotificationStoresCollection());
        const storeId = faker.datatype.uuid();

        await act(async () => {
          await result.current.setStore(storeId, {});
          await result.current.fetchStore(storeId, { page: 2 });
        });

        const updatedAt = new Date(result.current.stores[storeId].lastFetchedAt).getTime();
        expect(updatedAt).toBeGreaterThan(fiveSecondsAgo());
      });

      test('toggling read state correctly updates depended (split-inbox) stores', async () => {
        const initialReadCount = 3;
        const initialUnreadCount = 4;

        const notifications = {
          read: Array.from({ length: initialReadCount }).map((_, idx) => ({
            ...fake.notification,
            id: `read-${idx}`,
            readAt: Date.now() / 1000,
            seenAt: Date.now() / 1000,
          })),
          unread: Array.from({ length: initialUnreadCount }).map((_, idx) => ({
            ...fake.notification,
            id: `-unread-${idx}`,
            readAt: null,
            seenAt: null,
          })),
        };

        server.intercept('post', '/notifications/:id/read', { status: 204 });
        server.intercept('post', '/notifications/:id/unread', { status: 204 });

        server.intercept('get', '/notifications', (req) => {
          const storeId = req.url.searchParams.get('read') === 'true' ? 'read' : 'unread';
          return {
            total: notifications[storeId].length,
            unreadCount: storeId === 'read' ? 0 : notifications[storeId].length,
            unseenCount: storeId === 'read' ? 0 : notifications[storeId].length,
            notifications: notifications[storeId],
          };
        });

        const { result } = renderHook(() => useNotificationStoresCollection());

        await act(async () => {
          result.current.setStore('read', { read: true });
          result.current.setStore('unread', { read: false });
          await result.current.fetchAllStores();
        });

        const stores = renderHook(() => ({
          read: useNotifications('read'),
          unread: useNotifications('unread'),
        })).result;

        // Verify initial state,
        expect(stores.current).toHaveProperty('read.total', initialReadCount);
        expect(stores.current).toHaveProperty('read.unreadCount', 0);
        expect(stores.current).toHaveProperty('read.unseenCount', 0);
        expect(stores.current).toHaveProperty('unread.total', initialUnreadCount);
        expect(stores.current).toHaveProperty('unread.unreadCount', initialUnreadCount);
        expect(stores.current).toHaveProperty('unread.unseenCount', initialUnreadCount);

        // mark one unread notification as read
        let notification = stores.current.unread!.notifications[0];
        const unread = renderHook(() => useNotification(notification)).result.current;
        await act(() => unread.markAsRead());

        await waitFor(() => expect(stores.current.read.total).toEqual(4));

        // verify state when one notification moves from unread > read
        expect(stores.current).toHaveProperty('read.total', initialReadCount + 1);
        expect(stores.current).toHaveProperty('read.unreadCount', 0);
        expect(stores.current).toHaveProperty('read.unseenCount', 0);
        expect(stores.current).toHaveProperty('unread.total', initialUnreadCount - 1);
        expect(stores.current).toHaveProperty('unread.unreadCount', initialUnreadCount - 1);
        expect(stores.current).toHaveProperty('unread.unseenCount', initialUnreadCount - 1);

        // mark same notification as read again
        notification = stores.current.read!.notifications.find((x) => x.id === notification.id)!;
        const reread = renderHook(() => useNotification(notification)).result.current;
        await act(async () => void (await reread.markAsRead()));

        // verify that things haven't changed
        expect(stores.current).toHaveProperty('read.total', initialReadCount + 1);
        expect(stores.current).toHaveProperty('read.unreadCount', 0);
        expect(stores.current).toHaveProperty('read.unseenCount', 0);
        expect(stores.current).toHaveProperty('unread.total', initialUnreadCount - 1);
        expect(stores.current).toHaveProperty('unread.unreadCount', initialUnreadCount - 1);
        expect(stores.current).toHaveProperty('unread.unseenCount', initialUnreadCount - 1);

        // mark one read notification as unread
        notification = stores.current.read!.notifications.find((x) => x.id === notification.id)!;
        const read = renderHook(() => useNotification(notification)).result.current;
        await act(async () => void (await read.markAsUnread()));

        // verify state when one notification moves from read > unread, and not to unseen
        expect(stores.current).toHaveProperty('read.total', initialReadCount);
        expect(stores.current).toHaveProperty('read.unreadCount', 0);
        expect(stores.current).toHaveProperty('read.unseenCount', 0);
        expect(stores.current).toHaveProperty('unread.total', initialUnreadCount);
        expect(stores.current).toHaveProperty('unread.unreadCount', initialUnreadCount);
        expect(stores.current).toHaveProperty('unread.unseenCount', initialUnreadCount - 1);

        // mark same notification as unread again
        notification = stores.current.unread!.notifications.find((x) => x.id === notification.id)!;
        const repeat = renderHook(() => useNotification(notification)).result.current;
        await act(async () => void (await repeat.markAsUnread()));

        // verify that things haven't changed
        expect(stores.current).toHaveProperty('read.total', initialReadCount);
        expect(stores.current).toHaveProperty('read.unreadCount', 0);
        expect(stores.current).toHaveProperty('read.unseenCount', 0);
        expect(stores.current).toHaveProperty('unread.total', initialUnreadCount);
        expect(stores.current).toHaveProperty('unread.unreadCount', initialUnreadCount);
        expect(stores.current).toHaveProperty('unread.unseenCount', initialUnreadCount - 1);
      });

      test('markAsRead also marks a notification as seen', async () => {
        const notifications = Array.from({ length: 4 }).map((_, i) => ({
          ...fake.notification,
          readAt: null,
          seenAt: null,
          id: `${i}`,
        }));

        server.intercept('get', '/notifications', {
          total: notifications.length,
          unreadCount: notifications.length,
          notifications: notifications,
        });

        const { result } = renderHook(() => useNotificationStoresCollection());

        await act(async () => {
          result.current.setStore('default');
          await result.current.fetchAllStores();
        });

        const store = renderHook(() => useNotifications()).result;

        // Verify initial state,
        expect(store.current).toHaveProperty('total', 4);
        expect(store.current).toHaveProperty('unreadCount', 4);

        const notification = renderHook(() => useNotification(store.current!.notifications[0])).result;
        expect(notification.current).toHaveProperty('readAt', null);
        expect(notification.current).toHaveProperty('seenAt', null);

        // mark as read
        await act(async () => void (await notification.current.markAsRead()));
        expect(notification.current).toHaveProperty('readAt', expect.anything());
        expect(notification.current).toHaveProperty('seenAt', expect.anything());
      });

      test('markAsRead does not change unseenCount when notification was already seen', async () => {
        const notifications = Array.from({ length: 4 }).map((_, i) => ({
          ...fake.notification,
          readAt: null,
          seenAt: Date.now() / 1000,
          id: `${i}`,
        }));

        server.intercept('get', '/notifications', {
          total: notifications.length,
          unreadCount: notifications.filter((x) => !x.readAt).length,
          unseenCount: notifications.filter((x) => !x.seenAt).length,
          notifications: notifications,
        });

        const { result } = renderHook(() => useNotificationStoresCollection());

        await act(async () => {
          result.current.setStore('default');
          await result.current.fetchAllStores();
        });

        const store = renderHook(() => useNotifications()).result;

        // Verify initial state,
        expect(store.current).toHaveProperty('total', 4);
        expect(store.current).toHaveProperty('unreadCount', 4);
        expect(store.current).toHaveProperty('unseenCount', 0);

        const notification = renderHook(() => useNotification(store.current!.notifications[0])).result;
        expect(notification.current).toHaveProperty('readAt', null);
        expect(notification.current).toHaveProperty('seenAt', expect.anything());

        // mark as read
        await act(async () => void (await notification.current.markAsRead()));
        expect(notification.current).toHaveProperty('readAt', expect.anything());
        expect(notification.current).toHaveProperty('seenAt', expect.anything());

        // verify store
        expect(store.current).toHaveProperty('total', 4);
        expect(store.current).toHaveProperty('unreadCount', 3);
        expect(store.current).toHaveProperty('unseenCount', 0);
      });

      test('markAsSeen does not mark notification as read', async () => {
        const notifications = Array.from({ length: 4 }).map((_, i) => ({
          ...fake.notification,
          readAt: null,
          seenAt: null,
          id: `${i}`,
        }));

        server.intercept('get', '/notifications', {
          total: notifications.length,
          unreadCount: notifications.length,
          notifications: notifications,
        });

        const { result } = renderHook(() => useNotificationStoresCollection());

        await act(async () => {
          result.current.setStore('default');
          await result.current.fetchAllStores();
        });

        const store = renderHook(() => useNotifications()).result;
        const notification = renderHook(() => useNotification(store.current!.notifications[0])).result;

        // Verify initial state,
        expect(notification.current).toHaveProperty('readAt', null);
        expect(notification.current).toHaveProperty('seenAt', null);

        // mark as seen
        act(() => notification.current.markAsSeen());
        expect(notification.current).toHaveProperty('readAt', null);
        expect(notification.current).toHaveProperty('seenAt', expect.anything());
      });

      test('markAllAsRead also marks all notifications as seen', async () => {
        const notifications = Array.from({ length: 4 }).map((_, i) => ({
          ...fake.notification,
          readAt: null,
          seenAt: null,
          id: `${i}`,
        }));

        server.intercept('get', '/notifications', {
          total: notifications.length,
          unreadCount: notifications.length,
          notifications: notifications,
        });

        const { result } = renderHook(() => useNotificationStoresCollection());

        await act(async () => {
          result.current.setStore('default');
          await result.current.fetchAllStores();
        });

        const store = renderHook(() => useNotifications()).result;

        // Verify initial state,
        expect(store.current).toHaveProperty('total', 4);
        expect(store.current).toHaveProperty('unreadCount', 4);

        for (let idx = 0; idx < store.current!.notifications.length; idx++) {
          expect(store.current).toHaveProperty(`notifications.${idx}.readAt`, null);
          expect(store.current).toHaveProperty(`notifications.${idx}.seenAt`, null);
        }

        // mark as read
        await act(async () => void (await store.current!.markAllAsRead()));
        for (let idx = 0; idx < store.current!.notifications.length; idx++) {
          expect(store.current).toHaveProperty(`notifications.${idx}.readAt`, expect.anything());
          expect(store.current).toHaveProperty(`notifications.${idx}.seenAt`, expect.anything());
        }
      });

      test('markAllAsSeen does not mark notifications as read', async () => {
        const notifications = Array.from({ length: 4 }).map((_, i) => ({
          ...fake.notification,
          readAt: null,
          seenAt: null,
          id: `${i}`,
        }));

        server.intercept('get', '/notifications', {
          total: notifications.length,
          unreadCount: notifications.length,
          notifications: notifications,
        });

        const { result } = renderHook(() => useNotificationStoresCollection());

        await act(async () => {
          result.current.setStore('default');
          await result.current.fetchAllStores();
        });

        const store = renderHook(() => useNotifications()).result;

        // Verify initial state,
        expect(store.current).toHaveProperty('total', 4);
        expect(store.current).toHaveProperty('unreadCount', 4);

        for (let idx = 0; idx < store.current!.notifications.length; idx++) {
          expect(store.current).toHaveProperty(`notifications.${idx}.readAt`, null);
          expect(store.current).toHaveProperty(`notifications.${idx}.seenAt`, null);
        }

        // mark as seen
        await act(async () => void (await store.current!.markAllAsSeen()));
        for (let idx = 0; idx < store.current!.notifications.length; idx++) {
          expect(store.current).toHaveProperty(`notifications.${idx}.readAt`, null);
          expect(store.current).toHaveProperty(`notifications.${idx}.seenAt`, expect.any(Number));
        }
      });
    });

    it('throws an error', async () => {
      server.intercept('get', '/notifications', { status: 403 });

      const { result } = renderHook(() => useNotificationStoresCollection());
      result.current.setStore('default', {});

      await expect(result.current.fetchStore('default')).rejects.toThrow('Request failed with status code 403');
    });
  });

  describe('.markNotificationAsSeen', () => {
    const notification = NotificationFactory.build({ seenAt: null });

    it('decreases the unseenCount prop of the store', async () => {
      const notifications = [...NotificationFactory.buildList(2), notification];
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications, unreadCount: 1 });
        await result.current.markNotificationAsSeen(notification);
      });

      expect(result.current.stores['default'].unseenCount).toEqual(0);
    });

    it('marks the notification as seen', async () => {
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [notification] });
        await result.current.markNotificationAsSeen(notification);
      });

      expect(result.current.stores['default'].notifications[0].seenAt).toBeGreaterThan(fiveSecondsAgo());
    });

    it('emits the "notifications.seen" event', async () => {
      const spy = vi.spyOn(eventAggregator, 'emit');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [notification] });
        await result.current.markNotificationAsSeen(notification);
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('notifications.seen', { data: notification, source: 'local' });
      spy.mockRestore();
    });
  });

  describe('.markNotificationAsRead', () => {
    it('.markNotificationAsRead decreases the unreadCount prop of the store', async () => {
      server.intercept('post', '/notifications/:id/read', { status: 204 });

      const notifications = Array.from({ length: 2 }).map((_, i) => ({
        ...fake.notification,
        readAt: null,
        id: `${i}`,
      }));

      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications, unreadCount: 1 });
        await result.current.markNotificationAsRead(notifications[0]);
      });

      expect(result.current.stores['default'].unreadCount).toEqual(0);
    });

    it('marks the notification as read', async () => {
      server.intercept('post', '/notifications/:id/read', { status: 204 });
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [fake.notification] });
        await result.current.markNotificationAsRead(fake.notification);
      });

      expect(result.current.stores['default'].notifications[0].readAt).toBeGreaterThan(fiveSecondsAgo());
    });

    it('emits the "notifications.read" event', async () => {
      const spy = vi.spyOn(eventAggregator, 'emit');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [fake.notification] });
        await result.current.markNotificationAsRead(fake.notification);
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('notifications.read', { data: fake.notification, source: 'local' });
      spy.mockRestore();
    });
  });

  describe('.markNotificationAsUnread', () => {
    const notification = NotificationFactory.build({ readAt: dayjs() });

    it('increases the unreadCount prop of the store', async () => {
      const notification = { ...fake.notification, readAt: Date.now() };
      server.intercept('post', '/notifications/:id/unread', { status: 204 });

      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [notification], unreadCount: 1 });
        await result.current.markNotificationAsUnread(notification);
      });

      expect(result.current.stores['default'].unreadCount).toEqual(2);
    });

    it('marks the notification as read', async () => {
      const notification = { ...fake.notification, readAt: Date.now() };
      server.intercept('post', '/notifications/:id/unread', { status: 204 });

      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [notification] });
        await result.current.markNotificationAsUnread(notification);
      });

      expect(result.current.stores['default'].notifications[0].readAt).toBeNull();
    });

    it('emits the "notifications.unread" event', async () => {
      const spy = vi.spyOn(eventAggregator, 'emit');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [notification] });
        await result.current.markNotificationAsUnread(notification);
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('notifications.unread', { data: notification, source: 'local' });
      spy.mockRestore();
    });
  });

  describe('.deleteNotification', () => {
    it('decreases the unreadCount prop of the store', async () => {
      server.intercept('delete', '/notifications/:id', { status: 204 });

      const { result } = renderHook(() => useNotificationStoresCollection());
      const notifications = [{ ...fake.notification, readAt: null }];

      await act(async () => {
        result.current.setStore('default', {}, { notifications, unreadCount: 1 });
        await result.current.deleteNotification(fake.notification);
      });

      expect(result.current.stores['default'].unreadCount).toEqual(0);
    });

    it('does not change the unreadCount prop of the store', async () => {
      server.intercept('delete', '/notifications/:id', { status: 204 });

      const { result } = renderHook(() => useNotificationStoresCollection());
      const notifications = [{ ...fake.notification, readAt: Date.now() }];

      await act(async () => {
        result.current.setStore('default', {}, { notifications, unreadCount: 1 });
        await result.current.deleteNotification(notifications[0]);
      });

      expect(result.current.stores['default'].unreadCount).toEqual(1);
    });

    it('decreases the total prop of the store', async () => {
      server.intercept('delete', '/notifications/:id', { status: 204 });

      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [fake.notification], total: 1 });
        await result.current.deleteNotification(fake.notification);
      });

      expect(result.current.stores['default'].total).toEqual(0);
    });

    it('removes the notification from the store', async () => {
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [fake.notification] });
        await result.current.deleteNotification(fake.notification);
      });

      expect(result.current.stores['default'].notifications).toHaveLength(0);
    });

    it('emits the "notifications.deleted" event', async () => {
      const spy = vi.spyOn(eventAggregator, 'emit');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('default', {}, { notifications: [fake.notification] });
        await result.current.deleteNotification(fake.notification);
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('notifications.delete', { data: fake.notification, source: 'local' });
      spy.mockRestore();
    });
  });

  describe('.markAllAsSeen', () => {
    it('makes a request to the server', async () => {
      server.intercept('post', '/notifications/seen', { status: 204 });

      const spy = vi.spyOn(ajax, 'postAPI');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('read', {});
        await result.current.markAllAsSeen();
      });

      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it('marks all notifications as seen', async () => {
      server.intercept('post', '/notifications/seen', { status: 204 });

      const notifications = NotificationFactory.buildList(3, { seenAt: null });

      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('read', {}, { notifications });
        await result.current.markAllAsSeen();
      });

      const store = result.current.stores['read'];

      expect(store.notifications[0].seenAt).toBeGreaterThan(fiveSecondsAgo());
      expect(store.notifications[1].seenAt).toBeGreaterThan(fiveSecondsAgo());
      expect(store.notifications[2].seenAt).toBeGreaterThan(fiveSecondsAgo());
    });

    it('emits the "notifications.seen.all" event', async () => {
      server.intercept('post', '/notifications/seen', { status: 204 });

      const spy = vi.spyOn(eventAggregator, 'emit');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        await result.current.markAllAsSeen();
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('notifications.seen.all', { data: null, source: 'local' });
      spy.mockRestore();
    });

    it('does not mark any notifications as seen when updateModels is set to false', async () => {
      server.intercept('post', '/notifications/seen', { status: 204 });

      const notifications = NotificationFactory.buildList(3, { seenAt: null });
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('read', {}, { notifications });
        await result.current.markAllAsSeen({ updateModels: false });
      });

      const store = result.current.stores['read'];

      expect(store.notifications[0].seenAt).toBeNull();
      expect(store.notifications[1].seenAt).toBeNull();
      expect(store.notifications[2].seenAt).toBeNull();
    });

    it('does not make a request to the server when persist is set to false', async () => {
      server.intercept('post', '/notifications/seen', { status: 204 });

      const spy = vi.spyOn(ajax, 'postAPI');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('read', {});
        await result.current.markAllAsSeen({ persist: false });
      });

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it('does not emit any event', async () => {
      server.intercept('post', '/notifications/seen', { status: 204 });

      const spy = vi.spyOn(eventAggregator, 'emit');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('read', {});
        await result.current.markAllAsSeen({ persist: false });
      });

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('.markAllAsRead', () => {
    it('makes a request to the server', async () => {
      server.intercept('post', '/notifications/read', { status: 204 });

      const spy = vi.spyOn(ajax, 'postAPI');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('read', {});
        await result.current.markAllAsRead();
      });

      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it('marks all notifications as read', async () => {
      server.intercept('post', '/notifications/read', { status: 204 });

      const notifications = NotificationFactory.buildList(3, { readAt: null });

      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('unread', {}, { notifications });
        await result.current.markAllAsRead();
      });

      const store = result.current.stores['unread'];

      expect(store.notifications[0].readAt).toBeGreaterThan(fiveSecondsAgo());
      expect(store.notifications[1].readAt).toBeGreaterThan(fiveSecondsAgo());
      expect(store.notifications[2].readAt).toBeGreaterThan(fiveSecondsAgo());
    });

    it('emits the "notifications.read.all" event', async () => {
      server.intercept('post', '/notifications/read', { status: 204 });

      const spy = vi.spyOn(eventAggregator, 'emit');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        await result.current.markAllAsRead();
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('notifications.read.all', { data: null, source: 'local' });
      spy.mockRestore();
    });

    it('does not mark any notifications as read when updateModels is false', async () => {
      const notifications = NotificationFactory.buildList(3, { readAt: null });
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('read', {}, { notifications });
        await result.current.markAllAsSeen({ updateModels: false });
      });

      const store = result.current.stores['read'];

      expect(store.notifications[0].readAt).toBeNull();
      expect(store.notifications[1].readAt).toBeNull();
      expect(store.notifications[2].readAt).toBeNull();
    });

    it('does not make a request to the server when persist is false', async () => {
      server.intercept('post', '/notifications/read', { status: 204 });

      const spy = vi.spyOn(ajax, 'postAPI');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('read', {});
        await result.current.markAllAsRead({ persist: false });
      });

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it('does not emit any event', async () => {
      server.intercept('post', '/notifications/read', { status: 204 });

      const spy = vi.spyOn(eventAggregator, 'emit');
      const { result } = renderHook(() => useNotificationStoresCollection());

      await act(async () => {
        result.current.setStore('read', {});
        await result.current.markAllAsRead({ persist: false });
      });

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
