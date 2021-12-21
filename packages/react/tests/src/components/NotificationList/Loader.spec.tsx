import { render, screen } from '@testing-library/react';
import React from 'react';

import Loader from '../../../../src/components/NotificationList/Loader';

test('renders an animated loader', () => {
  render(<Loader />);
  screen.getByText(/loading.../i);
});
