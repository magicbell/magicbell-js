/* eslint-disable no-restricted-globals */
import { MutableRefObject, useEffect, useState } from 'react';
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
 * @param ref - the element to observe, either a ref object or html element
 * @param initialHeight - optional initial height
 */
export function useHeight(ref: MutableRefObject<Element> | Element | null, initialHeight?: number) {
  const [height, setHeight] = useState(initialHeight);

  useEffect(() => {
    if (!ref) return;

    const target = ref instanceof Element ? ref : ref.current;
    if (!target) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [ref, setHeight]);

  return height;
}
