/* eslint-disable no-console */
import { colorize } from './colorize';
import { configStore } from './config';

export function printMessage(message = ''): void {
  console.log(message);
}

export function printJson(data: any, color = true): void {
  const json = JSON.stringify(data, null, 2);
  color = color && configStore.color;
  console.log(color ? colorize(json) : json);
}

export function printError(message: string, fatal = false): void {
  printMessage(`error: ${message}`);
  if (fatal) process.exit(1);
}
