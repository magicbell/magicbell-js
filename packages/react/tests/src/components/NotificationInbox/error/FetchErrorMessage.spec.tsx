import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { screen } from '@testing-library/react';
import * as React from 'react';

import FetchErrorMessage from '../../../../../src/components/NotificationInbox/error/FetchErrorMessage';
import { renderWithProviders as render } from '../../../../__utils__/render';

setupMockServer(...mockHandlers);
test('renders an api error when notifications cannot be retrieved', () => {
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true);
  render(<FetchErrorMessage />);

  screen.getByText(/we can’t seem to retrieve your notifications./i);
  screen.getByText(/please check back soon./i);
});

test('renders a connection error when there is no internet connection', () => {
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
  render(<FetchErrorMessage />);

  screen.getByText(/hmm, we’re unable to connect to the internet./i);
  screen.getByText(/Please check your connection./i);
});
