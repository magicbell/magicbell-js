import dayjs from 'dayjs';
import { Server } from 'miragejs';
import Sinon from 'sinon';

import * as ajax from '../../../src/lib/ajax';
import Notification from '../../../src/models/Notification';
import NotificationFactory from '../../factories/NotificationFactory';

describe('models', () => {
  describe('Notification', () => {
    let notification: Notification;

    beforeEach(() => {
      notification = new Notification(NotificationFactory.build());
    });

    describe('constructor', () => {
      describe('custom attributes', () => {
        describe('it is a string', () => {
          it('parses the value', () => {
            expect(notification.customAttributes).toStrictEqual({
              accountId: 4,
            });
          });
        });

        describe('it is an object', () => {
          it('does not transform the value', () => {
            const customAttributes = { accountId: 4 };
            notification = new Notification(NotificationFactory.build({ customAttributes }));

            expect(notification.customAttributes).toStrictEqual(customAttributes);
          });
        });

        describe('it is an invalid JSON representation', () => {
          it('sets the value as it is', () => {
            notification = new Notification(NotificationFactory.build({ customAttributes: 'lorem ipsum' }));

            expect(notification.customAttributes).toStrictEqual('lorem ipsum');
          });
        });
      });
    });

    describe('.seenAtDate', () => {
      describe('seenAt is not null', () => {
        it('returns a date', () => {
          notification.seenAt = 1581397459;
          const date = dayjs(notification.seenAt * 1000);

          expect(notification.seenAtDate).toEqual(date);
        });
      });

      describe('seenAt is null', () => {
        it('returns null', () => {
          notification.seenAt = null;
          expect(notification.seenAtDate).toBeNull();
        });
      });
    });

    describe('.sentAtDate', () => {
      it('returns a date', () => {
        notification.sentAt = 1581397459;
        const date = dayjs(notification.sentAt * 1000);

        expect(notification.sentAtDate).toEqual(date);
      });
    });

    describe('.readAtDate', () => {
      describe('readAt is not null', () => {
        it('returns a date', () => {
          notification.readAt = 1581397459;
          const date = dayjs(notification.readAt * 1000);

          expect(notification.readAtDate).toEqual(date);
        });
      });

      describe('readAt is null', () => {
        it('returns null', () => {
          notification.readAt = null;
          expect(notification.readAtDate).toBeNull();
        });
      });
    });

    describe('.isRead', () => {
      describe('getter', () => {
        describe('the readAt attribute is null', () => {
          it('returns false', () => {
            notification.readAt = null;
            expect(notification.isRead).toBe(false);
          });
        });

        describe('the readAt attribute is not null', () => {
          it('returns true', () => {
            notification.readAt = Date.now();
            expect(notification.isRead).toBe(true);
          });
        });
      });

      describe('setter', () => {
        describe('the set argument is true', () => {
          it('changes the readAt attribute to the current timestamp', () => {
            const clock = Sinon.useFakeTimers(1599251566865);
            notification.readAt = null;
            notification.isRead = true;

            expect(notification.readAt).toBe(1599251566);
            clock.restore();
          });
        });

        describe('the set argument is false', () => {
          it('changes the readAt attribute to the current timestamp', () => {
            notification.readAt = 159925156;
            notification.isRead = false;

            expect(notification.readAt).toBeNull();
          });
        });
      });
    });

    describe('.isSeen', () => {
      describe('getter', () => {
        describe('the seenAt attribute is null', () => {
          it('returns false', () => {
            notification.seenAt = null;
            expect(notification.isSeen).toBe(false);
          });
        });

        describe('the seenAt attribute is not null', () => {
          it('returns true', () => {
            notification.seenAt = Date.now();
            expect(notification.isSeen).toBe(true);
          });
        });
      });

      describe('setter', () => {
        describe('the set argument is true', () => {
          it('changes the seenAt attribute to the current timestamp', () => {
            const clock = Sinon.useFakeTimers(1599251566865);
            notification.seenAt = null;
            notification.isSeen = true;

            expect(notification.seenAt).toBe(1599251566);
            clock.restore();
          });
        });

        describe('the set argument is false', () => {
          it('changes the seenAt attribute to the current timestamp', () => {
            notification.seenAt = 159925156;
            notification.isSeen = false;

            expect(notification.seenAt).toBeNull();
          });
        });
      });
    });

    describe('.sanitizedContent', () => {
      it('returns the content sanitized', () => {
        notification.content =
          '<p>Hello, <a href="javascript:alert(\'Hacked\')">click here.</a></p><img src="null" onerror="alert(\'Hacked\')">';

        expect(notification.sanitizedContent).toBe('<p>Hello, <a>click here.</a></p><img src="null">');
      });

      describe('the notification has no content', () => {
        it('returns null', () => {
          notification.content = null;
          expect(notification.sanitizedContent).toBeNull();
        });
      });
    });

    describe('.fetch', () => {
      let server: any;
      const response = NotificationFactory.build();

      beforeEach(() => {
        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          timing: 50,
        });
        server.get(`/notifications/${notification.id}`, {
          notification: response,
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      it('updates attributes of the current object', async () => {
        expect(notification.id).not.toBe(response.id);
        expect(notification.title).not.toBe(response.title);
        expect(notification.content).not.toBe(response.content);
        expect(notification.actionUrl).not.toBe(response.actionUrl);

        await notification.fetch();

        expect(notification.id).toBe(response.id);
        expect(notification.title).toBe(response.title);
        expect(notification.content).toBe(response.content);
        expect(notification.actionUrl).toBe(response.actionUrl);
        expect(notification.customAttributes).toEqual(JSON.parse(response.customAttributes));
        expect(notification.seenAt).toBe(response.seenAt);
        expect(notification.sentAt).toBe(response.sentAt);
        expect(notification.readAt).toBe(response.readAt);
      });

      describe('the notification does not have an id', () => {
        it('throws an error', () => {
          notification.id = null;
          expect.hasAssertions();

          notification.delete().catch((error) => {
            expect(error.message).toBe('The notification does not exist yet, save it first');
          });
        });
      });
    });

    describe('.markAsRead', () => {
      let server: any;

      beforeEach(() => {
        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          timing: 50,
        });
        server.post(`/notifications/${notification.id}/read`, {});
      });

      afterEach(() => {
        server.shutdown();
      });

      it('sets the readAt attribue', async () => {
        const clock = Sinon.useFakeTimers(Date.now());

        notification.readAt = null;
        notification.markAsRead();

        expect(notification.readAtDate).toEqual(dayjs().millisecond(0));
        clock.restore();
      });

      it('sets the seenAt attribue', async () => {
        const clock = Sinon.useFakeTimers(Date.now());

        notification.seenAt = null;
        notification.markAsRead();

        expect(notification.seenAtDate).toEqual(dayjs().millisecond(0));
        clock.restore();
      });

      it('makes a post request to the read endpoint', () => {
        const spy = vi.spyOn(ajax, 'postAPI');
        notification.markAsRead();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(`/notifications/${notification.id}/read`);
        spy.mockRestore();
      });

      it('returns true', async () => {
        const spy = vi.spyOn(ajax, 'postAPI');
        const result = await notification.markAsRead();

        expect(result).toBe(true);
        spy.mockRestore();
      });

      describe('the notification does not have an id', () => {
        it('throws an error', () => {
          notification.id = null;
          expect.hasAssertions();

          notification.markAsRead().catch((error) => {
            expect(error.message).toBe('The notification does not exist yet, save it first');
          });
        });
      });
    });

    describe('.markAsUnread', () => {
      let server: any;

      beforeEach(() => {
        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          timing: 50,
        });
        server.post(`/notifications/${notification.id}/unread`, {});
      });

      afterEach(() => {
        server.shutdown();
      });

      it('unsets the readAt attribue', async () => {
        notification.readAt = Date.now();
        notification.markAsUnread();

        expect(notification.readAtDate).toBeNull();
      });

      it('makes a post request to the read endpoint', () => {
        const spy = vi.spyOn(ajax, 'postAPI');
        notification.markAsUnread();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(`/notifications/${notification.id}/unread`);
        spy.mockRestore();
      });

      it('returns true', async () => {
        const spy = vi.spyOn(ajax, 'postAPI');
        const result = await notification.markAsUnread();

        expect(result).toBe(true);
        spy.mockRestore();
      });

      describe('the notification does not have an id', () => {
        it('throws an error', () => {
          notification.id = null;
          expect.hasAssertions();

          notification.markAsUnread().catch((error) => {
            expect(error.message).toBe('The notification does not exist yet, save it first');
          });
        });
      });
    });

    describe('.delete', () => {
      let server: any;

      beforeEach(() => {
        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          timing: 50,
        });
        server.delete(`/notifications/${notification.id}`, {});
      });

      afterEach(() => {
        server.shutdown();
      });

      it('makes a request to the delete endpoint', () => {
        const spy = vi.spyOn(ajax, 'deleteAPI');
        notification.delete();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(`/notifications/${notification.id}`);
        spy.mockRestore();
      });
    });
  });
});
