import { AxiosRequestConfig } from 'axios';

import { printError } from './printer';

// we don't want to print these headers, as we don't want to have people copy/paste them
// into other requests, and thereby mess up our telemetry / request logs
const excludeHeaders = /user-agent|x-magicbell-client-user-agent|x-magicbell-client-telemetry/i;

export function toCurl({ method, baseURL, url, data, headers }: AxiosRequestConfig) {
  return [
    `curl --request ${method.toUpperCase()}`,
    `--url ${baseURL}/${url.replace(/^\//, '')}`,
    ...Object.entries(headers)
      .map(([key, value]) => [key.toLowerCase(), value] as [string, string])
      .filter(([key]) => !excludeHeaders.test(key))
      .map(([key, value]) => `--header '${key}: ${value}'`),
    data && `--data '${JSON.stringify(data)}'`,
  ]
    .filter(Boolean)
    .join(' \\\n  ');
}

export const serialize = (config: AxiosRequestConfig, method: 'curl') => {
  if (method === 'curl') return toCurl(config);
  printError(`Unknown serialization method: ${method}`, true);
};
