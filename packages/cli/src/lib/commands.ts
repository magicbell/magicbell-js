import { Command } from 'commander';

export function createCommand(name?: string) {
  const command = new Command(name);

  command.showHelpAfterError(true);

  command.configureHelp({
    sortSubcommands: true,
  });

  return command;
}

export function findTopCommand(command: Command) {
  while (command.parent.name() !== __PACKAGE_NAME__) {
    command = command.parent;
  }

  return command;
}

export function findCommand(command: Command, names: string[]) {
  for (const name of names) {
    const subCommand = command.commands.find((c) => c.name() === name);
    if (!subCommand) break;
    command = subCommand;
  }

  return command;
}
