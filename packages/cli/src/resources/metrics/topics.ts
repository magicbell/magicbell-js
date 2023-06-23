// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../../client';
import { printJson } from '../../lib/printer';
import { parseOptions } from '../../options';

export const metricsTopics = new Command('topics').description('Manage metrics topics');

metricsTopics
  .command('get')
  .description('Get notification metrics grouped by topic')
  .action(async (opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().metrics.topics.get(options);
    printJson(response);
  });
