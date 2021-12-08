import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../../../../src/components/Header';

import { renderWithProviders as render } from '../../../__utils__/render';

test('renders a title and a button to mark all notification as read', () => {
  render(<Header onAllRead={jest.fn()} />);
  screen.getByRole('heading', { name: /notifications/i });
  screen.getByRole('button', { name: /mark all read/i });
});

test('can render the heading in spanish', () => {
  render(<Header onAllRead={jest.fn()} />, { locale: 'es' });
  screen.getByRole('heading', { name: /notificaciones/i });
  screen.getByRole('button', { name: /marcar todo como leído/i });
});

test('invokes the onAllRead callback when clicking the `mark all read` button', async () => {
  const onAllRead = jest.fn();
  render(<Header onAllRead={onAllRead} />, { locale: 'en' });

  const markAllReadButton = screen.getByRole('button', { name: /mark all read/i });
  userEvent.click(markAllReadButton);
  await waitFor(() => expect(onAllRead).toBeCalledTimes(1));
});
