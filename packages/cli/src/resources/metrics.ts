// This file is generated. Do not update manually!

import { getClient } from '../lib/client';
import { createCommand } from '../lib/commands';
import { parseOptions } from '../lib/options';
import { printJson } from '../lib/printer';
import { metricsCategories } from './metrics/categories';
import { metricsTopics } from './metrics/topics';

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
