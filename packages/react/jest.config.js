/* eslint-disable @typescript-eslint/no-var-requires */
process.env.TZ = 'America/New_York';
const pkg = require('./package.json');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/coverage',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  coveragePathIgnorePatterns: ['/node_modules/', 'tests/'],
  restoreMocks: true,
  globals: {
    __DEV__: false,
    __PACKAGE_NAME__: pkg.name,
    __PACKAGE_VERSION__: pkg.version,

    'ts-jest': {
      tsconfig: {
        rootDir: '.',
      },
    },
  },
  testPathIgnorePatterns: ['/__utils__/'],
};
