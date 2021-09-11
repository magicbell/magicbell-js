/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/coverage',
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  coveragePathIgnorePatterns: ['/node_modules/', 'tests/'],
  restoreMocks: true,
};
