import '@testing-library/jest-dom/extend-expect';

import { useConfig, useNotificationPreferences } from '@magicbell/react-headless';

const _consoleError = console.error.bind(console);
console.error = (message, ...args) => {
  // ignore emotion: The pseudo class ":first-child" is potentially unsafe when doing server-side rendering
  if (/The pseudo class/i.test(message)) return;

  // ignore react error, which occurs when we symlink react
  if (/ReactDOM.render is no longer supported in React 18/i.test(message)) return;

  // Tests having act errors can be flacky, let's prevent flacky tests by making them fail
  if (/test was not wrapped in act/i.test(message)) {
    throw new Error(message);
  }

  // another flacky test that should just bubble up
  if (/Cannot update a component .* while rendering a different component/) {
    throw new Error(message);
  }

  _consoleError(message, ...args);
};

global.open = jest.fn();

beforeEach(() => {
  useConfig.setState({ lastFetchedAt: Date.now() });
  useNotificationPreferences.setState({ lastFetchedAt: Date.now() });
});
