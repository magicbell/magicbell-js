import {
  autoPlacement,
  autoUpdate,
  flip,
  Middleware,
  offset,
  OpenChangeReason,
  Placement,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import React, { ReactNode } from 'react';

import { NotificationInboxProps } from '../NotificationInbox/index.js';
import Arrow from './Arrow.js';

export interface Props extends NotificationInboxProps {
  isOpen: boolean;
  toggle?: () => void;
  launcherRef: React.RefObject<Element>;
  placement?: Placement;
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
  width = 500,
  closeOnClickOutside = true,
  hideArrow = false,
  children,
}: Props) {
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

  return (
    <>
      {isOpen ? (
        <div
          ref={floating.refs.setFloating}
          style={{ ...floating.floatingStyles, width, maxWidth: `calc(100vw - 10px)`, zIndex: 1 }}
          {...getFloatingProps()}
        >
          {children}
          {hideArrow ? null : <Arrow placement={floating.placement} />}
        </div>
      ) : null}
    </>
  );
}
