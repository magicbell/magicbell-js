// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../client';
import { printJson } from '../lib/printer';
import { parseOptions } from '../options';
import { metricsCategories } from './metrics/categories';
import { metricsTopics } from './metrics/topics';

export const metrics = new Command('metrics').description('Manage metrics');
metrics.addCommand(metricsCategories);
metrics.addCommand(metricsTopics);

metrics
  .command('get')
  .description('Get notification metrics')
  .action(async (opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().metrics.get(options);
    printJson(response);
  });
