import { pushEventAggregator } from '@magicbell/react-headless';
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
import { Response, Server } from 'miragejs';
import React from 'react';
import MagicBell, { Header } from '../../../../src';
import NotificationFactory from '../../../../tests/factories/NotificationFactory';
import { sampleConfig } from '../../../factories/ConfigFactory';

describe('components', () => {
  describe('MagicBell', () => {
    const apiKey = faker.random.alphaNumeric(10);
    const userEmail = faker.internet.email();
    const userKey = faker.random.alphaNumeric(10);

    let server;
    let view: RenderResult;

    beforeEach(() => {
      server = new Server({
        environment: 'test',
        urlPrefix: 'https://api.magicbell.com',
        trackRequests: true,
        timing: 50,
      });
      server.get('/notifications', {
        total: 5,
        current_page: 1,
        per_page: 15,
        total_pages: 1,
        project_id: 7,
        unseen_count: 0,
        unread_count: 4,
        notifications: NotificationFactory.buildList(5),
      });
      server.get('/config', sampleConfig);
      server.get('/notification_preferences', {
        notification_preferences: {
          categories: {
            comments: { email: false },
          },
        },
      });
      server.post('/notifications/seen', new Response(204, {}, ''));

      view = render(
        <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
          {() => <div data-testid="children" />}
        </MagicBell>,
      );
    });

    afterEach(() => {
      view.unmount();
      server.shutdown();
    });

    describe('render', () => {
      it('renders a bell only', async () => {
        await waitFor(() => expect(view.container).toMatchSnapshot());
      });

      describe('the bell is clicked', () => {
        it('renders the children', () => {
          fireEvent.click(view.getByTestId('bell'));
          expect(view.container).toMatchSnapshot();
        });
      });

      describe('a custom bell icon is given', () => {
        it('renders the custom icon', async () => {
          const BellIcon = () => <p>Custom bell icon</p>;
          view.rerender(
            <MagicBell
              apiKey={apiKey}
              userEmail={userEmail}
              userKey={userKey}
              BellIcon={<BellIcon />}
            >
              {() => <div data-testid="children" />}
            </MagicBell>,
          );

          await waitFor(() => expect(view.container).toMatchSnapshot());
        });
      });

      describe('it is open by default', () => {
        it('renders the children when it is mounted', () => {
          const { unmount } = render(
            <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} defaultIsOpen>
              {() => <div data-testid="children" />}
            </MagicBell>,
          );

          expect(screen.queryByTestId('children')).toBeInTheDocument();
          unmount();
        });
      });

      describe('custom locale', () => {
        it('sets the custom translations', async () => {
          const { unmount } = render(
            <MagicBell
              apiKey={apiKey}
              userEmail={userEmail}
              userKey={userKey}
              locale={{
                name: 'en-US',
                translations: {
                  header: { 'mark-all-read': 'Please mark all as read' },
                },
              }}
              defaultIsOpen
            >
              {() => <Header onAllRead={jest.fn()} />}
            </MagicBell>,
          );

          expect(await screen.findByTestId('mark-all-as-read')).toMatchSnapshot();
          unmount();
        });
      });

      describe('show unread notifications', () => {
        it('shows the number of unread notifications', async () => {
          view.rerender(
            <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} bellCounter="unread">
              {() => <div data-testid="children" />}
            </MagicBell>,
          );

          const bell = await view.findByTestId('bell');
          await waitFor(() => expect(bell).toHaveTextContent('4'));
        });
      });
    });

    describe('.toggleNotificationInbox', () => {
      it('toggles the children', async () => {
        const { unmount } = render(
          <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} defaultIsOpen>
            {({ toggle }) => <div data-testid="children" onClick={toggle} />}
          </MagicBell>,
        );
        fireEvent.click(await screen.getByTestId('children'));

        expect(view.queryByTestId('children')).not.toBeInTheDocument();
        unmount();
      });

      it('calls the onToggle callback', async () => {
        const onToggle = jest.fn();
        const { unmount } = render(
          <MagicBell
            apiKey={apiKey}
            userEmail={userEmail}
            userKey={userKey}
            onToggle={onToggle}
            defaultIsOpen
          >
            {({ toggle }) => <div data-testid="children" onClick={toggle} />}
          </MagicBell>,
        );
        fireEvent.click(await screen.getByTestId('children'));

        expect(onToggle).toHaveBeenCalledTimes(1);
        unmount();
      });
    });

    describe('component did mount', () => {
      it('sets the headers for fetching from the API', () => {
        const { unmount } = render(
          <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
            {() => <div data-testid="children" />}
          </MagicBell>,
        );

        const requests = server.pretender.handledRequests;
        expect(requests[0].requestHeaders).toMatchObject({
          'X-MAGICBELL-API-KEY': apiKey,
          'X-MAGICBELL-USER-EMAIL': userEmail,
          'X-MAGICBELL-USER-HMAC': userKey,
        });

        unmount();
      });

      describe('with external id', () => {
        it('sets the external id header for etching from the API', async () => {
          const userExternalId = faker.random.alphaNumeric(15);

          const { unmount } = render(
            <MagicBell apiKey={apiKey} userExternalId={userExternalId} userKey={userKey}>
              {() => <div data-testid="children" />}
            </MagicBell>,
          );

          await waitFor(() => expect(server.pretender.handledRequests.length).toBe(2));
          const requests = server.pretender.handledRequests;
          expect(requests[1].requestHeaders).toMatchObject({
            'X-MAGICBELL-API-KEY': apiKey,
            'X-MAGICBELL-USER-EXTERNAL-ID': userExternalId,
            'X-MAGICBELL-USER-HMAC': userKey,
          });

          unmount();
        });
      });
    });

    describe('.handleToggle', () => {
      describe('there is an onToggle callback defined', () => {
        let onToggle;

        beforeEach(() => {
          onToggle = jest.fn();
          view.rerender(
            <MagicBell
              apiKey={apiKey}
              userEmail={userEmail}
              userKey={userKey}
              onToggle={onToggle}
              defaultIsOpen
            >
              {() => <div data-testid="children" />}
            </MagicBell>,
          );
        });

        it('calls the onToggle callback', () => {
          fireEvent.click(view.getByTestId('bell'));

          expect(onToggle).toHaveBeenCalledTimes(1);
          expect(onToggle).toHaveBeenCalledWith(false);
        });
      });
    });

    describe('.handleNewNotification', () => {
      it('calls the onNewNotification callback when a new notification is received', () => {
        const onNewNotification = jest.fn();
        const { unmount } = render(
          <MagicBell
            apiKey={apiKey}
            userEmail={userEmail}
            userKey={userKey}
            onNewNotification={onNewNotification}
          >
            {() => <div data-testid="children" />}
          </MagicBell>,
        );

        const notification = NotificationFactory.build();
        pushEventAggregator.emit('notifications.new', notification);

        expect(onNewNotification).toHaveBeenCalledTimes(1);
        expect(onNewNotification).toHaveBeenCalledWith(notification);

        unmount();
      });
    });
  });
});
