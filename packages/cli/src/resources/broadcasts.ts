// This file is generated. Do not update manually!

import { getClient } from '../lib/client';
import { createCommand } from '../lib/commands';
import { parseOptions } from '../lib/options';
import { printJson } from '../lib/printer';
import { broadcastsNotifications } from './broadcasts/notifications';

export const broadcasts = createCommand('broadcasts').description('Manage broadcasts');
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
