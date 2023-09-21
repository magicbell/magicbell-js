const tsconf = require('./tsconfig.json');

// convert tsconfig paths to jest moduleNameMapper
//  { '@magicbell/core': [ 'packages/core/src' ] } > { '@magicbell/core': '<rootDir>/packages/core/src' }
const moduleNameMapper = Object.fromEntries(
  Object.entries(tsconf.compilerOptions.paths)
    .filter(x => x[1][0].startsWith('packages'))
    .map(x => [x[0], x[1][0].replace(/^packages/, '<rootDir>/packages')])
  );

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/packages/magicbell/dist', '<rootDir>/packages/playground', '<rootDir>/packages/embeddable/cypress'],
  globals: {
    __PACKAGE_NAME__: 'TEST',
    __PACKAGE_VERSION__: '0.0.0',
    __DEV__: false,
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],
  clearMocks: true,
  resetMocks: true,
  moduleNameMapper,
};
