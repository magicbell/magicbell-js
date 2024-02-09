/* eslint-disable no-console */
import { colorize, colors } from './colorize';
import { configStore } from './config';

export function printMessage(message = ''): void {
  console.log(message);
}

export function printKeyValue(key: string, value: unknown, color = true) {
  color = color && configStore.color;
  if (!color) console.log(`${key}: ${value}`);
  else console.log(`${colors.STRING_KEY(key)}: ${value}`);
}

export function printJson(data: any, color = true): void {
  // some commands don't have a return value
  if (typeof data === 'undefined') return;

  const json = JSON.stringify(data, null, 2);
  color = color && configStore.color;
  console.log(color ? colorize(json) : json);
}

export function printError(message: string, fatal = false): void {
  printMessage(`error: ${message}`);
  if (fatal) process.exit(1);
}
