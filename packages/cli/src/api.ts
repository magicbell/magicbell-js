import { Option } from 'commander';
import fs from 'fs';

import { getProjectClient, getUserClient } from './lib/client.js';
import { createCommand } from './lib/commands.js';
import { parseJsonLikes } from './lib/options.js';
import { printError, printJson, printKeyValue, printMessage } from './lib/printer.js';
import { readStdin } from './lib/stdin.js';

function printResponse(response: Response) {
  printMessage(`${response.status} ${response.statusText}`);

  response.headers.forEach((value, key) => {
    printKeyValue(key, value);
  });

  printMessage();
}

export const api = createCommand('api')
  .description('Make an authenticated MagicBell API request')
  .argument('<endpoint>', 'The API path to request')
  .option('-H, --header <string...>', 'Add a HTTP request header in key:value format')
  .option('-d, --data <string>', 'HTTP POST data (can also come from stdin)')
  .option('-f, --field <string...>', 'Add a field parameter in key=value format')
  .option('-i, --include', 'Include HTTP response status line and headers in the output')
  .option('-s, --silent', 'Do not print the response body')
  .addOption(
    new Option('-c, --credentials <scope>', 'Specify the authentication scope.')
      .default('project')
      .choices(['project', 'user'])
      .hideHelp(true), // deprecated, use different profiles instead
  )
  .option(
    '-X, --method <string>',
    'The HTTP method for the request (default: "POST" when data is provided, "GET" otherwise)',
  )
  .addOption(new Option('--request <string>', 'Alias for --method for compatibility with curl').hideHelp())
  .hook('preAction', async function (thisCommand) {
    const options = thisCommand.opts();
    const stdin = await readStdin();

    if (stdin && options.data) printError('Cannot provide data via stdin and specify --data', true);
    if (stdin && options.field) printError('Cannot provide data via stdin and specify --field', true);
    if (options.data && options.field) printError('Cannot specify both --data and --field', true);

    if (stdin) {
      options.data = stdin;
    } else if (options.data?.startsWith('@')) {
      const file = options.data.slice(1);
      options.data = fs.readFileSync(file, 'utf-8');
    }
  })
  .action(async (endpoint, opts, cmd) => {
    const path = '/' + (endpoint || '').replace(/^\/+/, '');
    const headers = Object.fromEntries((opts.header || []).map((h) => h.split(':')));
    const method = (opts.method || opts.request || (opts.data || opts.field ? 'POST' : 'GET')).toUpperCase();

    if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      printError(`Invalid method: ${method}`, true);
    }

    let data = parseJsonLikes(opts.data) || {};
    for (const field of opts.field || []) {
      const [key, value] = field.split('=');

      if (!(key in data)) {
        data[key] = parseJsonLikes(value);
        continue;
      }

      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }

      data[key].push(parseJsonLikes(value));
    }

    if (!Object.keys(data).length) {
      data = null;
    }

    let response: Response | null = null;
    const getClient = opts.credentials === 'user' ? getUserClient : getProjectClient;
    const client = getClient(cmd, {
      hooks: {
        afterResponse: [
          (req, opts, res) => {
            response = res;
            return res;
          },
        ],
        beforeError: [
          (error) => {
            response = error.response;
            return error;
          },
        ],
      },
    });

    try {
      const dataKey = method === 'GET' ? 'params' : 'data';
      const result = await client.request({
        method,
        path,
        headers,
        [dataKey]: data,
      });

      if (opts.include) printResponse(response);
      if (!opts.silent) printJson(result);
    } catch (e) {
      if (!response) printError(e.message, true);

      if (opts.include) printResponse(response);
      if (e.responseBody && !opts.silent) printJson(e.responseBody);
      else printError(`${response.statusText} (HTTP ${response.status}) - ${e.message}`, true);
    }
  });
