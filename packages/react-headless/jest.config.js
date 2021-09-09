// eslint-disable-next-line no-undef
module.exports = {
  coverageDirectory: '<rootDir>/coverage',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  coveragePathIgnorePatterns: ['/node_modules/', 'tests/'],
  restoreMocks: true,
};
