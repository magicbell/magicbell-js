import { INotification, useNotificationStoresCollection } from '@magicbell/react-headless';
import { act, render, RenderResult } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { Response, Server } from 'miragejs';
import React from 'react';
import Sinon from 'sinon';
import ClickableNotification from '../../../../src/components/ClickableNotification';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { sampleNotification } from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('ClickableNotification', () => {
    let clock: Sinon.SinonFakeTimers;
    let notification = sampleNotification as any;
    let onClick: (notification: INotification) => void;
    let view: RenderResult;

    beforeEach(async () => {
      clock = Sinon.useFakeTimers(1605412800000);
      onClick = jest.fn();

      await act(async () => {
        view = render(
          <MagicBellThemeProvider value={defaultTheme}>
            <ClickableNotification notification={notification} onClick={onClick} />
          </MagicBellThemeProvider>,
        );
      });
    });

    afterEach(() => {
      clock.restore();
    });

    describe('render', () => {
      it('renders the title and content of the notification', () => {
        expect(view.container).toMatchSnapshot();
      });

      describe('the notification has no content', () => {
        it('renders the title of the notification', () => {
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <ClickableNotification
                notification={{ ...notification, content: null }}
                onClick={onClick}
              />
            </MagicBellThemeProvider>,
          );

          expect(view.container).toMatchSnapshot();
        });
      });

      describe('theming', () => {
        describe('the notification is unseen', () => {
          it('renders the notification with the unseen theme variation', () => {
            view.rerender(
              <MagicBellThemeProvider value={defaultTheme}>
                <ClickableNotification
                  notification={{ ...notification, seenAt: null, readAt: null }}
                  onClick={onClick}
                />
              </MagicBellThemeProvider>,
            );

            expect(view.container).toMatchSnapshot();
          });
        });

        describe('the notification is seen and read', () => {
          it('renders the notification with the default theme variation', async () => {
            view.rerender(
              <MagicBellThemeProvider value={defaultTheme}>
                <ClickableNotification
                  notification={{
                    ...notification,
                    seenAt: dayjs().unix(),
                    readAt: dayjs().unix(),
                  }}
                  onClick={onClick}
                />
              </MagicBellThemeProvider>,
            );

            expect(await view.findByText('This is a good content')).toBeInTheDocument();
            expect(view.container).toMatchSnapshot();
          });
        });
      });
    });

    describe('.handleClick', () => {
      let server: any;

      beforeEach(() => {
        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          timing: 50,
        });

        server.post(`/notifications/${notification.id}/read`, new Response(201, {}, ''));
      });

      afterEach(() => {
        server.shutdown();
      });

      it('passes the notification object to the onClick callback', () => {
        const component = view.getByTestId('clickable-notification');
        userEvent.click(component);

        expect(onClick).toHaveBeenCalledTimes(1);
      });

      it.skip('marks the notification as read', () => {
        const { result } = renderHook(() => useNotificationStoresCollection());
        const spy = jest.spyOn(result.current, 'markNotificationAsRead');
        userEvent.click(view.getByTestId('clickable-notification'));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(notification.id);
      });
    });

    describe('default handler', () => {
      beforeEach(async () => {
        await act(async () => {
          view.rerender(
            <MagicBellThemeProvider value={defaultTheme}>
              <ClickableNotification notification={notification} />
            </MagicBellThemeProvider>,
          );
        });
      });

      describe('the notification has an actionUrl', () => {
        it('opens the action url in the same window', () => {
          userEvent.click(view.getByText(notification.title));

          expect(global.open).toHaveBeenCalledTimes(1);
          expect(global.open).toHaveBeenCalledWith(notification.actionUrl, '_self');
        });
      });
    });

    describe('on unmount', () => {
      it.skip('marks the notification as seen', () => {
        const { result } = renderHook(() => useNotificationStoresCollection());
        const spy = jest.spyOn(result.current, 'markNotificationAsSeen');

        view.unmount();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(notification.id);
      });
    });
  });
});
