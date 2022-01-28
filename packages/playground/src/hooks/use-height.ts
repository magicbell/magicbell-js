/**
 * Custom hook to observe the height of an HTML element.
 *
 * @param ref - the element to observe, either a ref object or html element
 * @param initialHeight - optional initial height
 */
import { MutableRefObject, useEffect, useState } from 'react';

export function useHeight(
  ref: MutableRefObject<Element> | Element | null,
  initialHeight?: number,
) {
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
