import { render, RenderResult } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import React, { useEffect } from 'react';
import RealtimeListener from '../../../src/components/RealtimeListener';
import * as ajax from '../../../src/lib/ajax';
import { emitEvent } from '../../../src/lib/realtime';
import { useNotificationStoresCollection } from '../../../src/stores/notifications';
import NotificationFactory from '../../factories/NotificationFactory';

describe('components', () => {
  describe('RealtimeListener', () => {
    let view: RenderResult;

    beforeEach(() => {
      const RealtimeComponent = () => {
        const collection = useNotificationStoresCollection();
        useEffect(() => {
          collection.setStore('default', {}, { unreadCount: 1, unseenCount: 1 });
        }, []);

        return <RealtimeListener />;
      };

      view = render(<RealtimeComponent />);
    });

    afterEach(() => {
      view.unmount();
    });

    describe('realtime events', () => {
      describe('wakeup', () => {
        it('fetches notifications', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');

          act(() => {
            emitEvent('wakeup', null, 'local');
          });

          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });
      });

      describe('notifications.new', () => {
        it('fetches notifications', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');

          act(() => {
            emitEvent('notifications.new', { id: 'uuid' }, 'remote');
          });

          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });

        it('prepends the new notifications', async () => {
          const notification = NotificationFactory.build();
          const { result, waitForNextUpdate } = renderHook(() => useNotificationStoresCollection());
          const spy = jest.spyOn(ajax, 'fetchAPI').mockResolvedValue({ notifications: [notification] });

          act(() => {
            emitEvent('notifications.new', notification, 'remote');
          });

          await waitForNextUpdate();
          expect(result.current.stores['default'].notifications[0]).toEqual(notification);
          spy.mockRestore();
        });
      });

      describe('notifications.seen.all', () => {
        it('resets the unseen count', () => {
          const { result } = renderHook(() => useNotificationStoresCollection());

          act(() => {
            emitEvent('notifications.seen.all', null, 'remote');
          });

          expect(result.current.stores['default'].unseenCount).toBe(0);
        });

        it('does not make a post request to avoid infinite loops', () => {
          const spy = jest.spyOn(ajax, 'postAPI');

          act(() => {
            emitEvent('notifications.seen.all', null, 'remote');
          });

          expect(spy).not.toHaveBeenCalled();
          spy.mockRestore();
        });
      });

      describe('notifications.read.all', () => {
        it('marks all notifications as read', () => {
          const { result } = renderHook(() => useNotificationStoresCollection());

          act(() => {
            emitEvent('notifications.read.all', null, 'remote');
          });

          for (const model of result.current.stores['default'].notifications) {
            expect(model.readAt).toBeDefined();
          }
        });

        it('does not make a post request to avoid infinite loops', () => {
          const spy = jest.spyOn(ajax, 'postAPI');

          act(() => {
            emitEvent('notifications.read.all', null, 'remote');
          });

          expect(spy).not.toHaveBeenCalled();
          spy.mockRestore();
        });
      });

      describe('notifications.read', () => {
        it('fetches notifications', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');

          act(() => {
            emitEvent('notifications.read', { id: 'uuid' }, 'remote');
          });

          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });
      });

      describe('notifications.unread', () => {
        it('fetches notifications', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');

          act(() => {
            emitEvent('notifications.unread', { id: 'uuid' }, 'remote');
          });

          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });
      });

      describe('notifications.delete', () => {
        describe('the notification exists', () => {
          it('removes the notification from the store', () => {
            const { result } = renderHook(() => useNotificationStoresCollection());
            const notification = NotificationFactory.build();

            act(() => {
              emitEvent('notifications.delete', { id: notification.id }, 'remote');
            });

            expect(result.current.stores['default'].notifications).not.toEqual(expect.arrayContaining([notification]));
          });
        });

        describe('the notification does not exist', () => {
          it('does not remove anything from the store', () => {
            const { result } = renderHook(() => useNotificationStoresCollection());
            const notification = NotificationFactory.build();

            act(() => {
              emitEvent('notifications.delete', { id: notification.id }, 'remote');
            });

            expect(result.current.stores['default'].total).toBe(0);
            expect(result.current.stores['default'].notifications).toHaveLength(0);
          });
        });
      });
    });
  });
});
