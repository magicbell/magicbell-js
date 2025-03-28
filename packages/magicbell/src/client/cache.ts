import { debug } from './log.js';
import { RequestArgs } from './types.js';

function sortObj(obj: Record<string, unknown>) {
  const entries = Object.entries(obj || {});
  if (entries.length === 0) return undefined;
  return Object.fromEntries(entries.sort());
}

export class Cache {
  #records = new Map<string, { promise: Promise<any>; timestamp: number }>();
  #ttl: number;

  constructor(options?: { ttl: number }) {
    this.#ttl = options?.ttl ?? 1000;
  }

  getRequestKey(args: Omit<RequestArgs, 'path' | 'params'> & { url: URL }): string {
    const { method, url, data, headers } = args;

    return JSON.stringify({
      method,
      url: url.toString(),
      data: sortObj(data),
      headers: sortObj(headers),
    });
  }

  #flush() {
    const currentTimestamp = Date.now();
    for (const [key, { timestamp }] of this.#records.entries()) {
      if (currentTimestamp - timestamp >= this.#ttl) {
        const age = currentTimestamp - timestamp;
        debug('cache FLUSH', { key, age, ttl: this.#ttl });
        this.#records.delete(key);
      }
    }
  }

  get(key: string) {
    this.#flush();

    const record = this.#records.get(key);
    if (record) {
      const age = Date.now() - record.timestamp;
      debug('cache HIT', { key, age, ttl: this.#ttl });
      return record.promise;
    }

    debug('cache MISS', { key, ttl: this.#ttl });
    return null;
  }

  set(key: string, promise: Promise<any>) {
    if (this.#ttl <= 0) return;
    const timestamp = Date.now();
    debug('cache SET', { key, timestamp, ttl: this.#ttl });
    this.#records.set(key, { promise, timestamp });
  }
}
