// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../client';
import { printJson } from '../lib/printer';
import { parseOptions } from '../options';
import { broadcastsNotifications } from './broadcasts/notifications';

export const broadcasts = new Command('broadcasts').description('Manage broadcasts');

broadcasts.configureHelp({
  sortSubcommands: true,
});

broadcasts.addCommand(broadcastsNotifications);

broadcasts
  .command('list')
  .description('List notification broadcasts')
  .option('--page <integer>', 'The page number of the paginated response. Defaults to 1.')
  .option('--per-page <integer>', 'The number of items per page. Defaults to 20.')
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .action(async ({ paginate, ...opts }) => {
    const { data, options } = parseOptions(opts);

    const response = getClient().broadcasts.list(data, options);

    if (paginate) {
      await response.forEach((notification) => printJson(notification));
    } else {
      await response.then((result) => printJson(result));
    }
  });

broadcasts
  .command('get')
  .description('Fetch a notification broadcast by its ID')
  .argument('<broadcast-id>', 'ID of the notification broadcast.')
  .action(async (broadcastId, opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().broadcasts.get(broadcastId, options);
    printJson(response);
  });
