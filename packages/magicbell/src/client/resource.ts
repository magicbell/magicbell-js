import { joinUrlSegments } from '../lib/utils.js';
import { Client } from './client.js';
import { IterablePromise, normalizeArgs } from './method.js';
import { autoPaginate } from './paginate.js';
import { FeatureFlag } from './types.js';

type ResourceRequestOptions = {
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
  path?: string;
  paged?: boolean;
};

function isEmptyPayload(data: unknown): boolean {
  if (!data) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === 'object') return Object.keys(data).length === 0;
  return false;
}

export class Resource {
  path: string;
  entity: string;

  protected client: InstanceType<typeof Client>;

  constructor(client: InstanceType<typeof Client>) {
    this.client = client;
  }

  protected request<TData = any>(
    options: ResourceRequestOptions & { paged: true },
    ...args: (string | Record<string, unknown>)[]
  ): IterablePromise<TData>;

  protected request<TData = any>(
    options: ResourceRequestOptions & { paged?: false | never },
    ...args: (string | Record<string, unknown>)[]
  ): Promise<TData>;

  protected request(
    { method, paged, path: tplPath }: ResourceRequestOptions,
    ...args: (string | Record<string, unknown>)[]
  ) {
    const { path, data, params, options } = normalizeArgs({
      path: joinUrlSegments(this.path, tplPath),
      method,
      args,
    });

    const makeRequest = ({ data, params }) => {
      const entity = this.entity || this.path;
      data = isEmptyPayload(data) ? undefined : { [entity]: data };
      params = isEmptyPayload(params) ? undefined : params;

      return this.client
        .request({ method, path, data, params }, options)
        .then((response) => response?.[entity] || response);
    };

    if (paged) {
      return autoPaginate(makeRequest, {
        data,
        params,
      });
    }

    return makeRequest({ data, params });
  }

  protected assertFeatureFlag(flag: FeatureFlag) {
    if (!this.client.hasFlag(flag)) {
      throw new Error(`This is a beta feature, please enable it by providing the "${flag}" feature flag.`);
    }
  }
}
