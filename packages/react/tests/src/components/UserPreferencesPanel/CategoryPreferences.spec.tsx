import { useNotificationPreferences } from '@magicbell/react-headless';
import { CategoryChannelPreference } from '@magicbell/react-headless/src/types/IRemoteNotificationPreferences';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { notificationPreferences } from '@magicbell/utils/mock-data';
import { renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import CategoryPreferences from '../../../../src/components/UserPreferencesPanel/CategoryPreferences';
import { renderWithProviders as render } from '../../../__utils__/render';
import {
  sampleNotificationPreferences,
  threeChannelPreference,
  twoChannelPreference,
} from '../../../factories/NotificationPreferencesFactory';

setupMockServer(...mockHandlers);

// NOTE: The order in the channels array greatly matters. This order defines
// the order of the columns displayed in the UI. Changing that order may affect
// usability because users become accustomed to the order presented. As such
// we tightly couple the tests to the order of the data.
type Writable<T> = { -readonly [P in keyof T]: Writable<T[P]> };

beforeEach(() => {
  useNotificationPreferences.setState({
    categories: notificationPreferences.categories as Writable<typeof notificationPreferences.categories>,
    lastFetchedAt: Date.now(),
  });
});

test('it renders the category label', () => {
  render(<CategoryPreferences category={sampleNotificationPreferences.categories[0]} />);
  screen.getByText('Comments Label');

  render(<CategoryPreferences category={sampleNotificationPreferences.categories[1]} />);
  screen.getByText('New Reply');
});

test('when preferences has two channels, it only renders a checkbox for each of those channels', () => {
  render(<CategoryPreferences category={twoChannelPreference.categories[0]} />);

  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(2);
  expect((checkboxes[0] as HTMLInputElement).checked).toBe(true); // in-app
  expect((checkboxes[1] as HTMLInputElement).checked).toBe(false); // web-push
});

test('when preferences has three channels, it only renders a checkbox for each of those channels', () => {
  render(<CategoryPreferences category={threeChannelPreference.categories[0]} />);
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(3);
  expect((checkboxes[0] as HTMLInputElement).checked).toBe(true); // in-app
  expect((checkboxes[1] as HTMLInputElement).checked).toBe(true); // web-push
  expect((checkboxes[2] as HTMLInputElement).checked).toBe(false); // email
});

test('when preferences has no channels, it successfully renders no checkboxes without crashing', () => {
  const emptyChannels: CategoryChannelPreference = {
    label: '',
    slug: '',
    channels: [],
  };
  render(<CategoryPreferences category={emptyChannels} />);
  const checkboxes = screen.queryAllByRole('checkbox');
  expect(checkboxes).toHaveLength(0);
});

// skipping, this fails but we have a better one testing notification_preferences using msw
test.skip('updates the preferences for the inbox channel of the Comments category', async () => {
  render(<CategoryPreferences category={sampleNotificationPreferences.categories[0]} />);
  const { result } = renderHook(() => useNotificationPreferences());

  const inAppCheckbox = screen.getAllByRole('checkbox')[0];
  await userEvent.click(inAppCheckbox);

  const before = sampleNotificationPreferences.categories[0].channels[0].enabled;
  await waitFor(() => {
    const after = result.current.categories[0].channels[0].enabled;
    expect(before).toEqual(!after);
  });
});
