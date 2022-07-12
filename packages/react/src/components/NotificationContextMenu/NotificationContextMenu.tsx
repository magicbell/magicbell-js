/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import INotification from '@magicbell/react-headless/dist/types/INotification';

import { useTheme } from '../../context/MagicBellThemeContext';
import { toRGBA } from '../../lib/color';
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
  const {
    container: containerTheme,
    notification: { default: notificationTheme },
  } = theme;

  const handleDelete = () => notification.delete();
  const toggleRead = () => (isRead ? markAsUnread() : markAsRead());

  return (
    <div
      css={css`
        background: ${containerTheme.backgroundColor} !important;
        border-radius: 4px !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 4px 0 !important;
        color: ${notificationTheme.textColor} !important;
        font-family: ${notificationTheme.fontFamily} !important;
        font-size: ${notificationTheme.fontSize} !important;
        text-transform: ${notificationTheme.textTransform} !important;
        min-width: 10em;

        button {
          display: block;
          padding: 0.75em 1.25em !important;
          width: 100%;
          text-align: left;
          background-color: ${toRGBA(
            notificationTheme.backgroundColor,
            notificationTheme.backgroundOpacity,
          )} !important;

          &:hover {
            background-color: ${toRGBA(
              notificationTheme.hover.backgroundColor,
              notificationTheme.hover.backgroundOpacity,
            )} !important;
          }
        }
      `}
    >
      <button type="button" onClick={toggleRead}>
        {notification.isRead ? (
          <Text id="notification.mark-as-unread" defaultMessage="Mark as unread" />
        ) : (
          <Text id="notification.mark-as-read" defaultMessage="Mark as read" />
        )}
      </button>
      <button type="button" onClick={handleDelete}>
        <Text id="notification.delete" defaultMessage="Delete" />
      </button>
    </div>
  );
}
