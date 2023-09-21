import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { screen } from '@testing-library/react';
import * as React from 'react';

import UnseenBadge from '../../../../src/components/Badge';
import { renderWithProviders as render } from '../../../__utils__/render';

setupMockServer(...mockHandlers);

test('renders the notification count', () => {
  render(<UnseenBadge count={3} />);
  screen.getByRole('status', { name: /3 unread items/i });
});
