import * as React from 'react';
import { useCallback, useEffect, useMemo } from 'react';

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

export function useKeydown(): [Array<string>, () => void] {
  const [activeKeys, setActiveKeys] = React.useState<Array<string>>([]);

  useEffect(() => {
    if (!window || !window.addEventListener) {
      return;
    }

    const handleKeyDown: EventListener = ({ key }) => {
      if (!activeKeys.includes(key)) {
        setActiveKeys([key, ...activeKeys]);
      }
    };
    const handleKeyUp: EventListener = () => {
      // Clear all active keys on any key up.
      setActiveKeys([]);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKeys]);

  const resetKeys = useCallback(() => {
    setActiveKeys([]);
  }, []);

  return [activeKeys, resetKeys];
}
