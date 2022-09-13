import '@testing-library/jest-dom';

import { useConfig, useNotificationPreferences } from '@magicbell/react-headless';

// it's defined in vitest environemtn
// eslint-disable-next-line no-undef
window.open = vi.fn();

beforeEach(() => {
  useConfig.setState({ lastFetchedAt: Date.now() });
  useNotificationPreferences.setState({ lastFetchedAt: Date.now() });
});
