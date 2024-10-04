// This file is generated. Do not update manually!

import { getProjectClient as getClient } from '../lib/client.js';
import { createCommand } from '../lib/commands.js';
import { parseOptions } from '../lib/options.js';
import { printJson } from '../lib/printer.js';
import { metricsCategories } from './metrics/categories.js';
import { metricsTopics } from './metrics/topics.js';

export const metrics = createCommand('metrics').description('Manage metrics');
metrics.addCommand(metricsCategories);
metrics.addCommand(metricsTopics);

metrics
  .command('get')
  .description('Get notification metrics')
  .action(async (opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).metrics.get(options);
    printJson(response);
  });
