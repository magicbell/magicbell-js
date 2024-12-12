/* eslint-disable */
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

import { useConfig, useNotificationPreferences } from '@magicbell/react-headless';
import { EventSource } from 'eventsource';
import fetch, { Headers, Request, Response } from 'node-fetch';

globalThis.fetch = fetch as any;
globalThis.Headers = Headers as any;
globalThis.Request = Request as any;
globalThis.Response = Response as any;

if (!globalThis.EventSource) {
  globalThis.EventSource = EventSource;
}

// it's defined in vitest environment
// eslint-disable-next-line no-undef
if (typeof window !== 'undefined') {
  window.open = jest.fn();
}

beforeEach(() => {
  useConfig.setState({ lastFetchedAt: Date.now() });
  useNotificationPreferences.setState({ lastFetchedAt: Date.now() });
});

const _log = console.log;
console.log = (...args: any[]) => {
  if (String(args[0]).startsWith('sse error:')) return;
  _log(...args);
}
