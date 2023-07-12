// This file is generated. Do not update manually!

import { getProjectClient as getClient } from '../../lib/client';
import { createCommand } from '../../lib/commands';
import { parseOptions } from '../../lib/options';
import { printJson } from '../../lib/printer';

export const metricsCategories = createCommand('categories').description('');

metricsCategories
  .command('get')
  .description('Get notification metrics grouped by category')
  .action(async (opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).metrics.categories.get(options);
    printJson(response);
  });
