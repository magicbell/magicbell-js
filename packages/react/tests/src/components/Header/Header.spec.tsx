import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import Header from '../../../../src/components/Header';

setupMockServer(...mockHandlers);

test('renders a title and a button to mark all notification as read', () => {
  render(<Header title="notifications" actions={<button>mark all read</button>} />);
  screen.getByRole('heading', { name: 'notifications' });
  screen.getByRole('button', { name: 'mark all read' });
});
