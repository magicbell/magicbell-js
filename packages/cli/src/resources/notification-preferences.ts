// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../client';
import { printJson } from '../lib/printer';
import { parseOptions } from '../options';

export const notificationPreferences = new Command('notification-preferences').description(
  'Manage notification preferences',
);

notificationPreferences
  .command('get')
  .description('Fetch user notification preferences')
  .action(async (opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().notificationPreferences.get(options);
    printJson(response);
  });

notificationPreferences
  .command('update')
  .description('Update user notification preferences')
  .option('--categories <string...>', '')
  .action(async (opts) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient().notificationPreferences.update(data, options);
    printJson(response);
  });
