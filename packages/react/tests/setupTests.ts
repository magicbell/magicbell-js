import '@testing-library/jest-dom/extend-expect';

const _consoleError = console.error.bind(console);
console.error = (message, ...args) => {
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
