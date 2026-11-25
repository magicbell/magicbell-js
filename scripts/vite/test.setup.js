/* eslint-disable */
// noinspection JSConstantReassignment

import '@testing-library/jest-dom/vitest';

import EventSource from 'eventsource';

globalThis.EventSource ??= EventSource;

// it's defined in vitest environment
// eslint-disable-next-line no-undef
if (typeof window !== 'undefined') {
  window.open = vi.fn();
}

const _log = console.log;
console.log = (...args) => {
  if (String(args[0]).startsWith('sse error:')) return;
  _log(...args);
}
