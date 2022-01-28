import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import MagicBellIcon from '~/components/icons/magic-bell-icon';
import useDarkmode from '~/hooks/use-darkmode';

function Navbar() {
  const [mode, setMode] = useDarkmode();

  return (
    <nav className="w-full px-8 py-4 flex text-gray-900 dark:text-white items-center">
      <a
        href="https://magicbell.com"
        aria-label="Go to MagicBell"
        className="mr-24"
      >
        <MagicBellIcon />
      </a>

      <button
        className="focus:outline-none"
        onClick={() => {
          setMode((current) => (current === 'dark' ? 'light' : 'dark'));
        }}
      >
        {mode === 'light' ? (
          <SunIcon height={20} width={20} />
        ) : (
          <MoonIcon height={20} width={20} />
        )}
      </button>
    </nav>
  );
}

export default Navbar;
