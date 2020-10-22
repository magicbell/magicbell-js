import { MagicBellContext } from '@magicbell/magicbell-react';
import { FloatingNotificationInboxProps } from '@magicbell/magicbell-react/dist/types/components/FloatingNotificationInbox';
import Tippy from '@tippyjs/react/headless';
import { h } from 'preact';
import { useContext } from 'preact/hooks';
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
  const { header: headerTheme, footer: footerTheme } = theme;

  const handleNotificationClick = (notification) => {
    toggle();
    onNotificationClick?.(notification);
  };

  return (
    <Tippy
      render={(attrs) => (
        <div
          style={{
            borderRadius: `${headerTheme.borderRadius} ${headerTheme.borderRadius} ${footerTheme.borderRadius} ${footerTheme.borderRadius}`,
          }}
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
