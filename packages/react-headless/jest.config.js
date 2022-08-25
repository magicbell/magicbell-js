/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('./package.json');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/coverage',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  coveragePathIgnorePatterns: ['/node_modules/', 'tests/'],
  restoreMocks: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  globals: {
    __DEV__: false,
    __PACKAGE_NAME__: pkg.name,
    __PACKAGE_VERSION__: pkg.version,
  },
};
