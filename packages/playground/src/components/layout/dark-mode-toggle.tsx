import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';

import useDarkmode from '~/hooks/use-darkmode';

function DarkModeToggle() {
  const [mode, setMode] = useDarkmode();
  const [rotate, setRotate] = useState(mode === 'dark' ? 0 : 180);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    setRotate((c) => c + 180);
  }, [mode]);

  // server can't detect the prefered media, so rendering this on the server will
  // place it out of sync.
  if (typeof window === 'undefined') return null;

  return (
    <button
      onClick={() => {
        setMode((current) => (current === 'dark' ? 'light' : 'dark'));
      }}
      className="h-5 w-5 flex-row overflow-visible transition fg-body relative"
      data-m={mode}
      aria-label={
        mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
    >
      <span
        data-r={rotate}
        className="absolute inset-0 transform transition duration-1000"
        style={{
          transformOrigin: '50% 100px',
          transform: `rotate(${rotate}deg)`,
          opacity: mode === 'dark' ? 1 : 0,
        }}
      >
        <MoonIcon height={20} width={20} />
      </span>
      <span
        data-r={rotate}
        className="absolute inset-0 transform transition duration-1000"
        style={{
          transformOrigin: '50% 100px',
          transform: `rotate(${rotate + 180}deg)`,
          opacity: mode === 'light' ? 1 : 0,
        }}
      >
        <SunIcon height={20} width={20} />
      </span>
    </button>
  );
}

export default DarkModeToggle;
