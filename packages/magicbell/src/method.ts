import { isArray, isBoolean, isObject, isString, isStringArray, joinUrlSegments } from './lib/utils';
import { isOptionsHash } from './options';
import { autoPaginate } from './paginate';
import { Resource } from './resource';
import { ClientOptions, RequestMethod } from './types';

type CreateMethodOptions = {
  id: string;
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
  path?: string;
  entity?: string;
  type?: 'list';
  beta?: boolean;
};

type IterablePromise<TData, TNode> = Promise<TData> & {
  [Symbol.asyncIterator](): Iterator<TNode>;
  forEach(cb: (node: TNode, index: number) => void | boolean | Promise<void | boolean>): Promise<void>;
  toArray(options: { limit: number }): Promise<Array<TNode>>;
};

export function createMethod<TData = any, TNode = any>(
  options: CreateMethodOptions & { type: 'list' },
): (this: Resource, ...args) => IterablePromise<TData, TNode>;

export function createMethod<TData = any>(
  options: CreateMethodOptions & { type?: never },
): (this: Resource, ...args) => Promise<TData>;

export function createMethod({ method, path: _path, type, id, beta }: CreateMethodOptions) {
  return function methodHandler(this: Resource, ...args) {
    if (beta && !this.client.hasFlag(id)) {
      throw new Error(`This is a beta feature, please enable it via the "${id}" flag.`);
    }

    const { path, data, params, options } = normalizeArgs({
      path: joinUrlSegments(this.path, _path),
      method,
      args,
    });

    const makeRequest = ({ data, params }) => {
      const entity = this.entity || this.path;
      data = data ? { [entity]: data } : data;

      return this.client
        .request({ method, path, data, params }, options)
        .then((response) => response[entity] || response);
    };

    if (type === 'list') {
      return autoPaginate(makeRequest, {
        data,
        params,
      });
    }

    return makeRequest({ data, params });
  };
}

const queryParamValidators = {
  archived: isBoolean,
  read: isBoolean,
  seen: isBoolean,
  categories: (value) => isString(value) || isStringArray(value),
  topics: (value) => isString(value) || isStringArray(value),
};

function isForcedQueryParams(object) {
  if (!isObject(object)) return false;

  for (const key of Object.keys(object)) {
    if (!queryParamValidators[key]?.(object[key])) return false;
  }

  return true;
}

function getUrl(path: string, params: Record<string, string>) {
  return path.replace(/{([\s\S]+?)}/g, ($0, $1) => encodeURIComponent(params[$1] || ''));
}

function extractUrlParams(path: string) {
  const params = path.match(/{\w+}/g) || [];
  return (params || []).map((param) => param.replace(/[{}]/g, ''));
}

/**
 * Return the data argument from a list of arguments
 *
 * @param {object[]} args
 * @returns {object}
 */
function getDataFromArgs(args): Record<string, unknown> {
  if (!isArray(args) || !isObject(args[0])) return {};
  if (isOptionsHash(args[0])) return {};
  return args.shift();
}

/**
 * Return the options hash from a list of arguments
 */
function getOptionsFromArgs(args): Partial<ClientOptions> {
  if (!isArray(args) || args.length === 0) return {};

  const arg = args[args.length - 1];
  if (!isOptionsHash(arg)) return {};

  return { ...args.pop() };
}

function normalizeArgs({
  path,
  method,
  args,
}: {
  path: string;
  method: RequestMethod;
  args: Record<string, unknown>[];
}) {
  const argsCopy = [...args];

  const urlParams = extractUrlParams(path);
  const urlData = urlParams.reduce((urlData, param) => {
    const arg = argsCopy.shift();
    if (typeof arg !== 'string') {
      throw new Error(
        `MagicBell: Argument "${param}" must be a string, but got ${typeof arg}: ${JSON.stringify(
          arg,
        )} (on API request to \`${method} ${path}\`)`,
      );
    }

    urlData[param] = arg;
    return urlData;
  }, {});

  const url = getUrl(path, urlData);
  const dataFromArgs = getDataFromArgs(argsCopy);
  const options = getOptionsFromArgs(argsCopy);

  // Validate that there are no more args.
  if (argsCopy.filter((x) => x != null).length) {
    throw new Error(
      `MagicBell: Unknown arguments (${JSON.stringify(argsCopy)}). (on API request to \`${method} ${url}\`)`,
    );
  }

  let dataInQuery = method === 'GET' || method === 'DELETE';

  // We have a few POST methods using query data instead of body data.
  if (method === 'POST' && isForcedQueryParams(dataFromArgs)) {
    dataInQuery = true;
  }

  const data = dataInQuery ? {} : dataFromArgs;
  const params = dataInQuery ? dataFromArgs : {};

  return { path: url, data, params, options };
}
