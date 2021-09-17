/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import INotification from '@magicbell/react-headless/dist/types/INotification';

export interface Props {
  notification: INotification;
}

/**
 * Component that renders the title of a notification.
 *
 * @example
 * <NotificationTitle notification={notification} />
 */
export default function NotificationTitle({ notification }: Props) {
  const { title } = notification;

  return (
    <p
      title={title}
      css={css`
        cursor: inherit;
        font-weight: 500 !important;
        line-height: 1.2 !important;
        word-break: break-word !important;
      `}
    >
      {title}
    </p>
  );
}
