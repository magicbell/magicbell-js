import { useNotificationPreferences } from '@magicbell/react-headless';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import PreferencesCategories from '../../../../src/components/UserPreferencesPanel/PreferencesCategories';
import { renderWithProviders as render } from '../../../__utils__/render';
import { createServer } from '../../../__utils__/server';
import { sampleNotificationPreferences } from '../../../factories/NotificationPreferencesFactory';

let server: ReturnType<typeof createServer>;

beforeEach(() => {
  server = createServer();
});

afterEach(() => {
  server.shutdown();
});

describe('PreferencesCategories component', () => {
  describe('no categories', () => {
    test('it displays nothing when there are no categories', () => {
      const { container } = render(<PreferencesCategories />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('has categories', () => {
    beforeEach(() => {
      useNotificationPreferences.setState({
        ...sampleNotificationPreferences, // sets the categories property
        lastFetchedAt: Date.now(),
      });
    });

    afterEach(() => jest.clearAllMocks());

    // Note: It is also important that these are physically ordered correctly.
    // How do we check for this using @testing-library/react?
    test('it displays headings', () => {
      render(<PreferencesCategories />);
      screen.getByText(/in app/i);
      screen.getByText(/web push/i);
      screen.getByText(/email/i);
    });

    test('it displays category names', () => {
      render(<PreferencesCategories />);
      screen.getByText(/Comments Label/i);
      screen.getByText(/New Reply/i);
    });

    test('it only displays selected channels', () => {
      render(<PreferencesCategories channels={['in_app', 'web_push']} />);
      screen.getByText(/in app/i);
      screen.getByText(/web push/i);

      expect(screen.queryByText(/email/i)).not.toBeInTheDocument();
    });

    test('it only displays selected categories', () => {
      render(<PreferencesCategories categories={['comments']} />);
      screen.getByText(/Comments Label/i);
      expect(screen.queryByText(/New Reply/i)).not.toBeInTheDocument();
    });

    test('it only displays selected channels and categories', () => {
      render(<PreferencesCategories channels={['in_app']} categories={['comments']} />);

      screen.getByText(/in app/i);
      expect(screen.queryByText(/email/i)).not.toBeInTheDocument();

      screen.getByText(/Comments Label/i);
      expect(screen.queryByText(/New Reply/i)).not.toBeInTheDocument();
    });

    test('it calls the onChange callback when preferences are changed', async () => {
      const onChangeSpy = jest.fn();
      render(<PreferencesCategories onChange={onChangeSpy} />);

      const checkboxes = screen.getAllByRole('checkbox');
      const commentInApp = checkboxes.find(
        (x) => x.getAttribute('id') === 'comments-in_app',
      ) as HTMLElement;

      const commentWebPush = checkboxes.find(
        (x) => x.getAttribute('id') === 'comments-web_push',
      ) as HTMLElement;

      const replyMobilePush = checkboxes.find(
        (x) => x.getAttribute('id') === 'new_reply-mobile_push',
      ) as HTMLElement;

      const commentInAppPreference = {
        channels: [{ enabled: false, label: 'In app', slug: 'in_app' }],
        label: 'Comments Label',
        slug: 'comments',
      };

      const commentWebPushPreference = {
        channels: [{ enabled: false, label: 'Web push', slug: 'web_push' }],
        label: 'Comments Label',
        slug: 'comments',
      };

      const replyMobilePushPreference = {
        channels: [{ enabled: false, label: 'Mobile push', slug: 'mobile_push' }],
        label: 'New Reply',
        slug: 'new_reply',
      };

      await userEvent.click(commentInApp);
      await waitFor(() => expect(onChangeSpy).toHaveBeenCalledTimes(1));
      expect(onChangeSpy).toHaveBeenLastCalledWith({ category: commentInAppPreference });

      await userEvent.click(commentWebPush);
      await waitFor(() => expect(onChangeSpy).toHaveBeenCalledTimes(2));
      expect(onChangeSpy).toHaveBeenLastCalledWith({ category: commentWebPushPreference });

      await userEvent.click(replyMobilePush);
      await waitFor(() => expect(onChangeSpy).toHaveBeenCalledTimes(3));
      expect(onChangeSpy).toHaveBeenLastCalledWith({ category: replyMobilePushPreference });
    });
  });
});
