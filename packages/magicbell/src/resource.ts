import { Client } from './client';
import { joinUrlSegments } from './lib/utils';
import { IterablePromise, normalizeArgs } from './method';
import { autoPaginate } from './paginate';

type ResourceRequestOptions = {
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
  path?: string;
  paged?: boolean;
};

export class Resource {
  path: string;
  entity: string;

  client: InstanceType<typeof Client>;

  constructor(client: InstanceType<typeof Client>) {
    this.client = client;
  }

  request<TData = any>(
    options: ResourceRequestOptions & { paged: true },
    ...args: (string | Record<string, unknown>)[]
  ): IterablePromise<TData>;

  request<TData = any>(
    options: ResourceRequestOptions & { paged?: false | never },
    ...args: (string | Record<string, unknown>)[]
  ): Promise<TData>;

  request({ method, paged, path: tplPath }: ResourceRequestOptions, ...args: (string | Record<string, unknown>)[]) {
    const { path, data, params, options } = normalizeArgs({
      path: joinUrlSegments(this.path, tplPath),
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

    if (paged) {
      return autoPaginate(makeRequest, {
        data,
        params,
      });
    }

    return makeRequest({ data, params });
  }

  assertFeatureFlag(flag: string) {
    if (!this.client.hasFlag(flag)) {
      throw new Error(`This is a beta feature, please enable it by providing the "${flag}" feature flag.`);
    }
  }
}
