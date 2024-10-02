import React from 'react';

import { useMagicBellContext } from '../../context/MagicBellContext.js';
import NotificationInbox, { NotificationInboxProps } from '../NotificationInbox/index.js';
import { NotificationListItem } from '../NotificationList/NotificationList.js';
import { PopoverPlacement, PopperOptions } from '../Popover/index.js';
import FloatingInboxContainer from './FloatingInboxContainer.js';

export interface Props extends NotificationInboxProps {
  isOpen: boolean;
  toggle?: () => void;
  launcherRef: React.RefObject<Element>;
  placement?: PopoverPlacement;
  width?: number;
  closeOnClickOutside?: boolean;
  closeOnNotificationClick?: boolean;
  popperOptions?: PopperOptions;
  hideArrow?: boolean;
  NotificationItem?: NotificationListItem;
  layout?: string[];
}

/**
 * Notification inbox in a popover.
 *
 * @example
 * <FloatingNotificationInbox height={400} toggle={() => void} isOpen />
 */
export default function FloatingNotificationInbox({
  launcherRef,
  isOpen,
  toggle,
  placement = 'auto',
  width = 500,
  onNotificationClick,
  closeOnClickOutside = true,
  closeOnNotificationClick = true,
  popperOptions,
  hideArrow = false,
  layout,
  ...inboxProps
}: Props) {
  const handleNotificationClick = (notification) => {
    if (closeOnNotificationClick) toggle?.();
    return onNotificationClick?.(notification);
  };

  const { isFetchingConfig } = useMagicBellContext();
  if (isFetchingConfig) return null;

  return (
    <FloatingInboxContainer
      launcherRef={launcherRef}
      isOpen={isOpen}
      toggle={toggle}
      placement={placement}
      width={width}
      closeOnClickOutside={closeOnClickOutside}
      popperOptions={popperOptions}
      hideArrow={hideArrow}
      layout={layout}
    >
      <NotificationInbox onNotificationClick={handleNotificationClick} layout={layout} {...inboxProps} />
    </FloatingInboxContainer>
  );
}
