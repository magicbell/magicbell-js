import { useNotification } from '@magicbell/react-headless';
import { act, render, RenderResult } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { Server } from 'miragejs';
import React from 'react';
import NotificationContextMenu from '../../../../src/components/NotificationContextMenu';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { TranslationsProvider } from '../../../../src/context/TranslationsContext';
import { useLocale } from '../../../../src/lib/i18n';
import { sampleNotification } from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('NotificationContextMenu', () => {
    let server;
    let view: RenderResult;

    beforeEach(() => {
      const { result } = renderHook(() => useNotification(sampleNotification));

      server = new Server({
        environment: 'test',
        urlPrefix: 'https://api.magicbell.com',
        timing: 50,
      });
      server.delete(`/notifications/${sampleNotification.id}`, '');
      server.post(`/notifications/${sampleNotification.id}/read`, '');
      server.post(`/notifications/${sampleNotification.id}/unread`, '');

      const translations = useLocale('pt_BR');

      view = render(
        <TranslationsProvider value={translations}>
          <MagicBellThemeProvider value={defaultTheme}>
            <NotificationContextMenu notification={result.current} />
          </MagicBellThemeProvider>
        </TranslationsProvider>,
      );
    });

    afterEach(() => {
      server.shutdown();
    });

    describe('render', () => {
      it('renders a menu with all items', () => {
        expect(view.container).toMatchSnapshot();
      });

      describe('default language', () => {
        it('renders a title in English', () => {
          const { result } = renderHook(() => useNotification(sampleNotification));

          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <NotificationContextMenu notification={result.current} />
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe.skip('.toggleRead', () => {
      describe('the notification is read', () => {
        it('marks the notification as unread', async () => {
          const { waitForValueToChange, result } = renderHook(() =>
            useNotification({ ...sampleNotification, readAt: dayjs().unix() }),
          );
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <NotificationContextMenu notification={result.current} />
            </MagicBellThemeProvider>,
          );

          act(() => {
            const button = view.getByTestId('toggle-read');
            userEvent.click(button);
          });

          await waitForValueToChange(() => result.current.readAt);
        });
      });

      describe('the notification is unread', () => {
        it('marks the notification as read', async () => {
          const { waitForValueToChange, result } = renderHook(() =>
            useNotification({ ...sampleNotification, readAt: null }),
          );
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <NotificationContextMenu notification={result.current} />
            </MagicBellThemeProvider>,
          );

          act(() => {
            const button = view.getByTestId('toggle-read');
            userEvent.click(button);
          });

          await waitForValueToChange(() => result.current.readAt);
        });
      });
    });

    describe('.delete', () => {
      it.skip('deletes the notification', () => {
        const { result } = renderHook(() => useNotification(sampleNotification));
        const spy = jest.spyOn(result.current, 'delete');
        userEvent.click(view.getByTestId('delete'));

        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
