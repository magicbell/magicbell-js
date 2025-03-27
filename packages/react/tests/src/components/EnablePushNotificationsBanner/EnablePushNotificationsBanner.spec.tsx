import { useConfig } from '@magicbell/react-headless';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import EnablePushNotificationsBanner from '../../../../src/components/EnablePushNotificationsBanner/EnablePushNotificationsBanner';
import { renderWithProviders as render } from '../../../__utils__/render';
import ConfigFactory, { sampleConfig } from '../../../factories/ConfigFactory';

setupMockServer(...mockHandlers);

beforeEach(() => {
  localStorage.clear();
  act(() => {
    useConfig.setState({
      ...sampleConfig,
      lastFetchedAt: Date.now(),
    });
  });
});

test("renders a button to enable push notifications if the user hasn't enabled them", () => {
  render(<EnablePushNotificationsBanner />);
  screen.getByRole('button', { name: /enable now/i });
});

test('does not render anything if push notifications are enabled', () => {
  localStorage.setItem('magicbell:cf63e9f2fcb30bcd58eb:web-push-requested-at', JSON.stringify(Date.now()));

  render(<EnablePushNotificationsBanner />, { apiKey: 'cf63e9f2fcb30bcd58eb' });
  expect(screen.queryByRole('button', { name: /enable now/i })).not.toBeInTheDocument();
});

test('does not render anything if web push channel is disabled', () => {
  act(() => {
    useConfig.setState({
      ...ConfigFactory.build({ channels: { webPush: { enabled: false } } }),
      lastFetchedAt: Date.now(),
    });
  });

  render(<EnablePushNotificationsBanner />);
  expect(screen.queryByRole('button', { name: /enable now/i })).not.toBeInTheDocument();
});

test('clicking the `enable now` button opens a new window to create the push subscription', async () => {
  const spy = jest.spyOn(window, 'open');
  render(<EnablePushNotificationsBanner />);

  const enableButton = screen.getByRole('button', { name: /enable now/i });
  await userEvent.click(enableButton);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('closes the banner when clicking the close button', async () => {
  render(<EnablePushNotificationsBanner />);

  const closeButton = screen.getByRole('button', { name: /close notification/i });

  await userEvent.click(closeButton);
  await waitFor(() => expect(closeButton).not.toBeInTheDocument());
});
