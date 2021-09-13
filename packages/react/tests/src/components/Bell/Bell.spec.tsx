import { useConfig, useNotificationStoresCollection } from '@magicbell/react-headless';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Server } from 'miragejs';
import React from 'react';
import Bell from '../../../../src/components/Bell';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';

describe('components', () => {
  describe('Bell', () => {
    let server: any;
    let onClick: () => void;
    let view: RenderResult;

    beforeEach(() => {
      useConfig.setState({ lastFetchedAt: Date.now() });

      server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com' });
      server.post('/notifications/seen', {});
      server.get('/notifications', {
        total: 0,
        per_page: 15,
        current_page: 1,
        unseen_count: 0,
        unread_count: 1,
        notifications: [],
      });

      onClick = jest.fn();

      view = render(
        <MagicBellThemeProvider value={defaultTheme}>
          <Bell onClick={onClick} />
        </MagicBellThemeProvider>,
      );
    });

    afterEach(() => {
      server.shutdown();
    });

    describe('render', () => {
      describe('the configuration is not fetched yet', () => {
        it('renders a bell icon', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('the configuration is not fetched yet', () => {
        beforeEach(() => {
          useConfig.setState({ lastFetchedAt: undefined });
        });

        it('does not render a badge for the bell', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('with a custom icon color', () => {
        it('renders a bell icon with the custom color and size', () => {
          const theme = { ...defaultTheme, icon: { borderColor: 'red', width: '14px' } };

          view.rerender(
            <MagicBellThemeProvider value={theme}>
              <Bell onClick={onClick} />
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });

      describe('there are unseen notifications', () => {
        beforeEach(() => {
          useNotificationStoresCollection.setState({
            stores: {
              default: {
                context: {},
                unseenCount: 1,
                unreadCount: 0,
                total: 2,
                totalPages: 2,
                perPage: 1,
                currentPage: 1,
                notifications: [],
              },
            },
          });
        });

        it('renders the number of unseen notifications in the badge', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe("the counter property is set to 'unread'", () => {
        it('shows the number of unread notifications', () => {
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <Bell onClick={onClick} counter="unread" />
            </MagicBellThemeProvider>,
          );

          const defaultStore = {
            context: {},
            unseenCount: 1,
            unreadCount: 2,
            total: 2,
            totalPages: 2,
            perPage: 1,
            currentPage: 1,
            notifications: [],
          };
          useNotificationStoresCollection.setState({
            stores: { default: defaultStore },
          });

          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('.handleClick', () => {
      it('calls the onClick callback', () => {
        userEvent.click(view.getByTestId('bell'));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith();
      });

      describe('there are unseen notifications', () => {
        beforeEach(() => {
          notifications.unseenCount = 1;
        });

        it('marks all notifications as seen', () => {
          const spy = jest.spyOn(notifications, 'markAllAsSeen');
          userEvent.click(view.getByTestId('bell'));

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith({ updateItems: false });
          spy.mockRestore();
        });
      });

      describe('there are no unseen notifications', () => {
        it('does not attempt to mark notifications as seen', () => {
          const spy = jest.spyOn(notifications, 'markAllAsSeen');
          userEvent.click(view.getByTestId('bell'));

          expect(spy).not.toHaveBeenCalled();
          spy.mockRestore();
        });
      });
    });
  });
});
