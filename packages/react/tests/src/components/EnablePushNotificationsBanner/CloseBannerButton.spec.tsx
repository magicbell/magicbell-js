import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import CloseBannerButton from '../../../../src/components/EnablePushNotificationsBanner/CloseBannerButton';
import { renderWithProviders as render } from '../../../__utils__/render';

test('renders a close button', async () => {
  const onClick = jest.fn();
  render(<CloseBannerButton onClick={onClick} />);
  const closeButton = screen.getByRole('button', { name: /close notification/i });
  await userEvent.click(closeButton);
  expect(onClick).toHaveBeenCalledTimes(1);
});
