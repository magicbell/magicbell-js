// copy from: https://github.com/uidotdev/usehooks/blob/90fbbb4cc085e74e50c36a62a5759a40c62bb98e/index.js
import * as React from 'react';

function dispatchStorageEvent(key: string, newValue: string | null | undefined) {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
}

function setLocalStorageItem(key: string, value: unknown) {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
}

function removeLocalStorageItem(key: string) {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
}

function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key);
}

function useLocalStorageSubscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getLocalStorageServerSnapshot(): null {
  throw Error('useLocalStorage is a client-only hook');
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const getSnapshot = () => getLocalStorageItem(key);

  const store = React.useSyncExternalStore(useLocalStorageSubscribe, getSnapshot, getLocalStorageServerSnapshot);

  const setState = React.useCallback<(value: T) => void>(
    (v) => {
      try {
        const nextState = typeof v === 'function' ? v(JSON.parse(store)) : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store],
  );

  React.useEffect(() => {
    if (getLocalStorageItem(key) === null && typeof initialValue !== 'undefined') {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
}
