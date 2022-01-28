import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useDarkmode(): [
  'light' | 'dark',
  Dispatch<SetStateAction<'light' | 'dark'>>,
] {
  const [mode, setMode] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window?.matchMedia) return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const fn = (event) => setMode(event.matches ? 'dark' : 'light');
    media.addEventListener('change', fn);
    return () => media.removeEventListener('change', fn);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.querySelector('html');
    if (root.classList.contains(mode)) return;
    root.classList.remove(mode === 'dark' ? 'light' : 'dark');
    root.classList.add(mode);
  }, [mode]);

  return [mode, setMode];
}

export default useDarkmode;
