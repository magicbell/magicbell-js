/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import { useTheme } from '../../context/MagicBellThemeContext';
import { darken, toRGBA } from '../../lib/color';
import Text from '../Text';

export interface Props {
  notification: INotification;
}

/**
 * Context menu for the clickable notification. Renders a menu with two items:
 * "Mark as read" and "Delete".
 *
 * @example
 * <NotificationContextMenu notification={notification} />
 */
export default function NotificationContextMenu({ notification }: Props) {
  const { isRead, markAsUnread, markAsRead } = notification;
  const theme = useTheme();
  const { container: containerTheme, notification: notificationTheme } = theme;

  const handleDelete = () => notification.delete();
  const toggleRead = () => (isRead ? markAsUnread() : markAsRead());

  return (
    <div
      css={css`
        background: ${containerTheme.backgroundColor} !important;
        border-radius: ${notificationTheme.default.borderRadius} !important;
        box-shadow: 2px 2px 3px ${darken(toRGBA(containerTheme.backgroundColor, 0.5), 10)};
        color: ${notificationTheme.default.textColor} !important;
        font-family: ${notificationTheme.default.fontFamily} !important;
        font-size: ${notificationTheme.default.fontSize} !important;
        text-transform: ${notificationTheme.default.textTransform} !important;
        min-width: 10em;

        a {
          display: block;
          padding: 0.75em 1.25em !important;

          &:hover {
            text-decoration: underline !important;
          }
        }
      `}
    >
      <a onClick={toggleRead} data-testid="toggle-read">
        {notification.isRead ? (
          <Text id="notification.mark-as-unread" defaultMessage="Mark as unread" />
        ) : (
          <Text id="notification.mark-as-read" defaultMessage="Mark as read" />
        )}
      </a>
      <a onClick={handleDelete} data-testid="delete">
        <Text id="notification.delete" defaultMessage="Delete" />
      </a>
    </div>
  );
}
