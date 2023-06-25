import { Command } from 'commander';

export const findTopCommand = (command: Command) => {
  while (command.parent.name() !== __PACKAGE_NAME__) {
    command = command.parent;
  }

  return command;
};
