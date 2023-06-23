// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../../lib/client';
import { parseOptions } from '../../lib/options';
import { printJson } from '../../lib/printer';

export const metricsTopics = new Command('topics').description('Manage metrics topics');

metricsTopics.configureHelp({
  sortSubcommands: true,
});

metricsTopics
  .command('get')
  .description('Get notification metrics grouped by topic')
  .action(async (opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().metrics.topics.get(options);
    printJson(response);
  });
