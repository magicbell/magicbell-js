import Tippy from '@tippyjs/react/headless';
import React from 'react';

export type PopoverPlacement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';

export interface PopoverProps {
  children: (attrs) => React.ReactNode;
  closeOnClick?: boolean;
  isOpen?: boolean;
  launcher?: React.ReactElement;
  launcherRef?;
  offset?: { skidding: number; distance: number };
  onClickOutside?: () => void;
  placement?: PopoverPlacement;
  popperOptions?;
  zIndex?: number;
  trigger?: 'mouseenter focus' | 'click' | 'focusin' | 'mouseenter click' | 'manual';
}

/**
 * Headless popover. Renders the children as its content when the popover is open.
 *
 * You can either pass the launcher component as a property or the ref of the launcher,
 * however one of those is required.
 *
 * @example
 * <Popover launcherRef={bellRef}>
 *   {() => <p>Content</p>}
 * <Popover>
 */
export default function Popover({
  closeOnClick = false,
  children,
  isOpen,
  launcher,
  launcherRef,
  offset = { skidding: 0, distance: 10 },
  onClickOutside,
  placement = 'bottom-end',
  popperOptions,
  zIndex = 9999,
  trigger = 'mouseenter focus',
}: PopoverProps) {
  const controlledMode = isOpen !== undefined;
  const triggerProps = controlledMode ? { visible: isOpen } : { trigger };

  const handleClickOutside = () => {
    onClickOutside?.();
  };

  return (
    <Tippy
      render={children}
      offset={[offset.skidding, offset.distance]}
      onClickOutside={handleClickOutside}
      placement={placement}
      popperOptions={popperOptions}
      reference={launcherRef}
      interactive={!closeOnClick}
      zIndex={zIndex}
      {...triggerProps}
    >
      {launcher}
    </Tippy>
  );
}
