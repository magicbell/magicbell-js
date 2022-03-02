import { useNotificationPreferences } from '@magicbell/react-headless';
import { fireEvent, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React from 'react';

import CategoryPreferences from '../../../../src/components/UserPreferencesPanel/CategoryPreferences';
import { renderWithProviders as render } from '../../../__utils__/render';

beforeEach(() => {
  useNotificationPreferences.setState({
    categories: {
      comments: {
        label: 'Comments',
        email: false,
        webPush: true,
        inApp: true,
        mobilePush: true,
        slack: true,
        sms: true,
      },
      new_reply: {
        label: 'New Reply',
        email: true,
        webPush: false,
        inApp: false,
        mobilePush: true,
        slack: true,
        sms: true,
      },
    },
    lastFetchedAt: Date.now(),
  });
});

afterEach(() => jest.clearAllMocks());

test('renders a checkbox for each channel', () => {
  render(<CategoryPreferences category="comments" channels={['email', 'inApp', 'webPush']} />);
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(3);
});

test('updates the preferences for the inApp category', async () => {
  render(<CategoryPreferences category="comments" channels={['inApp']} />);

  const { result } = renderHook(() => useNotificationPreferences());
  const spy = jest.spyOn(result.current, 'save');

  const inAppCheckbox = screen.getAllByRole('checkbox')[0];
  userEvent.click(inAppCheckbox);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(result.current.categories).toMatchObject({ comments: { inApp: false } });
});

test('updates the preferences for the email category', async () => {
  render(<CategoryPreferences category="comments" channels={['inApp', 'email']} />);

  const { result } = renderHook(() => useNotificationPreferences());
  const spy = jest.spyOn(result.current, 'save');

  const emailCheckbox = screen.getAllByRole('checkbox')[1];
  userEvent.click(emailCheckbox);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(result.current.categories).toMatchObject({ comments: { email: true } });
});

test('updates the preferences for the webPush category', async () => {
  render(<CategoryPreferences category="comments" channels={['inApp', 'email', 'webPush']} />);

  const { result } = renderHook(() => useNotificationPreferences());
  const spy = jest.spyOn(result.current, 'save');

  const webPushCheckbox = screen.getAllByRole('checkbox')[2];
  fireEvent.click(webPushCheckbox);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(result.current.categories).toMatchObject({ comments: { webPush: false } });
});
