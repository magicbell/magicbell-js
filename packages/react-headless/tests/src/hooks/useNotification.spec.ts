import faker from '@faker-js/faker';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { act, renderHook } from '@testing-library/react';

import useNotification from '../../../src/hooks/useNotification';
import clientSettings from '../../../src/stores/clientSettings';
import { useNotificationStoresCollection } from '../../../src/stores/notifications';
import NotificationFactory from '../../factories/NotificationFactory';

setupMockServer(...mockHandlers);

beforeAll(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
    apiClientCacheTTL: 0,
  });
});

describe('hooks', () => {
  describe('useNotification', () => {
    const notifications = NotificationFactory.buildList(3, { seenAt: null });

    beforeEach(() => {
      const { result } = renderHook(() => useNotificationStoresCollection());

      act(() => {
        result.current.setStore('default', {}, { notifications });
      });
    });

    describe('on unmount', () => {
      describe('no callback function is provided', () => {
        it('marks the notification as seen', async () => {
          const { result, unmount } = renderHook(() => useNotification(notifications[0]));
          const spy = vi.spyOn(result.current, 'markAsSeen');

          await act(async () => {
            await unmount();
          });

          expect(spy).toHaveBeenCalledTimes(1);
          spy.mockRestore();
        });
      });

      describe('a callback function is provided', () => {
        it('invockes the callback function', async () => {
          const unmountCallback = vi.fn();
          const { unmount } = renderHook(() => useNotification(notifications[0], unmountCallback));

          await act(async () => {
            await unmount();
          });

          expect(unmountCallback).toHaveBeenCalledTimes(1);
        });

        it('does not mark the notification as seen', async () => {
          const unmountCallback = vi.fn();
          const { result, unmount } = renderHook(() => useNotification(notifications[0], unmountCallback));
          const spy = vi.spyOn(result.current, 'markAsSeen');

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
