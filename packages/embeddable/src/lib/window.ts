import { useMemo } from 'react';
import useWindowSize from 'react-use/esm/useWindowSize';

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
