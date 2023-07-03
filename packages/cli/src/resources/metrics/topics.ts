// This file is generated. Do not update manually!

import { getClient } from '../../lib/client';
import { createCommand } from '../../lib/commands';
import { parseOptions } from '../../lib/options';
import { printJson } from '../../lib/printer';

export const metricsTopics = createCommand('topics').description('Manage metrics topics');

metricsTopics
  .command('get')
  .description('Get notification metrics grouped by topic')
  .action(async (opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).metrics.topics.get(options);
    printJson(response);
  });
