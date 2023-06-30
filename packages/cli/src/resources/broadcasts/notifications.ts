// This file is generated. Do not update manually!

import { getClient } from '../../lib/client';
import { createCommand } from '../../lib/commands';
import { parseOptions } from '../../lib/options';
import { printJson } from '../../lib/printer';

export const broadcastsNotifications = createCommand('notifications').description('Manage broadcasts notifications');

broadcastsNotifications
  .command('list')
  .description('Fetch notifications by broadcast id.')
  .argument('<broadcast-id>', 'ID of the notification broadcast.')
  .option('--page <integer>', 'The page number of the paginated response. Defaults to 1.')
  .option('--per-page <integer>', 'The number of items per page. Defaults to 20.')
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .option('--max-items <number>', 'Maximum number of items to fetch', Number)
  .action(async (broadcastId, { paginate, maxItems, ...opts }) => {
    const { data, options } = parseOptions(opts);

    const response = getClient().broadcasts.notifications.list(broadcastId, data, options);

    if (paginate) {
      await response.forEach((notification, idx) => {
        printJson(notification);
        return !(maxItems && idx + 1 >= maxItems);
      });
    } else {
      await response.then((result) => printJson(result));
    }
  });
