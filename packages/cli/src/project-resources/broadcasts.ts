// This file is generated. Do not update manually!

import { getProjectClient as getClient } from '../lib/client';
import { createCommand } from '../lib/commands';
import { parseOptions } from '../lib/options';
import { printJson } from '../lib/printer';
import { broadcastsNotifications } from './broadcasts/notifications';

export const broadcasts = createCommand('broadcasts').description('Manage broadcasts');
broadcasts.addCommand(broadcastsNotifications);

broadcasts
  .command('create')
  .description('Create broadcasts')
  .option('--title <string>', 'Title of the broadcast.')
  .option('--content <string>', 'Content of the broadcast.')
  .option(
    '--action-url <string>',
    'A URL to redirect the user to when they click the notification in their notification inbox.',
  )
  .option(
    '--recipients <object...>',
    'Users to send the notification to. You can specify up to 1000 users in the request body.',
  )
  .option(
    '--custom-attributes <object>',
    'Nested key-value attributes that can be used for rendering in templates in MagicBell or third-party providers. Limited to 256KB - please see Overrides for another way to send channel specific data.',
  )
  .option(
    '--category <string>',
    'Category the notification belongs to. This is useful to allow users to set their preferences.',
  )
  .option(
    '--topic <string>',
    'Topic the notification belongs to. This is useful for creating threads or offering topic level unsubscriptions.',
  )
  .option('--overrides <object>', 'Optional overrides to configure notifications per target destination.')
  .action(async (opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).broadcasts.create(data, options);
    printJson(response);
  });

broadcasts
  .command('list')
  .description('List broadcasts')
  .option('--page <integer>', 'The page number of the paginated response. Defaults to 1.')
  .option('--per-page <integer>', 'The number of items per page. Defaults to 20.')
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .option('--max-items <number>', 'Maximum number of items to fetch', Number)
  .action(async ({ paginate, maxItems, ...opts }, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = getClient(cmd).broadcasts.list(data, options);

    if (paginate) {
      await response.forEach((notification, idx) => {
        printJson(notification);
        return !(maxItems && idx + 1 >= maxItems);
      });
    } else {
      await response.then((result) => printJson(result));
    }
  });

broadcasts
  .command('get')
  .description('Fetch a broadcast by its ID')
  .argument('<broadcast-id>', 'ID of the broadcast.')
  .action(async (broadcastId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).broadcasts.get(broadcastId, options);
    printJson(response);
  });
