/* eslint-disable no-restricted-globals */
import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * Open a centered popup window.
 *
 * @param url Url of the floating window
 */
export function openWindow(url: string) {
  const top = (screen.height - 400) / 4;
  const left = (screen.width - 600) / 2;
  window.open(url, '', `width=600,height=400,scrollbars=no,top=${top},left=${left}`);
}

/**
 * Custom hook to observe the height of an HTML element.
 *
 * @param ref
 * @param initialHeight
 */
export function useHeight(ref, initialHeight) {
  const [height, setHeight] = useState(initialHeight);
  const resizeObserverRef = useRef() as any;

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries: any = []) => {
      entries.forEach((entry) => {
        setHeight(entry.contentRect.height);
      });
    });

    if (ref.current) resizeObserverRef.current.observe(ref.current);

    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, [ref]);

  return height;
}
