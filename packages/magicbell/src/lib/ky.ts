import type { ResponsePromise } from 'ky';
import type { KyInstance } from 'ky/distribution/types/ky';
import type { Input, Options } from 'ky/distribution/types/options';

export const importDynamic = new Function('modulePath', 'return import(modulePath);') as <T>(
  name: string,
) => Promise<T>;

// dynamic import to support commonjs
export const kyImport = importDynamic<{ default: KyInstance }>('ky').then((x) => x.default);

export const ky = (url: Input, options: Options) => {
  return kyImport.then((ky) => ky(url, options)) as ResponsePromise;
};
