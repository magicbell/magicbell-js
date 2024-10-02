/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { offset, Placement, useFloating, useHover, useInteractions } from '@floating-ui/react';
import { cloneElement, ReactElement, useState } from 'react';

import { useTheme } from '../../context/MagicBellThemeContext.js';

export type TooltipProps = {
  tooltip?: string;
  children: ReactElement;
  placement: Placement;
  delay?: number;
};

/**
 * Component that renders a tooltip.
 */
export default function Tooltip({ children, tooltip, placement, delay = 250 }: TooltipProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { refs, context, floatingStyles } = useFloating({
    placement,
    middleware: [offset({ mainAxis: 8 })],
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context, {
    delay,
  });
  const { getFloatingProps, getReferenceProps } = useInteractions([hover]);

  if (!tooltip) return children;

  const { container: containerTheme, notification: notificationTheme } = theme;

  const tipStyle = css`
    background: ${containerTheme.backgroundColor} !important;
    border-radius: 4px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: ${notificationTheme.default.textColor} !important;
    font-size: 0.8em !important;
    padding: 0.5em !important;
    text-transform: ${notificationTheme.default.textTransform};
    white-space: nowrap !important;
  `;

  return (
    <>
      {cloneElement(children, { ref: refs.setReference, ...getReferenceProps(children.props) })}
      {isOpen && (
        <div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 1 }} {...getFloatingProps()}>
          <span css={tipStyle}>{tooltip}</span>
        </div>
      )}
    </>
  );
}
