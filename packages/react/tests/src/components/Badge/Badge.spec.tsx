import { screen } from '@testing-library/react';
import React from 'react';
import UnseenBadge from '../../../../src/components/Badge';
import { renderWithProviders as render } from '../../../__utils__/render';

test('renders the notification count', () => {
  render(<UnseenBadge count={3} />);
  screen.getByRole('status', { name: /3 unread items/i });
});
