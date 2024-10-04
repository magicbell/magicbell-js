// This file is generated. Do not update manually!

import { getProjectClient as getClient } from '../../lib/client.js';
import { createCommand } from '../../lib/commands.js';
import { parseOptions } from '../../lib/options.js';
import { printJson } from '../../lib/printer.js';

export const metricsTopics = createCommand('topics').description('');

metricsTopics
  .command('get')
  .description('Get notification metrics grouped by topic')
  .action(async (opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).metrics.topics.get(options);
    printJson(response);
  });
