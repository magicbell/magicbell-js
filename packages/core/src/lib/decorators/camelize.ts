import humps from 'humps';

/**
 * Decorator factory  to camelize the keys of the arguments passed to the
 * function decorated with this.
 *
 * @example
 * @camelize()
 * set(json = {}) { Object.assign(this, json) }
 */
export default function camelize() {
  return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const camelizedArgs = humps.camelizeKeys(args);
      return originalMethod.apply(this, camelizedArgs);
    };
  };
}
