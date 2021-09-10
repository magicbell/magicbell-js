import get from 'lodash/get';

/**
 * Decorator factory to wrap the first argument of the method decorated with
 * this.
 *
 * @example
 * @wrap('notification')
 * set(json) { Object.assign(this, json) }
 */
export default function wrap(wrapKey: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [json, ...otherArgs] = args;
      const unwrappedJson = get(json, wrapKey, json);
      const wrappedJson = { [wrapKey]: unwrappedJson };

      return originalMethod.apply(this, [wrappedJson, ...otherArgs]);
    };
  };
}
