/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { INotification } from '@magicbell/react-headless';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import DotIcon from '../icons/DotIcon.js';

export interface Props {
  notification: INotification;
}

/**
 * Component that renders a dot with style based on notification state
 *
 * @example
 * <NotificationState notification={notification} />
 */
export default function NotificationState({ notification }: Props) {
  const { notification: themeVariants } = useTheme();

  const theme = !notification.isSeen
    ? themeVariants.unseen
    : !notification.isRead
    ? themeVariants.unread
    : themeVariants.default;

  return (
    <div
      css={css`
        flex: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 24px !important;
        height: 24px !important;
        color: ${theme.state.color} !important;
      `}
    >
      <DotIcon />
    </div>
  );
}
