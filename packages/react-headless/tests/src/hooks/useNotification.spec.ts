import { act, renderHook } from '@testing-library/react-hooks';
import useNotification from '../../../src/hooks/useNotification';
import { useNotificationsStoresCollection } from '../../../src/stores/notifications';
import NotificationFactory from '../../factories/NotificationFactory';

describe('hooks', () => {
  describe('useNotification', () => {
    const notifications = NotificationFactory.buildList(3, { seenAt: null });

    beforeEach(() => {
      const { result } = renderHook(() => useNotificationsStoresCollection());

      act(() => {
        result.current.setStore('default', {}, { notifications });
      });
    });

    describe('on unmount', () => {
      describe('no callback function is provided', () => {
        it('marks the notification as seen', async () => {
          const { result, unmount } = renderHook(() => useNotification(notifications[0]));
          const spy = jest.spyOn(result.current, 'markAsSeen');

          await act(async () => {
            await unmount();
          });

          expect(spy).toHaveBeenCalledTimes(1);
          spy.mockRestore();
        });
      });

      describe('a callback function is provided', () => {
        it('invockes the callback function', async () => {
          const unmountCallback = jest.fn();
          const { unmount } = renderHook(() => useNotification(notifications[0], unmountCallback));

          await act(async () => {
            await unmount();
          });

          expect(unmountCallback).toHaveBeenCalledTimes(1);
        });

        it('does not mark the notification as seen', async () => {
          const unmountCallback = jest.fn();
          const { result, unmount } = renderHook(() => useNotification(notifications[0], unmountCallback));
          const spy = jest.spyOn(result.current, 'markAsSeen');

          await act(async () => {
            await unmount();
          });

          expect(spy).not.toHaveBeenCalled();
          spy.mockRestore();
        });
      });
    });
  });
});
