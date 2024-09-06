import 'jest';

import { type TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace jest {
    interface Matchers<R> extends TestingLibraryMatchers<ReturnType<typeof expect.stringContaining>, R> {}
  }
}

export {};
