import { screen } from '@testing-library/react';
import React from 'react';

import ClearInboxMessage from '../../../../src/components/NotificationInbox/ClearInboxMessage';
import { renderWithProviders as render } from '../../../__utils__/render';

test('the empty inbox shows an image', () => {
  render(<ClearInboxMessage />);

  screen.getByRole('img', {
    name: /no notifications/i,
  });
});

test('renders the text in English', () => {
  render(<ClearInboxMessage />);

  screen.getByText(/all clear!/i);
  screen.getByText(/We'll let you know when there's more/i);
});

test('can render the text in Spanish', () => {
  render(<ClearInboxMessage />, { locale: 'es' });

  screen.getByText(/¡No tiene notificaciones!/i);
  screen.getByText(/Le haremos saber cuando llegue una./i);
});
