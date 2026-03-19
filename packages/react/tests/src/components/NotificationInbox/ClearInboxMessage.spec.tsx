import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { screen } from '@testing-library/react';
import * as React from 'react';

import ClearInboxMessage from '../../../../src/components/NotificationInbox/ClearInboxMessage';
import { renderWithProviders as render } from '../../../__utils__/render';

setupMockServer(...mockHandlers);

test('the empty inbox shows an image', async () => {
  await render(<ClearInboxMessage />);

  screen.getByRole('img', {
    name: /no notifications/i,
  });
});

test('renders the text in English', async () => {
  await render(<ClearInboxMessage />);

  screen.getByText(/all clear!/i);
  screen.getByText(/We'll let you know when there's more/i);
});

test('can render the text in Spanish', async () => {
  await render(<ClearInboxMessage />, { locale: 'es' });

  screen.getByText(/¡No tiene notificaciones!/i);
  screen.getByText(/Le haremos saber cuando llegue una./i);
});
