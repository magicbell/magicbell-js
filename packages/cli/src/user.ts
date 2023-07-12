import { createCommand } from './lib/commands';
import { printError } from './lib/printer';
import { listen } from './listen';
import * as userResources from './user-resources';

export const user = createCommand('user')
  .description("Manage a users' notifications & preferences")
  .option('--email, --user-email <string>', 'Email of the user')
  .option('--id, --user-external-id <string>', 'External ID of the user')
  .option('--hmac, --user-hmac <string>', 'User HMAC key')
  .hook('preAction', function (thisCommand) {
    const options = thisCommand.opts();

    if (!options.userEmail && !options.userExternalId) {
      printError('You must specify either --user-email or --user-external-id', true);
    }

    if (options.userEmail && options.userExternalId) {
      printError('You can only specify one of --user-email or --user-external-id', true);
    }
  });

const commands = Object.values(userResources);
for (const command of [...commands, listen]) {
  user.addCommand(command);
}
