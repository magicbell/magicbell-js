import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Response, Server } from 'miragejs';
import React from 'react';
import NotificationInbox from '../../../../src/components/NotificationInbox';
import MagicBellContext from '../../../../src/context/MagicBellContext';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { sampleNotification } from '../../../factories/NotificationFactory';
import { getDefaultNotificationStoreMap } from '../../../factories/NotificationStoresMapFactory';

describe('components', () => {
  describe('NotificationInbox', () => {
    let rootStore: NotificationStoresMap;
    let notifications: NotificationStore;
    let onAllRead: () => void;
    let onNotificationClick: () => void;
    let server;
    let view: RenderResult;

    beforeEach(() => {
      server = new Server({
        environment: 'test',
        urlPrefix: 'https://api.magicbell.io',
        timing: 50,
        trackRequests: true,
      });
      server.get('/notifications', {
        total: 1,
        current_page: 1,
        per_page: 15,
        total_pages: 1,
        project_id: 7,
        unseen_count: 1,
        unread_count: 1,
        notifications: [sampleNotification],
      });
      server.post('/notifications/read', new Response(204, {}, ''));
      server.post('/notifications/*/read', new Response(204, {}, ''));

      const config = new Config({ channels: { webPush: { enabled: true } } });
      config.xhrFetchState = 'fulfilled';

      rootStore = getDefaultNotificationStoreMap();
      notifications = rootStore.get('default') as NotificationStore;

      onAllRead = jest.fn();
      onNotificationClick = jest.fn();

      view = render(
        <MagicBellConfigProvider value={config}>
          <MagicBellThemeProvider value={defaultTheme}>
            <MagicBellContext.Provider value={{ rootStore }}>
              <NotificationInbox
                onNotificationClick={onNotificationClick}
                onAllRead={onAllRead}
                height={300}
              />
            </MagicBellContext.Provider>
          </MagicBellThemeProvider>
        </MagicBellConfigProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
      server.shutdown();
    });

    describe('render', () => {
      describe('there are no notifications', () => {
        beforeEach(() => {
          server.get('/notifications', {
            total: 0,
            current_page: 1,
            per_page: 15,
            total_pages: 1,
            project_id: 7,
            unseen_count: 0,
            unread_count: 0,
            notifications: [],
          });
        });

        it('renders a message and a image', () => {
          return waitFor(() => expect(view.container).toMatchSnapshot());
        });
      });

      describe('the notifications are fetched', () => {
        it('renders a header, the list of notifications and a footer', async () => {
          const requests = server.pretender.handledRequests;
          expect(requests[0].queryParams).toMatchObject({ page: '1' });

          expect(await view.findByText('This is a good content')).toBeInTheDocument();
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('the notification store does not exist', () => {
        it('does not render anything', () => {
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <MagicBellContext.Provider value={{ rootStore }}>
                <NotificationInbox
                  onNotificationClick={onNotificationClick}
                  onAllRead={onAllRead}
                  height={300}
                  storeId="non-existing"
                />
              </MagicBellContext.Provider>
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('mark all notifications as read', () => {
      it('marks all notifications as read', () => {
        const spy = jest.spyOn(notifications, 'markAllAsRead');
        userEvent.click(view.getByTestId('mark-all-as-read'));

        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('invokes the onAllRead callback', () => {
        userEvent.click(view.getByTestId('mark-all-as-read'));

        expect(onAllRead).toHaveBeenCalledTimes(1);
      });

      describe('no callbacks are defined', () => {
        beforeEach(() => {
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <MagicBellContext.Provider value={{ rootStore }}>
                <NotificationInbox height={300} />
              </MagicBellContext.Provider>
            </MagicBellThemeProvider>,
          );
        });

        it('marks all notifications as read', () => {
          const spy = jest.spyOn(notifications, 'markAllAsRead');
          userEvent.click(view.getByTestId('mark-all-as-read'));

          expect(spy).toBeCalledTimes(1);
        });

        describe('a notification is clicked', () => {
          it('marks the notification as read', async () => {
            expect(await view.findByText('This is a good content')).toBeInTheDocument();

            const spy = jest.spyOn(notifications.items[0], 'markAsRead');
            userEvent.click(view.getByTestId('clickable-notification'));

            expect(spy).toBeCalledTimes(1);
          });
        });
      });
    });
  });
});
