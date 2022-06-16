import faker from '@faker-js/faker';
import { act, renderHook } from '@testing-library/react-hooks';
import dayjs from 'dayjs';
import humps from 'humps';
import { Response, Server } from 'miragejs';

import { useNotification } from '../../../../src';
import useNotifications from '../../../../src/hooks/useNotifications';
import * as ajax from '../../../../src/lib/ajax';
import { eventAggregator } from '../../../../src/lib/realtime';
import { useNotificationStoresCollection } from '../../../../src/stores/notifications';
import NotificationFactory from '../../../factories/NotificationFactory';

describe('stores', () => {
  describe('notifications', () => {
    let server: Server;

    beforeEach(() => {
      server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
    });

    afterEach(() => {
      server.shutdown();
    });

    describe('useNotificationStoresCollection', () => {
      describe('.setStore', () => {
        it('builds a store and sets it', () => {
          const { result } = renderHook(() => useNotificationStoresCollection());
          const storeId = faker.datatype.uuid();
          const defaultQueryParams = { [faker.lorem.word()]: faker.lorem.word() };

          act(() => {
            result.current.setStore(storeId, defaultQueryParams);
          });

          expect(result.current.stores[storeId]).toEqual({
            context: defaultQueryParams,
            total: 0,
            totalPages: 0,
            perPage: 0,
            currentPage: 1,
            unreadCount: 0,
            unseenCount: 0,
            notifications: [],
          });
        });
      });

      describe('.fetchStore', () => {
        describe('successful response', () => {
          beforeEach(() => {
            const response = {
              total: 5,
              currentPage: 2,
              perPage: 4,
              totalPages: 2,
              projectId: 7,
              unseenCount: 3,
              unreadCount: 2,
              notifications: NotificationFactory.buildList(1),
            };

            server.get('/notifications', humps.decamelizeKeys(response));
          });

          it('fetches a store from the MagicBell server', async () => {
            const spy = jest.spyOn(ajax, 'fetchAPI');
            const { result } = renderHook(() => useNotificationStoresCollection());
            const storeId = faker.datatype.uuid();
            const defaultQueryParams = { unread: true };

            await act(async () => {
              result.current.setStore(storeId, defaultQueryParams);
              await result.current.fetchStore(storeId, { page: 2 });
            });

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('/notifications', { ...defaultQueryParams, page: 2 });
            spy.mockRestore();
          });

          it('updates the store with the response', async () => {
            const { result } = renderHook(() => useNotificationStoresCollection());
            const storeId = faker.datatype.uuid();
            const defaultQueryParams = { [faker.lorem.word()]: faker.lorem.word() };

            await act(async () => {
              result.current.setStore(storeId, defaultQueryParams);
              await result.current.fetchStore(storeId, { page: 2 });
            });

            expect(result.current.stores[storeId]).toMatchObject({
              context: defaultQueryParams,
              currentPage: 2,
              perPage: 4,
              totalPages: 2,
              projectId: 7,
              unseenCount: 3,
              unreadCount: 2,
            });
          });

          it('merges notifications', async () => {
            const notifications = NotificationFactory.buildList(4);
            const { result } = renderHook(() => useNotificationStoresCollection());
            const storeId = faker.datatype.uuid();
            const defaultQueryParams = { [faker.lorem.word()]: faker.lorem.word() };

            await act(async () => {
              result.current.setStore(storeId, defaultQueryParams, { notifications });
              await result.current.fetchStore(storeId, { page: 2 });
            });

            expect(result.current.stores[storeId].notifications).toHaveLength(5);

            expect(result.current.stores[storeId].notifications[0]).toEqual(notifications[0]);
            expect(result.current.stores[storeId].notifications[1]).toEqual(notifications[1]);
            expect(result.current.stores[storeId].notifications[2]).toEqual(notifications[2]);
            expect(result.current.stores[storeId].notifications[3]).toEqual(notifications[3]);
          });

          it('sets the fetch timestamp for the store', async () => {
            // We use any because undefined doesn't work, converting the date to
            // a string (x.toISOString()) results in the error:
            // get error  (intermediate value).getTime is not a function
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const now = new Date() as any;
            const spy = jest.spyOn(global, 'Date').mockImplementation(() => now);
            const { result } = renderHook(() => useNotificationStoresCollection());
            const storeId = faker.datatype.uuid();

            await act(async () => {
              result.current.setStore(storeId, {});
              await result.current.fetchStore(storeId, { page: 2 });
            });

            expect(result.current.stores[storeId].lastFetchedAt).toEqual(now);
            spy.mockRestore();
          });

          test('toggling read state correctly updates depended (split-inbox) stores', async () => {
            const initialReadCount = 3;
            const initialUnreadCount = 4;

            const notifications = {
              read: NotificationFactory.buildList(initialReadCount).map((x) => ({
                ...x,
                readAt: Date.now() / 1000,
                seenAt: Date.now() / 1000,
              })),
              unread: NotificationFactory.buildList(initialUnreadCount).map((x) => ({
                ...x,
                readAt: null,
                seenAt: null,
              })),
            };

            server.get('/notifications', (_, { queryParams }) => {
              const storeId = queryParams?.read === 'true' ? 'read' : 'unread';
              return new Response(
                200,
                {},
                {
                  total: notifications[storeId].length,
                  unreadCount: storeId === 'read' ? 0 : notifications[storeId].length,
                  unseenCount: storeId === 'read' ? 0 : notifications[storeId].length,
                  notifications: notifications[storeId],
                },
              );
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
            const unread = renderHook(() => useNotification(stores.current.unread!.notifications[0])).result.current;
            await act(async () => void (await unread.markAsRead()));

            // verify state when one notification moves from unread > read
            expect(stores.current).toHaveProperty('read.total', initialReadCount + 1);
            expect(stores.current).toHaveProperty('read.unreadCount', 0);
            expect(stores.current).toHaveProperty('read.unseenCount', 0);
            expect(stores.current).toHaveProperty('unread.total', initialUnreadCount - 1);
            expect(stores.current).toHaveProperty('unread.unreadCount', initialUnreadCount - 1);
            expect(stores.current).toHaveProperty('unread.unseenCount', initialUnreadCount - 1);

            // mark one read notification as unread
            const read = renderHook(() => useNotification(stores.current.read!.notifications[0])).result.current;
            await act(async () => void (await read.markAsUnread()));

            // verify state when one notification moves from read > unread, and not to unseen
            expect(stores.current).toHaveProperty('read.total', initialReadCount);
            expect(stores.current).toHaveProperty('read.unreadCount', 0);
            expect(stores.current).toHaveProperty('read.unseenCount', 0);
            expect(stores.current).toHaveProperty('unread.total', initialUnreadCount);
            expect(stores.current).toHaveProperty('unread.unreadCount', initialUnreadCount);
            expect(stores.current).toHaveProperty('unread.unseenCount', initialUnreadCount - 1);
          });

          test('markAsRead also marks a notification as seen', async () => {
            const notifications = NotificationFactory.buildList(4).map((x) => ({ ...x, readAt: null, seenAt: null }));

            server.get(
              '/notifications',
              () =>
                new Response(
                  200,
                  {},
                  {
                    total: notifications.length,
                    unreadCount: notifications.length,
                    notifications: notifications,
                  },
                ),
            );

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
            const now = Date.now() / 1000;
            const notifications = NotificationFactory.buildList(4).map((x) => ({ ...x, readAt: null, seenAt: now }));

            server.get(
              '/notifications',
              () =>
                new Response(
                  200,
                  {},
                  {
                    total: notifications.length,
                    unreadCount: notifications.filter((x) => !x.readAt).length,
                    unseenCount: notifications.filter((x) => !x.seenAt).length,
                    notifications: notifications,
                  },
                ),
            );

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
            const notifications = NotificationFactory.buildList(4).map((x) => ({ ...x, readAt: null, seenAt: null }));

            server.get(
              '/notifications',
              () =>
                new Response(
                  200,
                  {},
                  {
                    total: notifications.length,
                    unreadCount: notifications.length,
                    notifications: notifications,
                  },
                ),
            );

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
            const notifications = NotificationFactory.buildList(4).map((x) => ({ ...x, readAt: null, seenAt: null }));

            server.get(
              '/notifications',
              () =>
                new Response(
                  200,
                  {},
                  {
                    total: notifications.length,
                    unreadCount: notifications.length,
                    notifications: notifications,
                  },
                ),
            );

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
            const notifications = NotificationFactory.buildList(4).map((x) => ({ ...x, readAt: null, seenAt: null }));

            server.get(
              '/notifications',
              () =>
                new Response(
                  200,
                  {},
                  {
                    total: notifications.length,
                    unreadCount: notifications.length,
                    notifications: notifications,
                  },
                ),
            );

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

        describe('error handling', () => {
          beforeEach(() => {
            server.get('/notifications', () => new Response(403, {}, ''));
          });

          it('throws an error', async () => {
            expect.hasAssertions();
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('default', {});

              await expect(() => result.current.fetchStore('default')).rejects.toThrow(
                'Request failed with status code 403',
              );
            });
          });
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
          const now = Date.now();
          const spy = jest.spyOn(Date, 'now').mockImplementation(() => now);
          const { result } = renderHook(() => useNotificationStoresCollection());

          await act(async () => {
            result.current.setStore('default', {}, { notifications: [notification] });
            await result.current.markNotificationAsSeen(notification);
          });

          expect(result.current.stores['default'].notifications[0].seenAt).toEqual(now / 1000);
          spy.mockRestore();
        });

        it('emits the "notifications.seen" event', async () => {
          const spy = jest.spyOn(eventAggregator, 'emit');
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
        describe('successful response', () => {
          const notification = NotificationFactory.build({ readAt: null });

          beforeEach(() => {
            server.post(`/notifications/${notification.id}/read`, () => new Response(204, {}, ''));
          });

          it('decreases the unreadCount prop of the store', async () => {
            const notifications = [...NotificationFactory.buildList(2), notification];
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('default', {}, { notifications, unreadCount: 1 });
              await result.current.markNotificationAsRead(notification);
            });

            expect(result.current.stores['default'].unreadCount).toEqual(0);
          });

          it('marks the notification as read', async () => {
            const now = Date.now();
            const spy = jest.spyOn(Date, 'now').mockImplementation(() => now);
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('default', {}, { notifications: [notification] });
              await result.current.markNotificationAsRead(notification);
            });

            expect(result.current.stores['default'].notifications[0].readAt).toEqual(now / 1000);
            spy.mockRestore();
          });

          it('emits the "notifications.read" event', async () => {
            const spy = jest.spyOn(eventAggregator, 'emit');
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('default', {}, { notifications: [notification] });
              await result.current.markNotificationAsRead(notification);
            });

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('notifications.read', { data: notification, source: 'local' });
            spy.mockRestore();
          });
        });
      });

      describe('.markNotificationAsUnread', () => {
        describe('successful response', () => {
          const notification = NotificationFactory.build({ readAt: dayjs() });

          beforeEach(() => {
            server.post(`/notifications/${notification.id}/unread`, () => new Response(204, {}, ''));
          });

          it('decreases the unreadCount prop of the store', async () => {
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('default', {}, { notifications: [notification], unreadCount: 1 });
              await result.current.markNotificationAsUnread(notification);
            });

            expect(result.current.stores['default'].unreadCount).toEqual(2);
          });

          it('marks the notification as read', async () => {
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('default', {}, { notifications: [notification] });
              await result.current.markNotificationAsUnread(notification);
            });

            expect(result.current.stores['default'].notifications[0].readAt).toBeNull();
          });

          it('emits the "notifications.unread" event', async () => {
            const spy = jest.spyOn(eventAggregator, 'emit');
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
      });

      describe('.deleteNotification', () => {
        describe('successful response', () => {
          const notification = NotificationFactory.build();

          beforeEach(() => {
            server.delete(`/notifications/${notification.id}`, () => new Response(204, {}, ''));
          });

          describe('the notification is unread', () => {
            it('decreases the unreadCount prop of the store', async () => {
              const { result } = renderHook(() => useNotificationStoresCollection());
              const notifications = [{ ...notification, readAt: null }];

              await act(async () => {
                result.current.setStore('default', {}, { notifications, unreadCount: 1 });
                await result.current.deleteNotification(notification);
              });

              expect(result.current.stores['default'].unreadCount).toEqual(0);
            });
          });

          describe('the notification is read', () => {
            it('does not change the unreadCount prop of the store', async () => {
              const { result } = renderHook(() => useNotificationStoresCollection());
              const notifications = [{ ...notification, readAt: dayjs() }];

              await act(async () => {
                result.current.setStore('default', {}, { notifications, unreadCount: 1 });
                await result.current.deleteNotification(notification);
              });

              expect(result.current.stores['default'].unreadCount).toEqual(1);
            });
          });

          it('decreases the total prop of the store', async () => {
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('default', {}, { notifications: [notification], total: 1 });
              await result.current.deleteNotification(notification);
            });

            expect(result.current.stores['default'].total).toEqual(0);
          });

          it('removes the notification from the store', async () => {
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('default', {}, { notifications: [notification] });
              await result.current.deleteNotification(notification);
            });

            expect(result.current.stores['default'].notifications).toHaveLength(0);
          });

          it('emits the "notifications.deleted" event', async () => {
            const spy = jest.spyOn(eventAggregator, 'emit');
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('default', {}, { notifications: [notification] });
              await result.current.deleteNotification(notification);
            });

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('notifications.delete', { data: notification, source: 'local' });
            spy.mockRestore();
          });
        });
      });

      describe('.markAllAsSeen', () => {
        describe('successful response', () => {
          beforeEach(() => {
            server.post('/notifications/seen', () => new Response(204, {}, ''));
          });

          it('makes a request to the server', async () => {
            const spy = jest.spyOn(ajax, 'postAPI');
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('read', {});
              await result.current.markAllAsSeen();
            });

            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
          });

          it('marks all notifications as seen', async () => {
            const now = Date.now();
            const spy = jest.spyOn(Date, 'now').mockImplementation(() => now);
            const notifications = NotificationFactory.buildList(3, { seenAt: null });

            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('read', {}, { notifications });
              await result.current.markAllAsSeen();
            });

            const store = result.current.stores['read'];

            expect(store.notifications[0].seenAt).toEqual(now / 1000);
            expect(store.notifications[1].seenAt).toEqual(now / 1000);
            expect(store.notifications[2].seenAt).toEqual(now / 1000);
            spy.mockRestore();
          });

          it('emits the "notifications.seen.all" event', async () => {
            const spy = jest.spyOn(eventAggregator, 'emit');
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              await result.current.markAllAsSeen();
            });

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('notifications.seen.all', { data: null, source: 'local' });
            spy.mockRestore();
          });

          describe('the updateModels options is false', () => {
            it('does not mark any notifications as seen', async () => {
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
          });

          describe('the persist option is false', () => {
            it('does not make a request to the server', async () => {
              const spy = jest.spyOn(ajax, 'postAPI');
              const { result } = renderHook(() => useNotificationStoresCollection());

              await act(async () => {
                result.current.setStore('read', {});
                await result.current.markAllAsSeen({ persist: false });
              });

              expect(spy).not.toHaveBeenCalled();
              spy.mockRestore();
            });

            it('does not emit any event', async () => {
              const spy = jest.spyOn(eventAggregator, 'emit');
              const { result } = renderHook(() => useNotificationStoresCollection());

              await act(async () => {
                result.current.setStore('read', {});
                await result.current.markAllAsSeen({ persist: false });
              });

              expect(spy).not.toHaveBeenCalled();
              spy.mockRestore();
            });
          });
        });
      });

      describe('.markAllAsRead', () => {
        describe('successful response', () => {
          beforeEach(() => {
            server.post('/notifications/read', () => new Response(204, {}, ''));
          });

          it('makes a request to the server', async () => {
            const spy = jest.spyOn(ajax, 'postAPI');
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('read', {});
              await result.current.markAllAsRead();
            });

            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
          });

          it('marks all notifications as read', async () => {
            const now = Date.now();
            const spy = jest.spyOn(Date, 'now').mockImplementation(() => now);
            const notifications = NotificationFactory.buildList(3, { readAt: null });

            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              result.current.setStore('unread', {}, { notifications });
              await result.current.markAllAsRead();
            });

            const store = result.current.stores['unread'];

            expect(store.notifications[0].readAt).toEqual(now / 1000);
            expect(store.notifications[1].readAt).toEqual(now / 1000);
            expect(store.notifications[2].readAt).toEqual(now / 1000);
            spy.mockRestore();
          });

          it('emits the "notifications.read.all" event', async () => {
            const spy = jest.spyOn(eventAggregator, 'emit');
            const { result } = renderHook(() => useNotificationStoresCollection());

            await act(async () => {
              await result.current.markAllAsRead();
            });

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('notifications.read.all', { data: null, source: 'local' });
            spy.mockRestore();
          });

          describe('the updateModels options is false', () => {
            it('does not mark any notifications as read', async () => {
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
          });

          describe('the persist option is false', () => {
            it('does not make a request to the server', async () => {
              const spy = jest.spyOn(ajax, 'postAPI');
              const { result } = renderHook(() => useNotificationStoresCollection());

              await act(async () => {
                result.current.setStore('read', {});
                await result.current.markAllAsRead({ persist: false });
              });

              expect(spy).not.toHaveBeenCalled();
              spy.mockRestore();
            });

            it('does not emit any event', async () => {
              const spy = jest.spyOn(eventAggregator, 'emit');
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
      });
    });
  });
});
