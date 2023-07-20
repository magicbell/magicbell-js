// This file is generated. Do not update manually!

import { getProjectClient as getClient } from '../lib/client';
import { createCommand } from '../lib/commands';
import { parseOptions } from '../lib/options';
import { printJson } from '../lib/printer';

export const notifications = createCommand('notifications').description('Manage user notifications');

notifications
  .command('create')
  .description('Create notifications')
  .option('--title <string>', 'Title of the notification.')
  .option(
    '--content <string>',
    'Content of the notification. If you provide HTML content, the notification inbox will render it correctly. It should not exceed 4MB.',
  )
  .option(
    '--action-url <string>',
    'A URL to redirect the user to when they click the notification in their notification inbox.',
  )
  .option(
    '--recipients <object...>',
    'Users to send the notification to. You can specify up to 1000 users in the request body or use matches to send a notification to any number of users.',
  )
  .option(
    '--custom-attributes <object>',
    'Set of key-value pairs that you can attach to a notification, 6KB at maximum. It accepts objects for the value of a key.',
  )
  .option(
    '--category <string>',
    'Category the notification belongs to. This is useful to allow users to set their preferences.',
  )
  .option('--topic <string>', 'Topic the notification belongs to. This is useful to create threads.')
  .option('--overrides <object>', 'Optional overrides to configure notifications per target destination.')
  .action(async (opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.create(data, options);
    printJson(response);
  });
