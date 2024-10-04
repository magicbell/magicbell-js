// This file is generated. Do not update manually!

import { getProjectClient as getClient } from '../lib/client.js';
import { createCommand } from '../lib/commands.js';
import { parseOptions } from '../lib/options.js';
import { printJson } from '../lib/printer.js';

export const imports = createCommand('imports').description('Manage imports');

imports
  .command('create')
  .description('Create a import')
  .option('--users <object...>', '')
  .action(async (opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).imports.create(data, options);
    printJson(response);
  });

imports
  .command('get')
  .description('Get the status of an import')
  .argument('<import-id>', 'ID of the import.')
  .action(async (importId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).imports.get(importId, options);
    printJson(response);
  });
