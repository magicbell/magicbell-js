import React from 'react';

import { useTheme } from '../../context/MagicBellThemeContext.js';

/**
 * Default MacigBell icon for the notification launcher/toggler.
 *
 * @example
 * <BellIcon />
 */
export default function BellIcon() {
  const theme = useTheme();
  const { icon: iconTheme } = theme;

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill={iconTheme.borderColor}>
      <path d="M15.9997 4.70663C14.3971 4.71182 12.8617 5.34576 11.7284 6.47013C10.5951 7.59449 9.95592 9.11801 9.95038 10.7082V15.0907C9.95038 16.4805 9.85234 17.3932 9.62941 18.1738C9.39598 18.9845 9.04584 19.5809 8.55447 20.3349C8.38874 20.5862 8.23117 20.8144 8.08761 21.0217C7.66277 21.6158 8.58949 21.7583 9.06218 21.8324C10.8129 22.115 13.2639 22.2957 16.0102 22.2957C18.7565 22.2957 21.2052 22.1196 22.9582 21.8324C24.1791 21.6344 24.0822 21.3031 23.5897 20.5584C23.0819 19.7929 22.7038 19.1791 22.44 18.3718C22.1762 17.5646 22.0467 16.6496 22.0467 15.3119V10.7082C22.0442 9.11807 21.4069 7.59366 20.2742 6.4688C19.1414 5.34394 17.6057 4.71031 16.0032 4.70663H15.9997ZM16.0032 2C18.3263 2.01068 20.551 2.93195 22.1926 4.56308C23.8342 6.19422 24.7596 8.40302 24.7673 10.7082V15.3166C24.7673 16.3589 24.8502 17.0214 25.0217 17.5414C25.1933 18.0614 25.4711 18.5085 25.8528 19.0829C26.1294 19.501 26.4048 19.8647 26.6289 20.1623C27.1588 20.8642 27.5136 21.3344 27.4996 21.976V22.0061C27.4996 23.2234 25.9263 24.0908 23.3854 24.4985C21.4713 24.8089 18.858 25 16.0009 25C13.1437 25 10.5304 24.8089 8.61516 24.4985C6.07428 24.0874 4.50214 23.2245 4.50214 22.0061V21.9957C4.46829 21.3286 4.83944 20.8306 5.40434 20.0766C5.64944 19.7489 5.95057 19.3447 6.26686 18.8629C6.61701 18.3267 6.86094 17.9201 7.001 17.4325C7.15039 16.9091 7.21575 16.2153 7.21575 15.0884V10.7082C7.22192 8.40035 8.14864 6.18875 9.79334 4.55693C11.438 2.92511 13.6669 2.00581 15.9927 2H16.0032Z" />
      <path d="M20.4988 26C20.4489 27.0446 19.9795 28.0338 19.1834 28.7721C18.7655 29.1614 18.2692 29.4702 17.7228 29.6809C17.1765 29.8916 16.5909 30 15.9994 30C15.408 30 14.8223 29.8916 14.276 29.6809C13.7296 29.4702 13.2333 29.1614 12.8154 28.7721C12.0193 28.0338 11.5499 27.0446 11.5 26C12.3651 26.0703 13.3047 26.1198 14.2916 26.1473C14.3561 26.4337 14.5025 26.6985 14.7154 26.9139C14.9283 27.1293 15.1998 27.2872 15.5013 27.371C15.8027 27.4548 16.1228 27.4613 16.4279 27.3898C16.733 27.3184 17.0116 27.1716 17.2345 26.9651C17.4739 26.7413 17.6382 26.4575 17.7072 26.1484C18.6941 26.1209 19.6337 26.0714 20.5 26.0011" />
    </svg>
  );
}
