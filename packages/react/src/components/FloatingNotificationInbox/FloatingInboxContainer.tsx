import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  FloatingArrow,
  Middleware,
  offset,
  OpenChangeReason,
  Placement,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import React, { ReactNode, useRef } from 'react';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import { NotificationInboxProps } from '../NotificationInbox/index.js';

export interface Props extends NotificationInboxProps {
  isOpen: boolean;
  toggle?: () => void;
  launcherRef: React.RefObject<Element>;
  placement?: Placement;
  offset?: number | { mainAxis?: number; crossAxis?: number };
  arrowPadding?: number;
  width?: number;
  closeOnClickOutside?: boolean;
  hideArrow?: boolean;
  layout?: string[];
  children: ReactNode | ReactNode[];
}

/**
 * Notification inbox in a popover.
 *
 * @example
 * <FloatingNotificationInbox height={400} toggle={() => void} isOpen />
 */
export default function FloatingInboxContainer({
  launcherRef,
  isOpen = false,
  toggle,
  placement,
  offset: offsetProp = 10,
  width = 500,
  closeOnClickOutside = true,
  hideArrow = false,
  arrowPadding = 18,
  children,
}: Props) {
  const arrowRef = useRef(null);
  const theme = useTheme();

  const middleware: Middleware[] = [placement ? flip() : autoPlacement(), offset(offsetProp)];

  if (!hideArrow) {
    middleware.push(
      arrow({
        element: arrowRef,
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

  const arrowColor = /bottom/i.test(floating.placement) ? theme.footer.backgroundColor : theme.header.backgroundColor;

  return (
    <>
      {isOpen ? (
        <div
          ref={floating.refs.setFloating}
          style={{ ...floating.floatingStyles, width, maxWidth: `calc(100vw - 10px)`, zIndex: 1 }}
          {...getFloatingProps()}
        >
          {children}
          {hideArrow ? null : (
            <FloatingArrow ref={arrowRef} context={floating.context} tipRadius={1} width={18} fill={arrowColor} />
          )}
        </div>
      ) : null}
    </>
  );
}
