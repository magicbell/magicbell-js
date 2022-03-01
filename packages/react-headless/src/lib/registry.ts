const ns = '__MAGICBELL_HOOKS__';

// The registry needs to be attached to the window, because webpack hoists constants
// and turns them into instances instead of statics. Making it impossible to share
// the registry between embeddable and playground.
const target = typeof window === 'undefined' ? global : window;

export const registry = {
  get<T>(key: string, fallback: T): T {
    return target[ns] && target[ns][key] ? (target[ns][key] as T) : fallback;
  },
  set(key: string, value: unknown) {
    target[ns] = target[ns] || {};
    target[ns][key] = value;
  },
};
