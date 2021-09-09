import { render, RenderResult } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import React, { useEffect } from 'react';
import RealtimeListener from '../../../src/components/RealtimeListener';
import * as ajax from '../../../src/lib/ajax';
import { pushEventAggregator } from '../../../src/lib/realtime';
import { useNotificationsStoresCollection } from '../../../src/stores/notifications';
import NotificationFactory from '../../factories/NotificationFactory';

describe('components', () => {
  describe('RealtimeListener', () => {
    let view: RenderResult;

    beforeEach(() => {
      const RealtimeComponent = () => {
        const collection = useNotificationsStoresCollection();
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
            pushEventAggregator.emit('wakeup');
          });

          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });
      });

      describe('notifications.new', () => {
        it('fetches notifications', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');

          act(() => {
            pushEventAggregator.emit('notifications.new');
          });

          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });
      });

      describe('notifications.seen.all', () => {
        it('resets the unseen count', () => {
          const { result } = renderHook(() => useNotificationsStoresCollection());

          act(() => {
            pushEventAggregator.emit('notifications.seen.all');
          });

          expect(result.current.stores['default'].unseenCount).toBe(0);
        });

        it('does not make a post request to avoid infinite loops', () => {
          const spy = jest.spyOn(ajax, 'postAPI');

          act(() => {
            pushEventAggregator.emit('notifications.seen.all');
          });

          expect(spy).not.toHaveBeenCalled();
          spy.mockRestore();
        });
      });

      describe('notifications.read.all', () => {
        it('marks all notifications as read', () => {
          const { result } = renderHook(() => useNotificationsStoresCollection());

          act(() => {
            pushEventAggregator.emit('notifications.read.all');
          });

          for (const model of result.current.stores['default'].notifications) {
            expect(model.readAt).toBeDefined();
          }
        });

        it('does not make a post request to avoid infinite loops', () => {
          const spy = jest.spyOn(ajax, 'postAPI');

          act(() => {
            pushEventAggregator.emit('notifications.read.all');
          });

          expect(spy).not.toHaveBeenCalled();
          spy.mockRestore();
        });
      });

      describe('notifications.read', () => {
        it('fetches notifications', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');

          act(() => {
            pushEventAggregator.emit('notifications.read');
          });

          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });
      });

      describe('notifications.unread', () => {
        it('fetches notifications', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');

          act(() => {
            pushEventAggregator.emit('notifications.unread');
          });

          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });
      });

      describe('notifications.delete', () => {
        describe('the notification exists', () => {
          it('removes the notification from the store', () => {
            const { result } = renderHook(() => useNotificationsStoresCollection());
            const notification = NotificationFactory.build();

            act(() => {
              pushEventAggregator.emit('notifications.delete', { id: notification.id });
            });

            expect(result.current.stores['default'].notifications).not.toEqual(expect.arrayContaining([notification]));
          });
        });

        describe('the notification does not exist', () => {
          it('does not remove anything from the store', () => {
            const { result } = renderHook(() => useNotificationsStoresCollection());
            const notification = NotificationFactory.build();

            act(() => {
              pushEventAggregator.emit('notifications.delete', { id: notification.id });
            });

            expect(result.current.stores['default'].total).toBe(0);
            expect(result.current.stores['default'].notifications).toHaveLength(0);
          });
        });
      });
    });
  });
});
