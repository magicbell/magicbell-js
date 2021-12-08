import { useNotificationPreferences } from '@magicbell/react-headless';
import { screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { createServer } from 'miragejs';
import React from 'react';
import UserPreferencesPanel from '../../../../src/components/UserPreferencesPanel';
import { renderWithProviders as render } from '../../../__utils__/render';
import userEvent from '@testing-library/user-event';

let server;

beforeEach(() => {
  server = createServer({
    environment: 'test',
    urlPrefix: 'https://api.magicbell.com',
    timing: 50,
  });

  server.get('/notification_preferences', {
    notification_preferences: {
      categories: {
        comments: { email: false },
      },
    },
  });

  server.get('/config', {});
});

afterEach(() => {
  server.shutdown();
});

test('one', () => {
  expect(1).toEqual(1)
});

test('fetches notification preferences', async () => {
  const { waitForValueToChange, result } = renderHook(() => useNotificationPreferences());
  const spy = jest.spyOn(result.current, 'fetch');

  render(<UserPreferencesPanel onClose={jest.fn()} />);

  expect(spy).toHaveBeenCalledTimes(1);
  await waitForValueToChange(() => result.current.categories);
});

// TODO: doesn't work, do we need to delay mirage?
test.skip('renders a container for notification preferences before the preferences are fetched', () => {
  render(<UserPreferencesPanel onClose={jest.fn()} />);

  screen.getByText(/in-app/i);
  expect(screen.queryAllByRole('checkbox')?.[0]).not.toBeInTheDocument();
});

test('renders preferences for all categories when they are fetched', async () => {
  render(<UserPreferencesPanel onClose={jest.fn()} />);

  screen.getByText(/in-app/i);
  expect(screen.queryAllByRole('checkbox')?.[0]).toBeInTheDocument();
});

test('renders localized strings', async () => {
  render(<UserPreferencesPanel onClose={jest.fn()} />, { locale: 'es' });

  screen.getByText(/preferencias/i);
});

test('calls the onClose callback', () => {
  const onClose = jest.fn();

  render(<UserPreferencesPanel onClose={onClose} />);

  const button = screen.getByRole('button');
  userEvent.click(button);

  expect(onClose).toHaveBeenCalledTimes(1);
  expect(onClose).toHaveBeenCalledWith();
});
