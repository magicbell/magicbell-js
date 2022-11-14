import * as vscode from 'vscode';

export const commands = {
  register(command: string, cb: (...args: any[]) => any) {
    return vscode.commands.registerCommand(command, cb);
  },

  execute(command: string, data: any) {
    return vscode.commands.executeCommand(command, data);
  },

  setContext(key: string, value: any) {
    vscode.commands.executeCommand('setContext', key, value);
  },

  clearContext(key: string) {
    vscode.commands.executeCommand('setContext', key, null);
  },

  showDetailPane() {
    vscode.commands.executeCommand('ping.detail');
  },

  showList() {
    vscode.commands.executeCommand('ping.list.focus');
  },
};
