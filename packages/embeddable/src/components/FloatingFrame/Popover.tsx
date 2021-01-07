import Tippy from '@tippyjs/react/headless';
import React from 'react';

interface PopoverProps {
  isOpen: boolean;
  placement?:
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
  reference: React.RefObject<Element>;
  onClickOutside: () => void;
  children: (any) => JSX.Element;
}

/**
 * Popover powered by tippy. The position of it can be customized through the
 * optional `placement` property.
 *
 * @example
 * <Popover position="auto">
 *   {() => <p>Content</p>}
 * </Popover>
 */
export default function Popover({ isOpen, placement = 'auto', reference, onClickOutside, children }: PopoverProps) {
  return (
    <Tippy
      render={(attrs) => children(attrs)}
      visible={isOpen}
      onClickOutside={onClickOutside}
      reference={reference}
      placement={placement}
      interactive
    />
  );
}
