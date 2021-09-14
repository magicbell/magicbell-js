import React from 'react';
import { openActionUrl } from '../ClickableNotification/eventHandlers';
import NotificationInbox, { NotificationInboxProps } from '../NotificationInbox';
import { NotificationListItem } from '../NotificationList/NotificationList';
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
  layout = ['header', 'content', 'push-notifications-banner', 'footer'],
  ...inboxProps
}: Props) {
  const handleNotificationClick = (notification) => {
    if (onNotificationClick) onNotificationClick(notification);
    else openActionUrl(notification);

    if (closeOnNotificationClick) toggle?.();
  };

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
          <NotificationInbox onNotificationClick={handleNotificationClick} layout={layout} {...inboxProps} />
          {hideArrow ? null : <Arrow placement={attrs['data-placement']} />}
        </StyledPopoverContainer>
      )}
    </Popover>
  );
}
