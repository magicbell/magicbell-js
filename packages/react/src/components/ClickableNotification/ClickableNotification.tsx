/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useNotification } from '@magicbell/react-headless';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import IRemoteNotification from '@magicbell/react-headless/dist/types/IRemoteNotification';
import NotificationContent from '../NotificationContent';
import NotificationState from '../NotificationState';
import Timestamp from '../Timestamp';
import { openActionUrl } from './eventHandlers';
import NotificationTitle from './NotificationTitle';
import StyledContainer from './StyledContainer';

export interface Props {
  notification: IRemoteNotification;
  onClick?: (notification: INotification) => void;
}

/**
 * Component that renders a notification. When the notification is clicked the
 * `onClick` callback is called and the notification is marked as read.
 *
 * @example
 * <ClickableNotification notification={notification} onClick={openActionUrl} />
 */
export default function ClickableNotification({ notification: rawNotification, onClick }: Props) {
  const notification = useNotification(rawNotification);

  const handleClick = (event) => {
    notification.markAsRead();

    // As the notification is wrapped in a <button>, we don't want to invoke the action url when the
    // user clicks a link inside that notification. The link should take precedence.
    const clickedLink = event.target.tagName === 'A' && event.target.getAttribute('href');

    if (onClick) onClick(notification);
    else if (clickedLink) return;
    else openActionUrl(notification);
  };

  return (
    <StyledContainer notification={notification}>
      <button onClick={handleClick}>
        <div>
          <NotificationTitle notification={notification} />
          <NotificationContent notification={notification} />
        </div>
        <div
          css={css`
            padding: 0.5em 0 0.5em 0.25em !important;
          `}
        >
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {notification.sentAt ? <Timestamp date={notification.sentAt} /> : null}
        </div>
      </button>
      <NotificationState notification={notification} />
    </StyledContainer>
  );
}
