import { Command } from 'commander';

import { formatHelp } from './help.js';

type ExtendedCommand = Command & {
  group(name): ExtendedCommand;
};

export function createCommand(name?: string): ExtendedCommand {
  const command = new Command(name) as ExtendedCommand;

  command.helpOption('--help', 'Show help for command');
  command.showHelpAfterError(true);
  command.addHelpCommand(false);

  command.configureHelp({
    sortSubcommands: true,
    showGlobalOptions: true,
    subcommandTerm: (cmd) => cmd.name(),
    formatHelp: formatHelp,
  });

  command.group = (group) => {
    (command as any)._group = group;
    return command;
  };

  return command;
}

export function findTopCommand(command: Command) {
  while (command.parent?.parent) {
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
