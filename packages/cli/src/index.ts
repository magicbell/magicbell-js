import { Command } from 'commander';

import { assertConfigured, config } from './config';
import { listen } from './listen';
import * as resources from './resources';
import { whoami } from './whoami';

const program = new Command();

program.name(__PACKAGE_NAME__).description('CLI access to the MagicBell REST api').version(__PACKAGE_VERSION__);

program.hook('preAction', (thisCommand, actionCommand) => {
  if (actionCommand.name() === 'config') return;
  assertConfigured();
});

program.addCommand(config);
program.addCommand(listen);
program.addCommand(whoami);

program.showHelpAfterError();

for (const resource of Object.values(resources)) {
  program.addCommand(resource);
}

program.parse();
