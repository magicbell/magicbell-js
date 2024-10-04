import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { ClickableNotification } from '../../../../src';
import MagicBellProvider from '../../../../src/components/MagicBellProvider';
import { sampleNotification } from '../../../factories/NotificationFactory';

setupMockServer(...mockHandlers);

test('renders an button for the context menu', () => {
  render(<ClickableNotification notification={sampleNotification} />);
  screen.getByRole('button', { name: /menu/i });
});

test('renders the context menu on click', async () => {
  render(
    <MagicBellProvider theme={{}} locale="en" images={{}} apiKey="-" userEmail="-">
      <ClickableNotification notification={{ ...sampleNotification, seenAt: null, readAt: null }} />
    </MagicBellProvider>,
  );
  const menu = screen.getByRole('button', { name: /menu/i });
  await userEvent.click(menu);

  await waitFor(() => screen.getByText(/mark as read/i));
});
