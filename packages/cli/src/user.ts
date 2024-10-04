import { createCommand } from './lib/commands.js';
import { configStore } from './lib/config.js';
import { printError } from './lib/printer.js';
import { listen } from './listen.js';
import * as userResources from './user-resources/index.js';

export const user = createCommand('user')
  .summary("Manage a users' notifications & preferences")
  .description(
    `Manage users for user notifications & preferences.
  
  If you're primarily using this api with your own account, it's also possible to
  persist the \`userEmail\` or \`userExternalId\` via \`magicbell config set\`.
  `,
  )
  .option('--email, --user-email <string>', 'Email of the user')
  .option('--id, --user-external-id <string>', 'External ID of the user')
  .option('--hmac, --user-hmac <string>', 'User HMAC key')
  .hook('preAction', function (thisCommand) {
    const options = thisCommand.opts();
    const { profile } = thisCommand.optsWithGlobals();
    const project = configStore.getProject(profile);

    if (!options.userEmail && !options.userExternalId && !project.userEmail && !project.userExternalId) {
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
