// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../../client';
import { printJson } from '../../lib/printer';
import { parseOptions } from '../../options';

export const usersNotifications = new Command('notifications').description('Manage users notifications');

usersNotifications
  .command('list')
  .description('Fetch notifications by user id.')
  .argument('<user-id>', 'The user id is the MagicBell user id. Accepts a UUID')
  .option('--page <integer>', 'The page number of the paginated response. Defaults to 1.')
  .option('--per-page <integer>', 'The number of items per page. Defaults to 20.')
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .action(async (userId, { paginate, ...opts }) => {
    const { data, options } = parseOptions(opts);

    const response = getClient().users.notifications.list(userId, data, options);

    if (paginate) {
      await response.forEach((notification) => printJson(notification));
    } else {
      await response.then((result) => printJson(result));
    }
  });
