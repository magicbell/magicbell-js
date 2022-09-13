import faker from 'faker';
import { Response, Server } from 'miragejs';

import Notification from '../../../src/models/Notification';
import NotificationStore from '../../../src/stores/NotificationStore';
import NotificationFactory from '../../factories/NotificationFactory';

describe('stores', () => {
  describe('NotificationStore', () => {
    let store: NotificationStore;

    beforeEach(() => {
      store = new NotificationStore();
    });

    describe('.length', () => {
      describe('the store has no models', () => {
        it('returns 0', () => {
          expect(store.length).toBe(0);
        });
      });

      describe('the store has some models', () => {
        it('returns the number of models in the store', () => {
          store.items = NotificationFactory.buildList(1);
          expect(store.length).toBe(1);

          store.items = NotificationFactory.buildList(3);
          expect(store.length).toBe(3);
        });
      });
    });

    describe('.isEmpty', () => {
      describe('the store has no notifications', () => {
        it('returns true', () => {
          store.items = [];
          expect(store.isEmpty).toBe(true);
        });
      });

      describe('the store has at least one notification', () => {
        it('returns false', () => {
          store.items = [new Notification(NotificationFactory.build())];
          expect(store.isEmpty).toBe(false);
        });
      });
    });

    describe('.hasNextPage', () => {
      describe('the current page is less than the number of total pages', () => {
        it('returns false', () => {
          store.currentPage = 1;
          store.totalPages = 2;

          expect(store.hasNextPage).toBe(true);
        });
      });

      describe('the current page equals to the number of total pages', () => {
        it('returns false', () => {
          store.currentPage = 1;
          store.totalPages = 1;

          expect(store.hasNextPage).toBe(false);
        });
      });
    });

    describe('.at', () => {
      describe('the store is empty', () => {
        it('returns null', () => {
          store.items = [];
          expect(store.at(1)).toBeNull();
        });
      });

      describe('the store has some notifications', () => {
        it('returns the model at the given index', () => {
          store.items = NotificationFactory.buildList(10);

          expect(store.at(0)).toBe(store.items[0]);
          expect(store.at(9)).toBe(store.items[9]);
        });
      });
    });

    describe('.get', () => {
      describe('the store is empty', () => {
        it('returns null', () => {
          store.items = [];
          expect(store.get('uuid')).toBeNull();
        });
      });

      describe('the store has some notifications', () => {
        it('returns the model at the given index', () => {
          store.items = NotificationFactory.buildList(10);
          const firstNotification = store.items[0];
          const { id } = firstNotification;

          expect(store.get(id as string)).toBe(firstNotification);
        });
      });
    });

    describe('.map', () => {
      describe('the store has no notifications', () => {
        it('returns an empty array', () => {
          store.reset();
          const values = store.map((notification) => notification.title);

          expect(values).toStrictEqual([]);
        });
      });

      describe('the store has at least one notification', () => {
        it('returns an array of values', async () => {
          const notifications = NotificationFactory.buildList(2).map((attrs) => new Notification(attrs));
          store.setItems(notifications);
          const values = store.map((notification) => notification.title);

          expect(values).toStrictEqual([store.at(0)?.title, store.at(1)?.title]);
        });
      });
    });

    describe('.find', () => {
      describe('the store has no notifications', () => {
        it('returns null', () => {
          store.items = [];
          const values = store.find({ id: 1 });

          expect(values).toBeNull();
        });
      });

      describe('the store has at least one notification', () => {
        it('returns the first item that match the predicate', () => {
          const notification = new Notification(NotificationFactory.build({ title: 'Lorem ipsum dolor' }));
          store.items = NotificationFactory.buildList(4).map((attrs) => new Notification(attrs));
          store.push(notification);
          const values = store.find({ title: 'Lorem ipsum dolor' });

          expect(values).toStrictEqual(notification);
        });
      });
    });

    describe('.filter', () => {
      describe('the store has no notifications', () => {
        it('returns an empty array', () => {
          store.items = [];
          const values = store.filter({ id: 1 });

          expect(values).toStrictEqual([]);
        });
      });

      describe('the store has at least one notification', () => {
        it('returns all items that match the predicate', () => {
          const notification = new Notification(NotificationFactory.build({ title: 'Lorem ipsum dolor' }));
          store.items = NotificationFactory.buildList(4).map((attrs) => new Notification(attrs));
          store.push(notification);
          const values = store.filter({ title: 'Lorem ipsum dolor' });

          expect(values).toStrictEqual([notification]);
        });
      });
    });

    describe('.fetch', () => {
      describe('successful response', () => {
        let server: any;

        beforeEach(() => {
          server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
          server.get('/notifications', {
            total: 5,
            current_page: 1,
            per_page: 15,
            total_pages: 1,
            project_id: 7,
            unseen_count: 3,
            unread_count: 3,
            notifications: NotificationFactory.buildList(5),
          });
        });

        afterEach(() => {
          server.shutdown();
        });

        it('sets the pagination attributes', async () => {
          await store.fetch({ page: 1 });

          expect(store.total).toBe(5);
          expect(store.currentPage).toBe(1);
          expect(store.perPage).toBe(15);
          expect(store.totalPages).toBe(1);
        });

        it('sets the unseenCount attribute', async () => {
          expect(store.unseenCount).toBe(0);
          await store.fetch({ page: 1 });

          expect(store.unseenCount).toBe(3);
        });

        it('sets the unreadCount attribute', async () => {
          expect(store.unreadCount).toBe(0);
          await store.fetch({ page: 1 });

          expect(store.unreadCount).toBe(3);
        });

        it('populates the array of models', async () => {
          await store.fetch({ page: 1 });

          expect(store.length).toBe(5);
          expect(store.at(0)).toBeInstanceOf(Notification);
          expect(store.at(1)).toBeInstanceOf(Notification);
          expect(store.at(2)).toBeInstanceOf(Notification);
          expect(store.at(3)).toBeInstanceOf(Notification);
          expect(store.at(4)).toBeInstanceOf(Notification);
        });

        describe('reset option', () => {
          it('resets the items array', async () => {
            await store.fetch({ page: 1 });
            expect(store.length).toBe(5);

            await store.fetch({ page: 2 });
            expect(store.length).toBe(10);

            await store.fetch({ page: 3 }, { reset: true });
            expect(store.length).toBe(5);
          });
        });
      });

      describe('error handling', () => {
        let server: any;

        beforeEach(() => {
          server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
          server.get('/notifications', new Response(403, {}, {}));
        });

        afterEach(() => {
          server.shutdown();
        });

        it('sets the xhrFetchState to "failure"', async () => {
          expect.hasAssertions();

          await store.fetch({ page: 1 });
          expect(store.xhrFetchState).toEqual('failure');
        });
      });
    });

    describe('.fetchNextPage', () => {
      let server: any;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.get('/notifications', {
          total: 16,
          current_page: 2,
          per_page: 15,
          total_pages: 2,
          project_id: 7,
          unseen_count: 0,
          unread_count: 1,
          notifications: NotificationFactory.buildList(1),
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      it('fetches the next page', async () => {
        store.currentPage = 1;
        await store.fetchNextPage();

        expect(store.currentPage).toBe(2);
      });

      it('appends the models fetched', async () => {
        store.items = NotificationFactory.buildList(15);
        await store.fetchNextPage();

        expect(store.length).toBe(16);
      });
    });

    describe('.create', () => {
      let server: any;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.post('/notifications', (req, res) => JSON.parse(res.requestBody));
      });

      afterEach(() => {
        server.shutdown();
      });

      it('creates a new notification', async () => {
        const notification = await store.create({
          title: 'New Notification',
          actionUrl: 'https://api.magicbell.com',
        });

        expect(notification).toBeInstanceOf(Notification);
        expect(notification.title).toBe('New Notification');
        expect(notification.actionUrl).toBe('https://api.magicbell.com');
      });

      it('adds the new notification to the items array', async () => {
        const length = store.length;
        const notification = await store.create({
          title: 'New Notification',
          actionUrl: 'https://api.magicbell.com',
        });

        expect(store.at(0)).toBe(notification);
        expect(store.length).toBe(length + 1);
      });
    });

    describe('.markAsRead', () => {
      let server: any;

      beforeEach(() => {
        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          trackRequests: true,
          timing: 50,
        });
        server.post('/notifications/read', {});
      });

      afterEach(() => {
        server.shutdown();
      });

      it('resets the unreadCount attribute', async () => {
        store.unreadCount = faker.datatype.number({ min: 1 });
        await store.markAllAsRead();

        expect(store.unreadCount).toBe(0);
      });

      it('marks all notifications as read', async () => {
        store.items = NotificationFactory.buildList(10).map((attrs) => new Notification({ ...attrs, readAt: null }));
        await store.markAllAsRead();

        for (const model of store.items) {
          expect(model.isRead).toBe(true);
        }
      });

      describe('local only', () => {
        it('does not make a post request', async () => {
          await store.markAllAsRead({ omitRequest: true });
          expect(server.pretender.handledRequests).toHaveLength(0);
        });
      });
    });

    describe('.markAllAsSeen', () => {
      let server: any;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.post('/notifications/seen', {});
      });

      afterEach(() => {
        server.shutdown();
      });

      it('resets the unseenCount attribute', async () => {
        store.unseenCount = faker.datatype.number({ min: 1 });
        await store.markAllAsSeen();

        expect(store.unseenCount).toBe(0);
      });

      it('marks all notifications as seen', async () => {
        store.items = NotificationFactory.buildList(10).map((attrs) => new Notification({ ...attrs, seenAt: null }));
        await store.markAllAsSeen();

        for (const model of store.items) {
          expect(model.seenAt).not.toBeNull();
        }
      });

      describe('local only', () => {
        it('does not make a post request', async () => {
          await store.markAllAsSeen({ omitRequest: true });
          expect(server.pretender.handledRequests).toHaveLength(0);
        });
      });

      describe('"updateItems" param', () => {
        describe('it is false', () => {
          it('does not change the seen state of fetched notifications', async () => {
            store.items = NotificationFactory.buildList(10).map(
              (attrs) => new Notification({ ...attrs, seenAt: null }),
            );
            await store.markAllAsSeen({ updateItems: false });

            for (const model of store.items) {
              expect(model.isSeen).toBe(false);
            }
          });
        });
      });
    });

    describe('.push', () => {
      describe('the notification does not exist', () => {
        it('returns true', () => {
          const notification = new Notification(NotificationFactory.build());
          expect(store.push(notification)).toBe(true);
        });

        it('appends the notification to the items array', () => {
          const aNotification = new Notification(NotificationFactory.build());
          const anotherNotification = new Notification(NotificationFactory.build());
          store.push(aNotification);
          store.push(anotherNotification);

          expect(store.items).toEqual([aNotification, anotherNotification]);
        });

        it('increases the total attribute', () => {
          const notification = new Notification(NotificationFactory.build());
          store.total = 0;
          store.push(notification);

          expect(store.total).toBe(1);
        });

        describe('the notification is unread', () => {
          it('increases the unread count', () => {
            const notification = new Notification(NotificationFactory.build({ readAt: null }));
            store.unreadCount = 0;
            store.push(notification);

            expect(store.unreadCount).toBe(1);
          });
        });

        describe('the notification is read', () => {
          it('does not change the unread count', () => {
            const notification = new Notification(NotificationFactory.build({ readAt: new Date() }));
            store.unreadCount = 0;
            store.push(notification);

            expect(store.unreadCount).toBe(0);
          });
        });

        describe('the notification is unseen', () => {
          it('increases the unseen count', () => {
            const notification = new Notification(NotificationFactory.build({ seenAt: null }));
            store.unseenCount = 0;
            store.push(notification);

            expect(store.unseenCount).toBe(1);
          });
        });

        describe('the notification is seen', () => {
          it('does not change the unseen count', () => {
            const notification = new Notification(NotificationFactory.build({ seenAt: new Date() }));
            store.unseenCount = 0;
            store.push(notification);

            expect(store.unseenCount).toBe(0);
          });
        });
      });

      describe('the notification already exists', () => {
        it('returns false', () => {
          const notification = new Notification(NotificationFactory.build());
          store.push(notification);
          store.push(notification);

          expect(store.push(notification)).toBe(false);
        });

        it('does not add the notification', () => {
          const notification = new Notification(NotificationFactory.build());
          store.push(notification);
          store.push(notification);

          expect(store.items).toEqual([notification]);
        });
      });
    });

    describe('.remove', () => {
      describe('the notification exists', () => {
        it('returns true', () => {
          const notification = new Notification(NotificationFactory.build());
          store.push(notification);

          expect(store.remove(notification)).toBe(true);
        });

        it('removes the notification from the items array', () => {
          const notification = new Notification(NotificationFactory.build());
          store.push(notification);
          store.remove(notification);

          expect(store.isEmpty).toBe(true);
        });

        it('decreases the total attribute', () => {
          const notification = new Notification(NotificationFactory.build());
          store.push(notification);
          store.remove(notification);

          expect(store.total).toBe(0);
        });

        describe('the notification is unread', () => {
          it('decreases the unread count', () => {
            const notification = new Notification(NotificationFactory.build({ readAt: null }));
            store.push(notification);
            store.remove(notification);

            expect(store.unreadCount).toBe(0);
          });
        });

        describe('the notification is read', () => {
          it('does not change the unread count', () => {
            const notification = new Notification(NotificationFactory.build({ readAt: new Date() }));
            store.push(notification);
            store.remove(notification);

            expect(store.unreadCount).toBe(0);
          });
        });

        describe('the notification is unseen', () => {
          it('decreases the unseen count', () => {
            const notification = new Notification(NotificationFactory.build({ seenAt: null }));

            store.push(notification);
            expect(store.unseenCount).toBe(1);

            store.remove(notification);
            expect(store.unseenCount).toBe(0);
          });
        });

        describe('the notification is seen', () => {
          it('does not change the unseen count', () => {
            const notification = new Notification(NotificationFactory.build({ seenAt: new Date() }));

            store.push(notification);
            expect(store.unseenCount).toBe(0);

            store.remove(notification);
            expect(store.unseenCount).toBe(0);
          });
        });
      });

      describe('the model does not exist', () => {
        it('does not remove any notifications', () => {
          const notification = new Notification(NotificationFactory.build());
          const anotherNotification = new Notification(NotificationFactory.build());
          store.push(notification);
          store.remove(anotherNotification);

          expect(store.isEmpty).toBe(false);
        });

        it('does not decrease the total attribute', () => {
          const notification = new Notification(NotificationFactory.build());
          const anotherNotification = new Notification(NotificationFactory.build());
          store.push(notification);
          store.remove(anotherNotification);

          expect(store.total).toBe(1);
        });
      });
    });

    describe('.setItems', () => {
      it('sets the list of items', () => {
        expect(store.isEmpty).toBe(true);
        store.setItems([new Notification(NotificationFactory.build())]);
        expect(store.isEmpty).toBe(false);
      });
    });
  });
});
