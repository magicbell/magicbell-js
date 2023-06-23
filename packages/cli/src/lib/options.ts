import { parse } from 'json5';

import { camelToSnakeCase } from './text';

const optionKeys = new Set(['userEmail', 'userExternalId']);

function parseJsonLikes(obj: unknown) {
  if (Array.isArray(obj)) return obj.map(parseJsonLikes);
  if (typeof obj !== 'string') return obj;

  const str = obj.trim();
  const firstChar = str[0];
  const lastChar = str[str.length - 1];

  try {
    if (firstChar === '{' && lastChar === '}') return parse(str);
    if (firstChar === '[' && lastChar === ']') return parse(str);
    if (firstChar === '"' && lastChar === '"') return parse(str);
    if (firstChar === "'" && lastChar === "'") return parse(str);
    return obj;
  } catch {
    return obj;
  }
}

export function parseOptions(obj: Record<string, unknown>) {
  const options: Record<string, unknown> = {};
  const data: any = {};

  for (let [key, value] of Object.entries(obj)) {
    // parse json-like values, as attributes like custom_attributes, and subscription categories take objects
    value = parseJsonLikes(value);

    if (optionKeys.has(key)) {
      options[key] = value;
    } else if (key === 'recipients') {
      // special magic for recipients, so it's easier to send notifications from the CLI
      const recipients = Array.isArray(value) ? value : [value];
      value = recipients.map((r) => {
        // possibly a json string that was already parsed by parseJsonLikes
        if (typeof r !== 'string') return r;
        if (r.includes('*') || r.includes(' ')) return { matches: r };
        if (r.includes('@')) return { email: r };
        return { external_id: r };
      });
    } else {
      data[camelToSnakeCase(key)] = value;
    }
  }

  return { options, data: Object.keys(data).length ? data : undefined };
}
