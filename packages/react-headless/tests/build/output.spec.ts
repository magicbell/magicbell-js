/* eslint-disable @typescript-eslint/no-var-requires */
import { transform } from '@babel/core';
import { exec } from 'child_process';
import { existsSync, readFileSync } from 'fs';

const pkg = require('../../package.json');

function importBundle(filepath: string) {
  const source = readFileSync(filepath, { encoding: 'utf-8' });

  try {
    const module = require(`../../${filepath}`);
    return { source, module };
  } catch {}

  const commonjs = transform(source, {
    babelrc: false,
    compact: false,
    plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
  });

  const module = eval(`(function() { ${commonjs?.code}; return exports; })()`);
  return { source, module };
}

function assertShape(module: any) {
  // we don't need to test it all, we just want to assert shape
  expect(typeof module.MagicBellProvider).toEqual('function');
  expect(typeof module.RealtimeListener).toEqual('function');
  expect(typeof module.WebPushNotificationsSubscriber).toEqual('function');
  expect(typeof module.useConfig).toEqual('function');
  expect(typeof module.useNotification).toEqual('function');
}

jest.setTimeout(60_000);

beforeAll(() => {
  // don't rebuild all the time when running in wallaby
  if (process.env.WALLABY_ENV && existsSync('./dist')) return;
  exec('yarn build');
});

test('creates all bundles', () => {
  expect(pkg.main).toEqual('dist/magicbell-react-headless.js');
  expect(pkg.module).toEqual('dist/magicbell-react-headless.esm.js');
  expect(pkg.unpkg).toEqual('dist/magicbell-react-headless.umd.js');
  expect(pkg.typings).toEqual('dist/index.d.ts');
});

test('can import functions from main module', () => {
  const { source, module } = importBundle(pkg.main);

  expect(source).toMatch(/require\("react"\)/i);
  expect(source).not.toMatch(/import.*from\s?"react"/i);
  assertShape(module);
});

test('can import functions from esm module', async () => {
  const { source, module } = importBundle(pkg.module);

  expect(source).toMatch(/import.*from\s?"react"/i);
  expect(source).not.toMatch(/require\("react"\)/i);
  assertShape(module);
});

test('can import functions from umd module', async () => {
  const { source, module } = importBundle(pkg.unpkg);

  expect(source).toMatch(/"object"\s?==\s?typeof exports\s?&&\s?"undefined"\s?!=\s?typeof module/i);
  expect(source).toMatch(/require\("react"\)/i);
  expect(source).not.toMatch(/import.*from\s?"react"/i);
  assertShape(module);
});

test('exports types from index.d.ts', () => {
  const { source } = importBundle(pkg.typings);

  const lines = source.split('\n').filter((x) => x.trim().length > 0);
  expect(lines.length).toBeGreaterThan(1);

  for (const line of lines) {
    expect(line).toMatch(/^export.*from.*/i);
  }
});
