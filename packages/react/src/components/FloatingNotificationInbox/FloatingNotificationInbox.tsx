import React from 'react';

import { openActionUrl } from '../ClickableNotification/eventHandlers';
import NotificationInbox, { NotificationInboxProps } from '../NotificationInbox';
import { NotificationListItem } from '../NotificationList/NotificationList';
import { PopoverPlacement } from '../Popover';
import FloatingInboxContainer from './FloatingInboxContainer';

export interface Props extends NotificationInboxProps {
  isOpen: boolean;
  toggle?: () => void;
  launcherRef: React.RefObject<Element>;
  placement?: PopoverPlacement;
  width?: number;
  closeOnClickOutside?: boolean;
  closeOnNotificationClick?: boolean;
  popperOptions?;
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
    if (onNotificationClick) onNotificationClick(notification);
    else openActionUrl(notification);

    if (closeOnNotificationClick) toggle?.();
  };

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
      <NotificationInbox
        onNotificationClick={handleNotificationClick}
        layout={layout}
        {...inboxProps}
      />
    </FloatingInboxContainer>
  );
}
