/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import INotification from '@magicbell/react-headless/dist/types/INotification';

import { useTheme } from '../../context/MagicBellThemeContext';

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

  const {
    notification: {
      default: { title: theme },
    },
  } = useTheme();

  return (
    <p
      id={`magicbell-notification-title-${notification.id}`}
      css={css`
        cursor: inherit;
        font-weight: ${theme.fontWeight} !important;
        font-family: ${theme.fontFamily} !important;
        font-size: ${theme.fontSize} !important;
        color: ${theme.textColor} !important;
        line-height: 1.2 !important;
        word-break: break-word !important;
      `}
    >
      {title}
    </p>
  );
}
