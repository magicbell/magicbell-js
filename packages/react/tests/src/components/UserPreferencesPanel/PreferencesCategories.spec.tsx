import { useNotificationPreferences } from '@magicbell/react-headless';
import { screen } from '@testing-library/react';
import React from 'react';

import PreferencesCategories from '../../../../src/components/UserPreferencesPanel/PreferencesCategories';
import { renderWithProviders as render } from '../../../__utils__/render';
import { sampleNotificationPreferences } from '../../../factories/NotificationPreferencesFactory';

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
  });
});
