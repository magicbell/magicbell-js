import { act, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Server } from 'miragejs';
import React from 'react';
import FloatingNotificationInbox from '../../../../src/components/FloatingNotificationInbox';
import MagicBellContext from '../../../../src/context/MagicBellContext';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { getDefaultNotificationStoreMap } from '../../../factories/NotificationStoresMapFactory';

describe('components', () => {
  describe('FloatingNotificationInbox', () => {
    let view: RenderResult;
    let launcherRef;
    let onAllRead: jest.Mock;
    let onNotificationClick: jest.Mock;
    let toggleNotificationInbox: jest.Mock;

    beforeEach(async () => {
      launcherRef = React.createRef();
      onAllRead = jest.fn();
      onNotificationClick = jest.fn();
      toggleNotificationInbox = jest.fn();

      await act(async () => {
        view = render(
          <MagicBellThemeProvider value={defaultTheme}>
            <div>
              <div ref={launcherRef} />
              <FloatingNotificationInbox
                launcherRef={launcherRef}
                toggle={toggleNotificationInbox}
                height={350}
                onAllRead={onAllRead}
                onNotificationClick={onNotificationClick}
                isOpen
              />
            </div>
          </MagicBellThemeProvider>,
        );
      });
    });

    afterEach(() => {
      view.unmount();
    });

    describe('render', () => {
      it('renders a notification inbox wrapped in tippy', () => {
        expect(view.container).toMatchSnapshot();
      });

      describe('it is not visible', () => {
        beforeEach(async () => {
          await act(async () => {
            view = render(
              <MagicBellThemeProvider value={defaultTheme}>
                <div>
                  <div ref={launcherRef} />
                  <FloatingNotificationInbox
                    launcherRef={launcherRef}
                    toggle={toggleNotificationInbox}
                    height={350}
                    width={200}
                    onAllRead={onAllRead}
                    onNotificationClick={onNotificationClick}
                    isOpen={false}
                  />
                </div>
              </MagicBellThemeProvider>,
            );
          });
        });

        it('does not render anything', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('a custom placement property is defined', () => {
        beforeEach(async () => {
          await act(async () => {
            view = render(
              <MagicBellThemeProvider value={defaultTheme}>
                <div>
                  <div ref={launcherRef} />
                  <FloatingNotificationInbox
                    launcherRef={launcherRef}
                    toggle={toggleNotificationInbox}
                    height={350}
                    onAllRead={onAllRead}
                    onNotificationClick={onNotificationClick}
                    placement="bottom-end"
                    isOpen
                  />
                </div>
              </MagicBellThemeProvider>,
            );
          });
        });

        it('renders the tooltip in the correct place', () => {
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('the "hideArrow" property is set to true', () => {
        beforeEach(async () => {
          await act(async () => {
            view = render(
              <MagicBellThemeProvider value={defaultTheme}>
                <MagicBellContext.Provider value={{ rootStore: getDefaultNotificationStoreMap() }}>
                  <div>
                    <div ref={launcherRef} />
                    <FloatingNotificationInbox
                      launcherRef={launcherRef}
                      toggle={toggleNotificationInbox}
                      height={350}
                      hideArrow
                      isOpen
                    />
                  </div>
                </MagicBellContext.Provider>
              </MagicBellThemeProvider>,
            );
          });
        });

        it('does not render the pointing arrow', () => {
          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe.skip('.handleNotificationClick', () => {
      let notification;
      let server;

      beforeEach(() => {
        notification = store.items[0];

        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.io' });
        server.post(`/notifications/${notification.id}/read`);
        server.post(`/notifications/${notification.id}/unread`);
      });

      afterEach(() => {
        server.shutdown();
      });

      it('toggles the notification inbox', () => {
        const title = view.getByText(notification.title);
        userEvent.click(title);
        expect(toggleNotificationInbox).toHaveBeenCalledTimes(1);
      });

      it('calls the onNotificationClick callback', () => {
        const title = view.getByText(notification.title);
        userEvent.click(title);

        expect(onNotificationClick).toHaveBeenCalledTimes(1);
        expect(onNotificationClick).toHaveBeenCalledWith(notification);
      });

      describe('default click handler', () => {
        beforeEach(async () => {
          await act(async () => {
            view = render(
              <MagicBellThemeProvider value={defaultTheme}>
                <MagicBellContext.Provider value={{ rootStore }}>
                  <div>
                    <div ref={launcherRef} />
                    <FloatingNotificationInbox
                      launcherRef={launcherRef}
                      toggle={toggleNotificationInbox}
                      height={350}
                      onAllRead={onAllRead}
                      isOpen
                    />
                  </div>
                </MagicBellContext.Provider>
              </MagicBellThemeProvider>,
            );
          });
        });

        it('opens the action url in the same window', () => {
          userEvent.click(view.getByText(notification.title));

          expect(global.open).toHaveBeenCalledTimes(1);
          expect(global.open).toHaveBeenCalledWith(notification.actionUrl, '_self');
        });
      });
    });
  });
});
