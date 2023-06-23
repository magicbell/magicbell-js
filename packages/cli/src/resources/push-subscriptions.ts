// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../client';
import { printJson } from '../lib/printer';
import { parseOptions } from '../options';

export const pushSubscriptions = new Command('push-subscriptions').description('Manage push subscriptions');

pushSubscriptions
  .command('create')
  .description('Register a device token for a user')
  .option(
    '--device-token <string>',
    'Token that identifies the device. This is usually generated automatically by your app once installed.',
  )
  .option(
    '--platform <string>',
    "The platform where the device token was generated from. This value is used to determine the delivery mechanism for mobile push notifications. Either 'ios', 'android' or 'safari'.",
  )
  .option(
    '--app-bundle-id <string>',
    'The bundle ID of your app. This value is used to determine the delivery mechanism for mobile push notifications based on your workflow so that you can link several mobile applications to one project.',
  )
  .action(async (opts) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient().pushSubscriptions.create(data, options);
    printJson(response);
  });

pushSubscriptions
  .command('delete')
  .description("Delete user's device token")
  .argument('<device-token>', 'Token of the device you want to remove')
  .action(async (deviceToken, opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().pushSubscriptions.delete(deviceToken, options);
    printJson(response);
  });
