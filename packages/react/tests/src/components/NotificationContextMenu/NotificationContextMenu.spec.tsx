import { useNotification } from '@magicbell/react-headless';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { renderHook, screen } from '@testing-library/react';
import * as React from 'react';

import NotificationContextMenu from '../../../../src/components/NotificationContextMenu';
import { renderWithProviders as render } from '../../../__utils__/render';
import { sampleNotification } from '../../../factories/NotificationFactory';

setupMockServer(...mockHandlers);
test('renders a menu with all items', async () => {
  const { result } = renderHook(() => useNotification(sampleNotification));
  await render(<NotificationContextMenu notification={result.current} />);

  screen.getByText(/mark as read/i);
  screen.getByText(/delete/i);
});

test('can render the menu in Spanish', async () => {
  const { result } = renderHook(() => useNotification(sampleNotification));
  await render(<NotificationContextMenu notification={result.current} />, { locale: 'es' });

  screen.getByText(/marcar como leído/i);
  screen.getByText(/eliminar/i);
});
