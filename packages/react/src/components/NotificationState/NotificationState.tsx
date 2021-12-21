/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import { useState } from 'react';

import { useTheme } from '../../context/MagicBellThemeContext';
import { toRGBA } from '../../lib/color';
import NotificationContextMenu from '../NotificationContextMenu';
import Popover from '../Popover';
import DotIcon from './DotIcon';
import MenuIcon from './MenuIcon';

export interface Props {
  notification: INotification;
  menuPlacement?:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
}

/**
 * Component that renders a dot if the notification is unread and an icon for
 * the context menu otherwise. In any case, the context menu can be opened on
 * click.
 *
 * @example
 * <NotificationState notification={notification} />
 */
export default function NotificationState({ notification, menuPlacement = 'bottom-end' }: Props) {
  const theme = useTheme();
  const { header: headerTheme, notification: notificationTheme } = theme;
  const [isHovered, setHovered] = useState(false);

  const launcher = (
    <div
      css={css`
        display: flex !important;
        align-items: center !important;
        padding: 0.5em 0 0.5em 0.25em !important;
        color: ${notification.isRead
          ? toRGBA(notificationTheme.default.textColor, 0.5)
          : headerTheme.backgroundColor} !important;

        svg {
          height: 1.5em;
          fill: currentColor;
        }
      `}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {notification.isRead || isHovered ? <MenuIcon /> : <DotIcon />}
    </div>
  );

  return (
    <Popover
      launcher={launcher}
      offset={{ skidding: -4, distance: 2 }}
      placement={menuPlacement}
      zIndex={0}
    >
      {() => <NotificationContextMenu notification={notification} />}
    </Popover>
  );
}
