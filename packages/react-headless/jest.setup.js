/* eslint-disable no-console */

// wrap console.error to silence the warning.
const _error = console.error;
console.error = (msg, ...args) => {
  if (/ ReactDOM.render is no longer supported in React 18/i.test(msg)) return;
  return _error(msg, ...args);
};
