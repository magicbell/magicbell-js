// This file is generated. Do not update manually!

import { getClient } from '../../lib/client';
import { createCommand } from '../../lib/commands';
import { parseOptions } from '../../lib/options';
import { printJson } from '../../lib/printer';

export const metricsCategories = createCommand('categories').description('Manage metrics categories');

metricsCategories
  .command('get')
  .description('Get notification metrics grouped by category')
  .action(async (opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().metrics.categories.get(options);
    printJson(response);
  });
