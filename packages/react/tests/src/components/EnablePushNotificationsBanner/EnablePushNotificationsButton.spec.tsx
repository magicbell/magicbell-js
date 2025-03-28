import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { EnablePushNotificationsButton } from '../../../../src/components/EnablePushNotificationsBanner';
import { renderWithProviders as render } from '../../../__utils__/render';

setupMockServer(...mockHandlers);

test('renders a button', () => {
  render(<EnablePushNotificationsButton onClick={vi.fn()} />);
  screen.getByRole('button', { name: /enable now/i });
});

test('calls the onClick handler on click', async () => {
  const onClick = vi.fn();
  render(<EnablePushNotificationsButton onClick={onClick} />);
  const button = screen.getByRole('button', { name: /enable now/i });
  await userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
