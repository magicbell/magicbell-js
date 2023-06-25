// This file is generated. Do not update manually!

import { getClient } from '../lib/client';
import { createCommand } from '../lib/commands';
import { parseOptions } from '../lib/options';
import { printJson } from '../lib/printer';

export const imports = createCommand('imports').description('Manage imports');

imports
  .command('create')
  .description('Create a import')
  .option('--users <string...>', '')
  .action(async (opts) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient().imports.create(data, options);
    printJson(response);
  });

imports
  .command('get')
  .description('Get the status of an import')
  .argument('<import-id>', 'ID of the import.')
  .action(async (importId, opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().imports.get(importId, options);
    printJson(response);
  });
