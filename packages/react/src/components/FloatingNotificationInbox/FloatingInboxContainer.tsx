import React, { ReactNode } from 'react';

import { NotificationInboxProps } from '../NotificationInbox';
import Popover, { PopoverPlacement } from '../Popover';
import Arrow from './Arrow';
import StyledPopoverContainer from './StyledPopoverContainer';

export interface Props extends NotificationInboxProps {
  isOpen: boolean;
  toggle?: () => void;
  launcherRef: React.RefObject<Element>;
  placement?: PopoverPlacement;
  width?: number;
  closeOnClickOutside?: boolean;
  popperOptions?;
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
  isOpen,
  toggle,
  placement = 'auto',
  width = 500,
  closeOnClickOutside = true,
  popperOptions,
  hideArrow = false,
  layout = ['header', 'content', 'push-notifications-banner', 'footer'],
  children,
}: Props) {
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
        <StyledPopoverContainer width={width} attrs={attrs} layout={layout}>
          {children}
          {hideArrow ? null : <Arrow placement={attrs['data-placement']} />}
        </StyledPopoverContainer>
      )}
    </Popover>
  );
}
