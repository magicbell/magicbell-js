import { useNotificationPreferences } from '@magicbell/react-headless';
import { screen } from '@testing-library/react';
import React from 'react';

import PreferencesCategories from '../../../../src/components/UserPreferencesPanel/PreferencesCategories';
import { renderWithProviders as render } from '../../../__utils__/render';
import { threeChannelAfterUpdatePreference } from '../../../factories/NotificationPreferencesFactory';

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
        ...threeChannelAfterUpdatePreference, // sets the categories property
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
  });
});
