// This file is generated. Do not update manually!

import { getProjectClient as getClient } from '../../lib/client.js';
import { createCommand } from '../../lib/commands.js';
import { parseOptions } from '../../lib/options.js';
import { printJson } from '../../lib/printer.js';

export const metricsCategories = createCommand('categories').description('');

metricsCategories
  .command('get')
  .description('Get notification metrics grouped by category')
  .action(async (opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).metrics.categories.get(options);
    printJson(response);
  });
