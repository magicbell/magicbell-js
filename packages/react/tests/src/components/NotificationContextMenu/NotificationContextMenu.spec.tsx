import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    let notification: Notification;
    let view: RenderResult;

    beforeEach(() => {
      notification = sampleNotification;

      server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
      server.delete(`/notifications/${notification.id}`, '');
      server.post(`/notifications/${notification.id}/read`, '');
      server.post(`/notifications/${notification.id}/unread`, '');

      const translations = useLocale('pt_BR');

      view = render(
        <TranslationsProvider value={translations}>
          <MagicBellThemeProvider value={defaultTheme}>
            <NotificationContextMenu notification={notification} />
          </MagicBellThemeProvider>
        </TranslationsProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
      server.shutdown();
    });

    describe('render', () => {
      it('renders a menu with all items', () => {
        expect(view.container).toMatchSnapshot();
      });

      describe('default language', () => {
        it('renders a title in English', () => {
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <NotificationContextMenu notification={notification} />
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('.toggleRead', () => {
      describe('the notification is read', () => {
        it('marks the notification as unread', () => {
          notification.isRead = true;
          userEvent.click(view.getByTestId('toggle-read'));

          expect(notification.isRead).toBe(false);
        });
      });

      describe('the notification is unread', () => {
        it('marks the notification as read', () => {
          notification.isRead = false;
          userEvent.click(view.getByTestId('toggle-read'));

          expect(notification.isRead).toBe(true);
        });
      });
    });

    describe('.delete', () => {
      it('deletes the notification', () => {
        const spy = jest.spyOn(notification, 'delete');
        userEvent.click(view.getByTestId('delete'));

        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
      });
    });
  });
});
