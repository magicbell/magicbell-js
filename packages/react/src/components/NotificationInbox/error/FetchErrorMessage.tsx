/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { useTheme } from '../../../context/MagicBellThemeContext';
import InternetConnectionErrorMessage from './InternetConnectionErrorMessage';
import ServerErrorMessage from './ServerErrorMessage';

/**
 * If the browser is not online, it shows a connection error message. Otherwise,
 * it shows an API error message.
 *
 * @example
 * <FetchErrorMessage />
 */
export default function FetchErrorMessage() {
  const theme = useTheme();
  const { notification: notificationTheme } = theme;

  return (
    <div
      css={css`
        padding: 3em !important;
        text-align: center;
        color: ${notificationTheme.default.textColor};

        svg {
          margin: 2em auto;
          height: 200px;
        }
      `}
    >
      {navigator.onLine ? <ServerErrorMessage /> : <InternetConnectionErrorMessage />}
    </div>
  );
}
