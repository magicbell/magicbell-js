/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNotification } from '@magicbell/react-headless';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import IRemoteNotification from '@magicbell/react-headless/dist/types/IRemoteNotification';

import { useTheme } from '../../context/MagicBellThemeContext';
import NotificationContent from '../NotificationContent';
import NotificationMenu from '../NotificationMenu';
import NotificationState from '../NotificationState';
import Timestamp from '../Timestamp';
import { openActionUrl } from './eventHandlers';
import NotificationTitle from './NotificationTitle';
import StyledContainer from './StyledContainer';

export interface Props {
  notification: IRemoteNotification;
  onClick?: (notification: INotification) => void;
  prose?: boolean;
}

/**
 * Component that renders a notification. When the notification is clicked the
 * `onClick` callback is called and the notification is marked as read.
 *
 * @example
 * <ClickableNotification notification={notification} onClick={openActionUrl} />
 */
export default function ClickableNotification({
  notification: rawNotification,
  onClick,
  prose,
}: Props) {
  const {
    notification: { default: theme },
  } = useTheme();
  const notification = useNotification(rawNotification);

  const handleClick = (event) => {
    // ignore event when user clicks inside the menu
    if (event.isDefaultPrevented()) return;
    notification.markAsRead();

    // We don't want to invoke the action url when the user clicks a link or button inside the notification.
    // Notification content should take precedence.
    const isActionableElement = /a|button|input/i.test(event.target.tagName);

    if (isActionableElement) return;
    if (onClick) onClick(notification);
    if (notification.actionUrl) openActionUrl(notification);
  };

  const content = css`
    margin: 0 8px !important;
    width: 100%;
  `;

  const actions = css`
    display: flex;
    padding: 0 5px !important;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto !important;
    font-size: ${theme.fontSize} !important;
  `;

  return (
    <StyledContainer
      role="button"
      aria-labelledby={`magicbell-notification-title-${notification.id}`}
      notification={notification}
      onClick={handleClick}
    >
      <NotificationState notification={notification} />
      <div css={content}>
        <NotificationTitle notification={notification} />
        <NotificationContent notification={notification} prose={prose} />
      </div>
      <div css={actions}>
        {notification.sentAt ? (
          <Timestamp date={notification.sentAt} tooltipPlacement="left" />
        ) : (
          <div />
        )}
        <NotificationMenu notification={notification} />
      </div>
    </StyledContainer>
  );
}
