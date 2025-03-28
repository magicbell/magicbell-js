/* eslint-disable */
// noinspection JSConstantReassignment

import '@testing-library/jest-dom/vitest';

import EventSource from 'eventsource';

globalThis.EventSource ??= EventSource;

import { act } from "@testing-library/react";
import { useConfig, useNotificationPreferences } from '@magicbell/react-headless';

// it's defined in vitest environment
// eslint-disable-next-line no-undef
if (typeof window !== 'undefined') {
  window.open = vi.fn();
}

beforeEach(() => {
  act(()=> {
    useConfig.setState({ lastFetchedAt: Date.now() });
    useNotificationPreferences.setState({ lastFetchedAt: Date.now() });
  })
});

const _log = console.log;
console.log = (...args) => {
  if (String(args[0]).startsWith('sse error:')) return;
  _log(...args);
}
