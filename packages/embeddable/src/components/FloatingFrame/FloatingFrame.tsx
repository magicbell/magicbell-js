/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { MagicBellContext } from '@magicbell/magicbell-react';
import { FloatingNotificationInboxProps } from '@magicbell/magicbell-react/dist/types/components/FloatingNotificationInbox';
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
  const { header: headerTheme, footer: footerTheme, notification: notificationTheme } = theme;

  const handleNotificationClick = (notification) => {
    toggle();
    onNotificationClick?.(notification);
  };

  return (
    <Tippy
      render={(attrs) => (
        <div
          css={css`
            background-color: ${notificationTheme.default.backgroundColor} !important;
            color: ${notificationTheme.default.textColor} !important;
            border-radius: ${headerTheme.borderRadius} ${headerTheme.borderRadius} ${footerTheme.borderRadius}
              ${footerTheme.borderRadius} !important;
            box-shadow: 0px 20px 25px rgba(84, 95, 111, 0.1), 0px 10px 10px rgba(84, 95, 111, 0.04) !important;
          `}
          {...attrs}
        >
          <FrameContent onNotificationClick={handleNotificationClick} {...props} />
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
