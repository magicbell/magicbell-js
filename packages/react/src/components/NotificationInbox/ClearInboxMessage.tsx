/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useMagicBellContext } from '../../context/MagicBellContext';
import { useTheme } from '../../context/MagicBellThemeContext';
import Text from '../Text';

/**
 * Is renders an "All clear" message and an image to indicate the user has no
 * notifications.
 *
 * @example
 * <ClearInboxMessage />
 */
export default function ClearInboxMessage() {
  const theme = useTheme();
  const { images } = useMagicBellContext();
  const { notification: notificationTheme } = theme;

  return (
    <div
      css={css`
        padding: 3em !important;
        text-align: center;
        color: ${notificationTheme.default.textColor};

        img {
          margin: 2em auto;
          height: 200px;
        }
      `}
    >
      <p>
        <Text
          id="messages.empty-inbox"
          defaultMessage="All clear!<br>We'll let you know when there's more."
          html
        />
      </p>
      <img
        src={images?.emptyInboxUrl || 'https://assets.magicbell.io/images/empty_inbox.png'}
        alt="No notifications"
      />
    </div>
  );
}
