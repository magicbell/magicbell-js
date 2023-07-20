// This file is generated. Do not update manually!

import { getUserClient as getClient } from '../lib/client';
import { createCommand } from '../lib/commands';
import { parseOptions } from '../lib/options';
import { printJson } from '../lib/printer';

export const pushSubscriptions = createCommand('push-subscriptions').description('Manage user push subscriptions');

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
  .action(async (opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).pushSubscriptions.create(data, options);
    printJson(response);
  });

pushSubscriptions
  .command('list')
  .description("List user's device tokens")
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .option('--max-items <number>', 'Maximum number of items to fetch', Number)
  .action(async ({ paginate, maxItems, ...opts }, cmd) => {
    const { options } = parseOptions(opts);

    const response = getClient(cmd).pushSubscriptions.list(options);

    if (paginate) {
      await response.forEach((notification, idx) => {
        printJson(notification);
        return !(maxItems && idx + 1 >= maxItems);
      });
    } else {
      await response.then((result) => printJson(result));
    }
  });

pushSubscriptions
  .command('delete')
  .description("Delete user's device token")
  .argument('<device-token>', 'Token of the device you want to remove')
  .action(async (deviceToken, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).pushSubscriptions.delete(deviceToken, options);
    printJson(response);
  });
