import { createCommand } from './lib/commands.js';
import { configStore } from './lib/config.js';
import { printMessage } from './lib/printer.js';

export const logout = createCommand('logout')
  .description('Logout of your MagicBell account')
  .option('-a, --all', 'Clear credentials for all projects you are logged in to', false)
  .action(async (opts, cmd) => {
    const { profile } = cmd.optsWithGlobals();

    if (opts.all) {
      configStore.clearProjects();
      printMessage(`You are now logged out from all projects.`);
    } else {
      const project = configStore.getProject(profile);
      if (!project) {
        printMessage(`You are not logged in.`);
        return;
      }

      configStore.unsetProject(profile);
      printMessage(`You are now logged out.`);
    }
  });
