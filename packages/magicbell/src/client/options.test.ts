import { expect, test } from 'vitest';

import { assertHasRequiredOptions, assertHasSomeOptions, assertHasValidOptions } from './options';

test('throws if one of the options is in unexpected format', async () => {
  expect(() => assertHasValidOptions({ apiKey: 'test', first: '1000', second: 1, third: true })).toThrow(
    'You have provided invalid client options. Please check the options first, second, and third.',
  );
});

test('does not throw if all options are in expected format', async () => {
  expect(() => assertHasValidOptions({ apiKey: 'test' })).not.toThrow();
});

test('throws if one of the required options is absent', async () => {
  expect(() => assertHasRequiredOptions({ apiKey: 'test' }, ['userEmail'])).toThrow(
    'You have not provided all required client options. Please provide userEmail.',
  );
});

test('does not throw if required option is provided', async () => {
  expect(() =>
    assertHasRequiredOptions({ apiKey: 'test', userEmail: 'person@example.com' }, ['userEmail']),
  ).not.toThrow();
});

test('throws if none of the required options are provided', async () => {
  expect(() => assertHasSomeOptions({ apiKey: 'test' }, ['userEmail', 'userExternalId'])).toThrow(
    'You have not provided any of the required client options. Please provide userEmail or userExternalId.',
  );
});

test('does not throw if some of the options are provided', async () => {
  expect(() =>
    assertHasSomeOptions({ apiKey: 'test', userEmail: 'person@example.com' }, ['userEmail', 'userExternalId']),
  ).not.toThrow();
});

test('does not throw if all of the options are provided', async () => {
  expect(() =>
    assertHasSomeOptions({ apiKey: 'test', userEmail: 'person@example.com', userExternalId: '123' }, [
      'userEmail',
      'userExternalId',
    ]),
  ).not.toThrow();
});
