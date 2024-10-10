/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  autoPlacement,
  autoUpdate,
  flip,
  Middleware,
  offset,
  OpenChangeReason,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import {
  FloatingNotificationInbox,
  FloatingNotificationInboxArrow,
  Notification,
  useTheme,
} from '@magicbell/magicbell-react';
import { ComponentProps } from 'react';

import IFrame from '../IFrame/index.js';

type FloatingNotificationInboxProps = ComponentProps<typeof FloatingNotificationInbox>;
/**
 * Renders an iframe within a popover. Its position can be customized through the
 * optional `placement` property. The popover has a poiting arrow.
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
  closeOnNotificationClick = true,
  closeOnClickOutside = true,
  ...props
}: FloatingNotificationInboxProps) {
  const middleware: Middleware[] = [placement ? flip() : autoPlacement(), offset(10)];

  const floating = useFloating({
    placement,
    middleware,
    strategy: 'absolute',
    open: isOpen,
    onOpenChange(open: boolean, event?: Event, reason?: OpenChangeReason) {
      if (reason === 'outside-press') {
        toggle?.();
      }
    },
    elements: { reference: launcherRef.current },
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(floating.context, {
    referencePress: false,
    outsidePress: closeOnClickOutside,
  });

  const { getFloatingProps } = useInteractions([dismiss]);

  const theme = useTheme();
  const { header: headerTheme, footer: footerTheme, container: containerTheme } = theme;

  const handleNotificationClick = (notification: Notification) => {
    if (closeOnNotificationClick) toggle?.();

    if (onNotificationClick) {
      onNotificationClick(notification);
    } else if (notification.actionUrl) {
      window.open(notification.actionUrl, '_self');
    }
  };

  const style = css`
    overflow: hidden !important;
    font-family: ${containerTheme.fontFamily} !important;
    background-color: ${containerTheme.backgroundColor} !important;
    color: ${containerTheme.textColor} !important;
    border-radius: ${headerTheme.borderRadius} ${footerTheme.borderRadius} !important;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.08), 0 5px 12px rgba(0, 0, 0, 0.16) !important;
  `;

  return (
    <>
      {isOpen ? (
        <div
          ref={floating.refs.setFloating}
          style={{ ...floating.floatingStyles, width: props.width, maxWidth: `calc(100vw - 10px)`, zIndex: 1 }}
          {...getFloatingProps()}
          css={style}
        >
          <IFrame onNotificationClick={handleNotificationClick} {...props} />
          <FloatingNotificationInboxArrow placement={floating.placement} />
        </div>
      ) : null}
    </>
  );
}
