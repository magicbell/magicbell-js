import '@testing-library/jest-dom';

import { useConfig, useNotificationPreferences } from '@magicbell/react-headless';
import EventSource from 'eventsource';

if (!globalThis.EventSource) {
  globalThis.EventSource = EventSource;
}

// it's defined in vitest environment
// eslint-disable-next-line no-undef
window.open = vi.fn();

beforeEach(() => {
  useConfig.setState({ lastFetchedAt: Date.now() });
  useNotificationPreferences.setState({ lastFetchedAt: Date.now() });
});
