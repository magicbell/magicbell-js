import { screen } from '@testing-library/react';
import React from 'react';

import FetchErrorMessage from '../../../../../src/components/NotificationInbox/error/FetchErrorMessage';
import { renderWithProviders as render } from '../../../../__utils__/render';

test('renders an api error when notifications cannot be retrieved', () => {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true);
  render(<FetchErrorMessage />);

  screen.getByText(/we can’t seem to retrieve your notifications./i);
  screen.getByText(/please check back soon./i);
});

test('renders a connection error when there is no internet connection', () => {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
  render(<FetchErrorMessage />);

  screen.getByText(/hmm, we’re unable to connect to the internet./i);
  screen.getByText(/Please check your connection./i);
});
