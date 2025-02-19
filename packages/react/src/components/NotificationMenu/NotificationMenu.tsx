/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flip, offset, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { INotification } from '@magicbell/react-headless';
import { useState } from 'react';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import { useTranslate } from '../../context/TranslationsContext.js';
import MenuIcon from '../icons/MenuIcon.js';
import NotificationContextMenu from '../NotificationContextMenu/index.js';

export interface Props {
  notification: INotification;
}

/**
 * Component that renders the context menu
 *
 * @example
 * <NotificationState notification={notification} />
 */
export default function NotificationMenu({ notification }: Props) {
  const { notification: themeVariants } = useTheme();
  const t = useTranslate();

  const [isOpen, setIsOpen] = useState(false);

  const theme = !notification.isSeen
    ? themeVariants.unseen
    : !notification.isRead
    ? themeVariants.unread
    : themeVariants.default;

  const { refs, context, floatingStyles } = useFloating({
    placement: 'bottom-end',
    middleware: [flip(), offset({ mainAxis: 2, crossAxis: -4 })],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const dismiss = useDismiss(context);
  const click = useClick(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([dismiss, click]);

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        data-magicbell-target="notification-menu"
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
        {...getReferenceProps()}
      >
        <MenuIcon />
      </button>
      {isOpen && (
        <div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 1 }} {...getFloatingProps()}>
          <NotificationContextMenu notification={notification} />
        </div>
      )}
    </>
  );
}
