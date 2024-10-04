// This file is generated. Do not update manually!

import { getUserClient as getClient } from '../lib/client.js';
import { createCommand } from '../lib/commands.js';
import { parseOptions } from '../lib/options.js';
import { printJson } from '../lib/printer.js';

export const notificationPreferences = createCommand('notification-preferences').description(
  'Manage user notification preferences',
);

notificationPreferences
  .command('get')
  .description('Fetch user notification preferences')
  .action(async (opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).notificationPreferences.get(options);
    printJson(response);
  });

notificationPreferences
  .command('update')
  .description('Update user notification preferences')
  .option('--categories <object...>', '')
  .action(async (opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).notificationPreferences.update(data, options);
    printJson(response);
  });
