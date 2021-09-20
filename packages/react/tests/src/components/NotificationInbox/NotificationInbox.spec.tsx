import { useConfig } from '@magicbell/react-headless';
import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Response, Server } from 'miragejs';
import React from 'react';
import MagicBellProvider from '../../../../src/components/MagicBellProvider';
import NotificationInbox from '../../../../src/components/NotificationInbox';
import { sampleConfig } from '../../../factories/ConfigFactory';
import { sampleNotification } from '../../../factories/NotificationFactory';

describe('components', () => {
  describe('NotificationInbox', () => {
    let onAllRead: () => void;
    let onNotificationClick: () => void;
    let server;
    let view: RenderResult;

    beforeEach(() => {
      useConfig.setState({ ...sampleConfig, lastFetchedAt: Date.now() });

      server = new Server({
        environment: 'test',
        urlPrefix: 'https://api.magicbell.com',
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

      onAllRead = jest.fn();
      onNotificationClick = jest.fn();

      view = render(
        <MagicBellProvider apiKey="">
          <NotificationInbox
            onNotificationClick={onNotificationClick}
            onAllRead={onAllRead}
            height={300}
          />
        </MagicBellProvider>,
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
        it('throws an error', () => {
          expect(() =>
            view.rerender(
              <MagicBellProvider apiKey="">
                <NotificationInbox
                  onNotificationClick={onNotificationClick}
                  onAllRead={onAllRead}
                  height={300}
                  storeId="non-existing"
                />
              </MagicBellProvider>,
            ),
          ).toThrowError('Store not found. Define a store with the non-existing ID');
        });
      });
    });

    describe('mark all notifications as read', () => {
      it('invokes the onAllRead callback', () => {
        const button = view.getByTestId('mark-all-as-read');
        userEvent.click(button);

        expect(onAllRead).toHaveBeenCalledTimes(1);
      });
    });
  });
});
