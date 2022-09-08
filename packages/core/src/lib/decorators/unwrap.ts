import get from 'lodash/get';

/**
 * Decorator factory to unwrap the arguments of the method decorated with this.
 *
 * @example
 * @unwrap('notification')
 * set(json = {}) { Object.assign(this, json) }
 */
export default function unwrap(wrapKey: string) {
  return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [json, ...otherArgs] = args;
      const unwrappedJson = get(json, wrapKey, json);

      return originalMethod.apply(this, [unwrappedJson, ...otherArgs]);
    };
  };
}
