import {
  buildStore,
  useConfig,
  useNotification,
  useNotificationStoresCollection,
} from '@magicbell/react-headless';
import { act, render, RenderResult } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { Response, Server } from 'miragejs';
import React from 'react';
import Bell from '../../../../src/components/Bell';
import MagicBellProvider from '../../../../src/components/MagicBellProvider';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { sampleConfig } from '../../../factories/ConfigFactory';
import { sampleNotification } from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('Bell', () => {
    let onClick: () => void;
    let server: any;
    let view: RenderResult;

    beforeEach(() => {
      onClick = jest.fn();

      server = new Server({
        environment: 'test',
        urlPrefix: 'https://api.magicbell.com',
        timing: 0,
      });
      server.get('/config', sampleConfig);
      server.post('/notifications/seen', new Response(204, {}, ''));
      server.get('/notifications', {
        total: 1,
        per_page: 15,
        current_page: 1,
        unseen_count: 0,
        unread_count: 1,
        notifications: [sampleNotification],
      });

      view = render(
        <MagicBellProvider apiKey="">
          <Bell onClick={onClick} />
        </MagicBellProvider>,
      );
    });

    afterEach(() => {
      view.unmount();
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
          act(() => {
            useConfig.setState({}, true);
          });
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
          act(() => {
            useNotificationStoresCollection.setState({
              stores: { default: buildStore({ unseenCount: 1 }) },
            });
          });
        });

        it('renders the number of unseen notifications in the badge', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe("the counter property is set to 'unread'", () => {
        it('shows the number of unread notifications', () => {
          act(() => {
            useNotificationStoresCollection.setState({
              stores: { default: buildStore({ unreadCount: 2 }) },
            });
          });

          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <Bell onClick={onClick} counter="unread" />
            </MagicBellThemeProvider>,
          );

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

      it('marks all notifications as seen', () => {
        const { result } = renderHook(() =>
          useNotification({ ...sampleNotification, seenAt: null }),
        );
        userEvent.click(view.getByTestId('bell'));

        expect(result.current.seenAt).toBeDefined();
      });
    });
  });
});
