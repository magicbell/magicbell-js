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

  const handleClick = () => {
    notification.markAsRead();

    if (onClick) onClick(notification);
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
          {notification.sentAt ? <Timestamp date={notification.sentAt} /> : null}
        </div>
      </button>
      <NotificationState notification={notification} />
    </StyledContainer>
  );
}
