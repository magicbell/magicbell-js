import Debug from 'debug';
import { toCurl } from 'fetch-addons';
import type { Hooks } from 'ky';

export const info = Debug('magicbell:info');
export const debug = Debug('magicbell:debug');
export const error = Debug('magicbell:error');

function mask(str: string) {
  if (__DEV__) return str;
  // note, can't use real ellipsis, that'd throw
  //  error: Cannot convert argument to a ByteString because the character at index 4 has a value of 8230 which is greater than 255.
  return `${str.slice(0, 4)}...${str.slice(-4)}`;
}

const secretHeaders = ['x-magicbell-api-secret'];
// Exclude these headers, as they don't hold valuable info for debugging
// and we don't want these values to be replayed when users copy/paste the curl
// command. It would potentially mess up our telemetry.
const excludeHeaders = ['user-agent', 'x-magicbell-client-user-agent', 'x-magicbell-client-telemetry'];

export function withRequestLogging(): Hooks {
  return {
    beforeRequest: [(request) => debug(`${request.method} ${request.url}`)],
    beforeError: [
      async (err) => {
        const req = err.request.clone();
        excludeHeaders.forEach((header) => req.headers.delete(header));

        req.headers.forEach((value, key) => {
          if (secretHeaders.includes(key)) req.headers.set(key, mask(value));
        });

        const curl = await toCurl(req).then((x) => x.replace(/\\\n/g, ' ').replace(/\s+/g, ' '));
        error(`${err.message}: ${curl}`);
        return err;
      },
    ],
  };
}
