import { Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const useRafState = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return [state, setRafState];
};

export function useWindowSize() {
  const [size, setSize] = useRafState({
    width: null,
    height: null,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setSize]);

  return size;
}

/**
 * Hook to resize an iframe when the viewport changes
 *
 * @example
 * const { width, height } = useFrameSize(100, 500)
 */
export function useFrameSize(width?: number, height?: number) {
  const windowSize = useWindowSize();
  const frameMargin = 20;

  // Returns the max allowed width minus a margin
  const maxWidth = useMemo(() => {
    const w = width ? Math.min(windowSize.width, width) : windowSize.width;
    return w - frameMargin;
  }, [windowSize.width, width]);

  // Returns the max allowed height minus a margin
  const maxHeight = useMemo(() => {
    const h = height ? Math.min(windowSize.height, height) : windowSize.height;
    return h - frameMargin;
  }, [windowSize.height, height]);

  return { width: maxWidth, height: maxHeight };
}
