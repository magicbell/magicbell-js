import { useConfig } from '@magicbell/react-headless';
import { screen } from '@testing-library/react';
import React from 'react';

import Footer from '../../../../src/components/Footer';
import { renderWithProviders as render } from '../../../__utils__/render';
import ConfigFactory from '../../../factories/ConfigFactory';

test('renders a link to the magicbell site', () => {
  render(<Footer />);
  screen.getByRole('img', { name: 'MagicBell logo' });
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

  expect(screen.queryByRole('img', { name: 'MagicBell logo' })).not.toBeInTheDocument();
});
