/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/coverage',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  coveragePathIgnorePatterns: ['/node_modules/', 'tests/'],
  restoreMocks: true,
};
