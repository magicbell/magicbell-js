// This file is generated. Do not update manually!

import { getProjectClient as getClient } from '../../lib/client';
import { createCommand } from '../../lib/commands';
import { parseOptions } from '../../lib/options';
import { printJson } from '../../lib/printer';

export const usersNotifications = createCommand('notifications').description('');

usersNotifications
  .command('list')
  .description('Fetch notifications by user id.')
  .argument('<user-id>', 'The user id is the MagicBell user id. Accepts a UUID')
  .option('--page <integer>', 'The page number of the paginated response. Defaults to 1.')
  .option('--per-page <integer>', 'The number of items per page. Defaults to 20.')
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .option('--max-items <number>', 'Maximum number of items to fetch', Number)
  .action(async (userId, { paginate, maxItems, ...opts }, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = getClient(cmd).users.notifications.list(userId, data, options);

    if (paginate) {
      await response.forEach((notification, idx) => {
        printJson(notification);
        return !(maxItems && idx + 1 >= maxItems);
      });
    } else {
      await response.then((result) => printJson(result));
    }
  });
