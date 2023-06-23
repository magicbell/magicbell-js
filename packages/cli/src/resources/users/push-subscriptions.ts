// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../../client';
import { printJson } from '../../lib/printer';
import { parseOptions } from '../../options';

export const usersPushSubscriptions = new Command('push-subscriptions').description('Manage users push-subscriptions');

usersPushSubscriptions.configureHelp({
  sortSubcommands: true,
});

usersPushSubscriptions
  .command('list')
  .description("Fetch user's push subscriptions")
  .argument('<user-id>', 'The user id is the MagicBell user id. Accepts a UUID')
  .option('--page <integer>', 'The page number of the paginated response. Defaults to 1.')
  .option('--per-page <integer>', 'The number of items per page. Defaults to 20.')
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .action(async (userId, { paginate, ...opts }) => {
    const { data, options } = parseOptions(opts);

    const response = getClient().users.pushSubscriptions.list(userId, data, options);

    if (paginate) {
      await response.forEach((notification) => printJson(notification));
    } else {
      await response.then((result) => printJson(result));
    }
  });

usersPushSubscriptions
  .command('delete')
  .description("Delete user's push subscription")
  .argument('<user-id>', 'The user id is the MagicBell user id. Accepts a UUID')
  .argument('<subscription-id>', 'ID of the subscription.')
  .action(async (userId, subscriptionId, opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().users.pushSubscriptions.delete(userId, subscriptionId, options);
    printJson(response);
  });
