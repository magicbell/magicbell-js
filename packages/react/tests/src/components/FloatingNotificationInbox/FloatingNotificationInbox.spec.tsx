import { useConfig } from '@magicbell/react-headless';
import { act, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Response, Server } from 'miragejs';
import React from 'react';
import FloatingNotificationInbox from '../../../../src/components/FloatingNotificationInbox';
import MagicBellProvider from '../../../../src/components/MagicBellProvider';
import { sampleConfig } from '../../../factories/ConfigFactory';
import { sampleNotification } from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('FloatingNotificationInbox', () => {
    const stores = [
      {
        id: 'default',
        defaultQueryParams: {},
        defaults: { notifications: [sampleNotification], lastFetchedAt: Date.now() },
      },
    ];

    let view: RenderResult;
    let launcherRef;
    let onAllRead: jest.Mock;
    let onNotificationClick: jest.Mock;
    let toggleNotificationInbox: jest.Mock;
    let server;

    beforeEach(async () => {
      useConfig.setState({ ...sampleConfig, lastFetchedAt: Date.now() });
      server = new Server({
        environment: 'test',
        urlPrefix: 'https://api.magicbell.com',
        timing: 0,
      });

      server.get('/notifications', {
        total: 1,
        per_page: 15,
        current_page: 1,
        unseen_count: 0,
        unread_count: 1,
        notifications: [sampleNotification],
      });
      server.post(`/notifications/${sampleNotification.id}/read`, new Response(204, {}, ''));
      server.post(`/notifications/${sampleNotification.id}/unread`, new Response(204, {}, ''));

      launcherRef = React.createRef();
      onAllRead = jest.fn();
      onNotificationClick = jest.fn();
      toggleNotificationInbox = jest.fn();

      await act(async () => {
        view = render(
          <MagicBellProvider apiKey="" stores={stores}>
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
          </MagicBellProvider>,
        );
      });
    });

    afterEach(() => {
      view.unmount();
      server.shutdown();
    });

    describe('render', () => {
      it('renders a notification inbox wrapped in tippy', () => {
        expect(view.container).toMatchSnapshot();
      });

      describe('it is not visible', () => {
        beforeEach(async () => {
          await act(async () => {
            view.rerender(
              <MagicBellProvider apiKey="" stores={stores}>
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
              </MagicBellProvider>,
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
            view.rerender(
              <MagicBellProvider apiKey="" stores={stores}>
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
              </MagicBellProvider>,
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
            view.rerender(
              <MagicBellProvider apiKey="" stores={stores}>
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
              </MagicBellProvider>,
            );
          });
        });

        it('does not render the pointing arrow', () => {
          expect(view.container).toMatchSnapshot();
        });
      });
    });

    describe('.handleNotificationClick', () => {
      it('toggles the notification inbox', () => {
        const title = view.getByText(sampleNotification.title);
        userEvent.click(title);

        expect(toggleNotificationInbox).toHaveBeenCalledTimes(1);
      });

      it('calls the onNotificationClick callback', () => {
        const title = view.getByText(sampleNotification.title);
        userEvent.click(title);

        expect(onNotificationClick).toHaveBeenCalledTimes(1);
      });

      describe('default click handler', () => {
        beforeEach(async () => {
          await act(async () => {
            view.rerender(
              <MagicBellProvider apiKey="">
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
              </MagicBellProvider>,
            );
          });
        });

        it('opens the action url in the same window', () => {
          const title = view.getByText(sampleNotification.title);
          userEvent.click(title);

          expect(global.open).toHaveBeenCalledTimes(1);
          expect(global.open).toHaveBeenCalledWith(sampleNotification.actionUrl, '_self');
        });
      });
    });
  });
});
