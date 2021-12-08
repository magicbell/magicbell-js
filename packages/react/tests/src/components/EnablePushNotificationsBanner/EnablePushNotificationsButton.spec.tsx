import { screen } from '@testing-library/react';
import React from 'react';
import { EnablePushNotificationsButton } from '../../../../src/components/EnablePushNotificationsBanner';
import { renderWithProviders as render } from '../../../__utils__/render';
import userEvent from '@testing-library/user-event';

test('renders a button', () => {
  render(<EnablePushNotificationsButton onClick={jest.fn()} />);
  screen.getByRole('button', { name: /enable now/i });
});

test('calls the onClick handler on click', () => {
  const onClick = jest.fn();
  render(<EnablePushNotificationsButton onClick={onClick} />);
  const button = screen.getByRole('button', { name: /enable now/i });
  userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
