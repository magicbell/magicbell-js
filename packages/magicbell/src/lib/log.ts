import { AxiosRequestConfig } from 'axios';

const colors = {
  reset: '\x1b[0m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
};

export function emitWarning(message) {
  if (typeof process.emitWarning !== 'function') {
    return console.warn(`magicbell: ${message}`);
  }

  return process.emitWarning(message, 'magicbell');
}

export class Logger {
  active = false;

  debug(message) {
    if (!this.active) return;

    // eslint-disable-next-line no-console
    console.log(`${colors.reset}${colors.magenta}magicbell:${colors.reset} ${message}`);
  }

  error(message) {
    if (!this.active) return;

    // eslint-disable-next-line no-console
    console.error(`${colors.reset}${colors.red}magicbell:${colors.reset} ${message}`);
  }
}

function mask(str: string) {
  if (__DEV__) return str;
  return `${str.slice(0, 4)}…${str.slice(-4)}`;
}

const secrets = /secret|token|key|password/i;
function isSecret(key: string) {
  return secrets.test(key);
}

export function toCurl({ method, baseURL, url, data, headers }: AxiosRequestConfig) {
  return [
    `curl -X ${method.toUpperCase()}`,
    `${baseURL}/${url.replace(/^\//, '')}`,
    Object.entries(headers)
      .map(([key, value]) => `-H '${key}: ${isSecret(key) ? mask(String(value)) : value}'`)
      .join(' '),
    data && `-d '${JSON.stringify(data)}'`,
  ].join(' ');
}
