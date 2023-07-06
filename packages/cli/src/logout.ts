import kleur from 'kleur';

import { createCommand } from './lib/commands';
import { configStore } from './lib/config';
import { printMessage } from './lib/printer';

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
      printMessage(`You are now logged out from project ${kleur.bold(project.name)}.`);
    }
  });
