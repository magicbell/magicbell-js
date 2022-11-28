import { parse } from 'json5';

import { printError } from './lib/printer';
import { camelToSnakeCase } from './lib/text';

const optionKeys = new Set(['userEmail', 'userExternalId']);

export function parseOptions(obj: Record<string, unknown>) {
  const options: Record<string, unknown> = {};
  const data: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (optionKeys.has(key)) {
      options[key] = value;
    } else if (key === 'customAttributes') {
      // use json-5 to parse custom-attributes, as it's more forgiving than JSON.parse.
      try {
        data['custom_attributes'] = parse(String(value));
      } catch {
        printError(`Invalid JSON provided to custom-attributes: ${value}`, true);
      }
    } else if (key === 'recipients') {
      data.recipients = (obj.recipients as string[]).map((r) =>
        r.includes('*') || r.includes(' ') ? { matches: r } : r.includes('@') ? { email: r } : { external_id: r },
      );
    } else {
      data[camelToSnakeCase(key)] = value;
    }
  }

  return { options, data: Object.keys(data).length ? data : undefined };
}
