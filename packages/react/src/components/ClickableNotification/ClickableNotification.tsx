/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { INotification, IRemoteNotification, useNotification } from '@magicbell/react-headless';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import NotificationContent from '../NotificationContent/index.js';
import NotificationMenu from '../NotificationMenu/index.js';
import NotificationState from '../NotificationState/index.js';
import Timestamp from '../Timestamp/index.js';
import { openActionUrl } from './eventHandlers.js';
import NotificationTitle from './NotificationTitle.js';
import StyledContainer from './StyledContainer.js';

export interface Props {
  notification: IRemoteNotification;
  onClick?: (notification: INotification) => void | boolean;
  prose?: boolean;
}

const actionableTags = new Set(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']);
function isActionableElement(event: MouseEvent) {
  let el = event.target as HTMLElement;

  while (el && el !== event.currentTarget) {
    if (actionableTags.has(el.tagName.toUpperCase())) {
      return true;
    }

    el = el.parentElement;
  }

  return false;
}

/**
 * Component that renders a notification. When the notification is clicked the
 * `onClick` callback is called and the notification is marked as read.
 *
 * @example
 * <ClickableNotification notification={notification} onClick={openActionUrl} />
 */
export default function ClickableNotification({ notification: rawNotification, onClick, prose }: Props) {
  const {
    notification: { default: theme },
  } = useTheme();
  const notification = useNotification(rawNotification);

  const handleClick = (event) => {
    // ignore event when user clicks inside the menu
    if (event.isDefaultPrevented()) return;
    const markAsReadPromise = notification.markAsRead();

    // We don't want to invoke the action url when the user clicks a link or button inside the notification.
    // Notification content should take precedence.
    const isAction = isActionableElement(event);
    if (isAction) return;

    const onClickResult = onClick?.(notification);
    if (onClickResult === false) return;

    if (notification.actionUrl) {
      // We wait for the markAsRead before navigating to the new url, to prevent race conditions
      // between mark and read, and fetching new data on page reload. But let's not wait forever.
      const timeout = new Promise((resolve) => setTimeout(resolve, 1_000));
      Promise.race([markAsReadPromise, timeout]).then(() => openActionUrl(notification));
    }
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
        {notification.sentAt ? <Timestamp date={notification.sentAt} tooltipPlacement="left" /> : <div />}
        <NotificationMenu notification={notification} />
      </div>
    </StyledContainer>
  );
}
