/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { INotification } from '@magicbell/react-headless';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import { useTranslate } from '../../context/TranslationsContext.js';
import MenuIcon from '../icons/MenuIcon.js';
import NotificationContextMenu from '../NotificationContextMenu/index.js';
import Popover from '../Popover/index.js';

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
 * Component that renders the context menu
 *
 * @example
 * <NotificationState notification={notification} />
 */
export default function NotificationMenu({ notification, menuPlacement = 'bottom-end' }: Props) {
  const { notification: themeVariants } = useTheme();
  const t = useTranslate();

  const theme = !notification.isSeen
    ? themeVariants.unseen
    : !notification.isRead
    ? themeVariants.unread
    : themeVariants.default;

  const launcher = (
    <button
      type="button"
      aria-label={t('notification.menu', 'Menu')}
      css={css`
        color: ${theme.textColor} !important;

        &:focus {
          outline: none;
        }

        &:focus-visible {
          outline: 2px ${theme.textColor} auto !important;
        }
      `}
      onClick={(e) => e.preventDefault()}
    >
      <MenuIcon />
    </button>
  );

  return (
    <Popover
      launcher={launcher}
      offset={{ skidding: -4, distance: 2 }}
      placement={menuPlacement}
      zIndex={1}
      trigger="click"
    >
      {() => <NotificationContextMenu notification={notification} />}
    </Popover>
  );
}
