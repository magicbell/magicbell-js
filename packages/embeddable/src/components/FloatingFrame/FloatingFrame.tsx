/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FloatingNotificationInboxArrow, MagicBellContext, Notification } from '@magicbell/magicbell-react';
import { FloatingNotificationInboxProps } from '@magicbell/magicbell-react/dist/components/FloatingNotificationInbox';
import Tippy from '@tippyjs/react/headless';
import { useContext } from 'react';
import FrameContent from '../FrameContent';

/**
 * Renders an iframe within a tooltip provided by tippy. The position of the
 * tooltip can be customized through the optional `placement` property.
 *
 * @example
 * (props) => <FloatingFrame position="auto" {...props} />
 */
export default function FloatingFrame({
  isOpen,
  placement,
  launcherRef,
  toggle,
  onNotificationClick,
  ...props
}: FloatingNotificationInboxProps) {
  const { theme } = useContext(MagicBellContext);
  const { header: headerTheme, footer: footerTheme, container: containerTheme } = theme;

  const handleNotificationClick = (notification: Notification) => {
    toggle();

    if (onNotificationClick) onNotificationClick(notification);
    else if (notification.actionUrl) window.open(notification.actionUrl, '_self');
  };

  return (
    <Tippy
      render={(attrs) => (
        <div
          css={css`
            overflow: hidden !important;
            font-family: ${containerTheme.fontFamily} !important;
            background-color: ${containerTheme.backgroundColor} !important;
            color: ${containerTheme.textColor} !important;
            border-radius: ${headerTheme.borderRadius} ${footerTheme.borderRadius} !important;
            box-shadow: 0px 20px 25px rgba(84, 95, 111, 0.1), 0px 10px 10px rgba(84, 95, 111, 0.04) !important;
          `}
          {...attrs}
        >
          <FrameContent onNotificationClick={handleNotificationClick} {...props} />
          <FloatingNotificationInboxArrow placement={attrs['data-placement']} />
        </div>
      )}
      visible={isOpen}
      onClickOutside={toggle}
      reference={launcherRef}
      placement={placement}
      interactive
    />
  );
}

FloatingFrame.defaultProps = {
  placement: 'auto',
};
