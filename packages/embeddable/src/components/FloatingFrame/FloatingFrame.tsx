/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  FloatingArrow,
  Middleware,
  offset,
  OpenChangeReason,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { FloatingNotificationInbox, Notification, useTheme } from '@magicbell/magicbell-react';
import { ComponentProps, useState } from 'react';

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
  offset: offsetProp = 10,
  arrowPadding = 18,
  hideArrow = false,
  ...props
}: FloatingNotificationInboxProps) {
  const [arrowEl, setArrowEl] = useState(null);
  const middleware: Middleware[] = [placement ? flip() : autoPlacement(), offset(offsetProp)];

  if (!hideArrow) {
    middleware.push(
      arrow({
        element: arrowEl,
        padding: arrowPadding,
      }),
    );
  }

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
    font-family: ${containerTheme.fontFamily} !important;
    background-color: ${containerTheme.backgroundColor} !important;
    color: ${containerTheme.textColor} !important;
    border-radius: ${headerTheme.borderRadius} ${footerTheme.borderRadius} !important;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.08), 0 5px 12px rgba(0, 0, 0, 0.16) !important;
  `;

  const arrowColor = /bottom/i.test(floating.placement) ? footerTheme.backgroundColor : headerTheme.backgroundColor;

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
          {hideArrow ? null : (
            <FloatingArrow ref={setArrowEl} context={floating.context} tipRadius={1} width={18} fill={arrowColor} />
          )}
        </div>
      ) : null}
    </>
  );
}
