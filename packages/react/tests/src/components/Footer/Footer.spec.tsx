import { useConfig } from '@magicbell/react-headless';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import Footer from '../../../../src/components/Footer';
import ConfigFactory from '../../../factories/ConfigFactory';

import { renderWithProviders as render } from '../../../__utils__/render';
import userEvent from '@testing-library/user-event';

test('renders a link to the magicbell site', () => {
  render(<Footer />);
  screen.getByRole('img', { name: /magicbell logo/i });
});

test('branding can be disabled', async () => {
  useConfig.setState(
    ConfigFactory.build({
      inbox: {
        features: {
          noMagicbellBranding: { enabled: true },
        },
      },
    }),
  );

  render(<Footer />);

  expect(screen.queryByRole('img', { name: /magicbell logo/i })).not.toBeInTheDocument();
});

test('notification preferences can be disabled', () => {
  useConfig.setState(
    ConfigFactory.build({ inbox: { features: { notificationPreferences: { enabled: false } } } }),
  );

  render(<Footer />);
  expect(screen.queryByRole('button', { name: /notification preferences/i }));
});

test('shows the user preferences panel when the preferences button is clicked', async () => {
  useConfig.setState(
    ConfigFactory.build({ inbox: { features: { notificationPreferences: { enabled: true } } } }),
  );

  render(<Footer />);
  const preferencesButton = screen.getByRole('button', { name: /notification preferences/i });
  userEvent.click(preferencesButton);

  await waitFor(() => screen.getByRole('heading', { name: /preferences/i }));
});
