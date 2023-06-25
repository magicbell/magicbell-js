import { createCommand } from './lib/commands';
import { configStore } from './lib/config';
import { printMessage } from './lib/printer';

export const logout = createCommand('logout')
  .description('Logout of your MagicBell project')
  .action(async () => {
    configStore.delete('apiKey');
    configStore.delete('apiSecret');
    configStore.delete('projectId');
    configStore.delete('projectName');

    printMessage(`You are now logged out.`);
  });
