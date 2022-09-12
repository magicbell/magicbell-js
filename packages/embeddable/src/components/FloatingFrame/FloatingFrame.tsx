/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FloatingNotificationInbox, FloatingNotificationInboxArrow, Notification, Popover, useTheme } from '@magicbell/magicbell-react';
import IFrame from '../IFrame';
import {ComponentProps} from "react";

type FloatingNotificationInboxProps = ComponentProps<typeof FloatingNotificationInbox>
/**
 * Renders an iframe within a popover. Its position can be customized through the
 * optional `placement` property. The popover has a poiting arrow.
 *
 * @example
 * (props) => <FloatingFrame position="auto" {...props} />
 */
export default function FloatingFrame({
  isOpen,
  placement = 'auto',
  launcherRef,
  toggle,
  onNotificationClick,
  closeOnNotificationClick = true,
  closeOnClickOutside = true,
  popperOptions,
  ...props
}: FloatingNotificationInboxProps) {
  const theme = useTheme();
  const { header: headerTheme, footer: footerTheme, container: containerTheme } = theme;

  const handleNotificationClick = (notification: Notification) => {
    if (closeOnNotificationClick) toggle?.();

    if (onNotificationClick) onNotificationClick(notification);
    else if (notification.actionUrl) window.open(notification.actionUrl, '_self');
  };

  const handleClickOutside = () => {
    if (closeOnClickOutside) toggle?.();
  };

  return (
    <Popover
      isOpen={isOpen}
      launcherRef={launcherRef}
      onClickOutside={handleClickOutside}
      placement={placement}
      popperOptions={popperOptions}
    >
      {(attrs) => (
        <div
          css={css`
            overflow: hidden !important;
            font-family: ${containerTheme.fontFamily} !important;
            background-color: ${containerTheme.backgroundColor} !important;
            color: ${containerTheme.textColor} !important;
            border-radius: ${headerTheme.borderRadius} ${footerTheme.borderRadius} !important;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.08), 0 5px 12px rgba(0, 0, 0, 0.16) !important;
          `}
          {...attrs}
        >
          <IFrame onNotificationClick={handleNotificationClick} {...props} />
          <FloatingNotificationInboxArrow placement={attrs['data-placement']} />
        </div>
      )}
    </Popover>
  );
}
