import { proxy } from 'valtio/vanilla';

/**
 * Class decorator to make all instances of its class proxy observable.
 */
export default function observable<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args) {
      super(...args);
      return proxy(this);
    }
  };
}
