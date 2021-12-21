import { render, screen } from '@testing-library/react';
import React from 'react';

import Header from '../../../../src/components/Header';

test('renders a title and a button to mark all notification as read', () => {
  render(<Header title="notifications" actions={<button>mark all read</button>} />);
  screen.getByRole('heading', { name: 'notifications' });
  screen.getByRole('button', { name: 'mark all read' });
});
