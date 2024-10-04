import { toCurl } from 'fetch-addons';

import { printError } from './printer.js';

// we don't want to print these headers, as we don't want to have people copy/paste them
// into other requests, and thereby mess up our telemetry / request logs
const excludeHeaders = ['user-agent', 'x-magicbell-client-user-agent', 'x-magicbell-client-telemetry'];

export async function serialize(request: Request, method: 'curl') {
  const clone = request.clone();
  excludeHeaders.forEach((header) => clone.headers.delete(header));

  if (method === 'curl') {
    return toCurl(clone);
  }

  printError(`Unknown serialization method: ${method}`, true);
}
