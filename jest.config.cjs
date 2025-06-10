const tsconf = require('./tsconfig.json');

// convert tsconfig paths to jest moduleNameMapper
//  { '@magicbell/core': [ 'packages/core/src' ] } > { '@magicbell/core': '<rootDir>/packages/core/src' }
const moduleNameMapper = Object.fromEntries(
  Object.entries(tsconf.compilerOptions.paths)
    .filter((x) => x[1][0].startsWith('packages'))
    .map((x) => [x[0], x[1][0].replace(/^packages/, '<rootDir>/packages')]),
);

// import foo.ts as foo.js
moduleNameMapper['(.+/.*)\\.js'] = '$1';

// { '@magicbell/core': '<rootDir>/packages/core/src' } > [['@magicbell/core', '<rootDir>/packages/core']]
const packages = Object.entries(moduleNameMapper)
  .map(([pkg, dir]) => [pkg, dir.split('/').slice(0, 3).join('/')])
  .sort(([a], [b]) => a.localeCompare(b))
  // this package has a non-jest test runner
  .filter((x) => x[0] !== '@magicbell/in-app');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const commonConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '\\.[jt]sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  resolver: './jest.resolver.cjs',
  moduleFileExtensions: ['ts', 'tsx', 'cts', 'js', 'json'],
  modulePathIgnorePatterns: [
    '<rootDir>/packages/magicbell/dist',
    '<rootDir>/packages/playground',
    '<rootDir>/packages/embeddable/cypress',
  ],
  globals: {
    __PACKAGE_NAME__: 'TEST',
    __PACKAGE_VERSION__: '0.0.0',
    __DEV__: false,
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  clearMocks: true,
  resetMocks: true,
  moduleNameMapper,
};

const projectConfigs = {
  'magicbell-js': {
    testEnvironment: 'node',
  },
};

/** @type {import('jest').Config} */
module.exports = {
  projects: packages.map(([name, dir]) => ({
    ...commonConfig,
    displayName: name,
    testMatch: [`${dir}/src/**/*.test.[jt]s?(x)"`, `${dir}/test/**/*.[jt]s?(x)"`, `${dir}/tests/**/*.spec.[jt]s?(x)"`],
    ...projectConfigs[name],
  })),
};
