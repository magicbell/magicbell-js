// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../../client';
import { printJson } from '../../lib/printer';
import { parseOptions } from '../../options';

export const metricsCategories = new Command('categories').description('Manage metrics categories');

metricsCategories
  .command('get')
  .description('Get notification metrics grouped by category')
  .action(async (opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().metrics.categories.get(options);
    printJson(response);
  });
