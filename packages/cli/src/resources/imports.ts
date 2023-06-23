// This file is generated. Do not update manually!

import { Command } from 'commander';

import { getClient } from '../client';
import { printJson } from '../lib/printer';
import { parseOptions } from '../options';

export const imports = new Command('imports').description('Manage imports');

imports.configureHelp({
  sortSubcommands: true,
});

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
