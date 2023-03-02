import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { signalKeys } from '../constants';
import { code } from './code';
import { Messenger } from './messenger';

const messenger = new Messenger(code);

export function useRemoteSignal<T = any>(key: keyof typeof signalKeys): [T | null, (value: T) => void] {
  const [state, setState] = React.useState(null);

  useEffect(() => {
    const dispose = messenger.on(`${key}::set`, (data) => setState(data));
    // initial sync by requesting data
    messenger.post(`${key}::get`).then((data) => setState(data));
    return () => dispose();
  }, [key, setState]);

  const sendSignal = useCallback(
    (data) => {
      setState(data);
      void messenger.post(`${key}::set`, data);
    },
    [key],
  );

  return [state, sendSignal];
}

export function useMessenger() {
  return messenger;
}

export function useToast() {
  return (message: string, ...action: string[]) => {
    return messenger.post('toast', { message, action });
  };
}

export function useWebView() {
  return useMemo(
    () => ({
      viewType: document.body.dataset.viewType,
      data: window['__INITIAL_DATA__'],
    }),
    [],
  );
}

type EventListener = (ev: KeyboardEvent) => any;
export function useKeydown(handler: EventListener) {
  const savedHandler = useRef<EventListener>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!window || !window.addEventListener) {
      return;
    }

    const eventListener = (event: KeyboardEvent) => savedHandler.current(event);
    window.addEventListener('keydown', eventListener);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('keydown', eventListener);
    };
  }, []);
}
