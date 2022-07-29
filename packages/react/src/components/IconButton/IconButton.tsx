import React from 'react';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import Tooltip, { TooltipProps } from '../Tooltip/Tooltip';

type IconButtonProps = {
  children?: ReactNode;
  tooltip?: string;
  tooltipPlacement?: TooltipProps['placement'];
} & HTMLAttributes<HTMLButtonElement>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { children, tooltip, tooltipPlacement = 'bottom-end', ...props },
  ref,
) {
  return (
    <Tooltip tooltip={tooltip || props['aria-label']} placement={tooltipPlacement} delay={500}>
      <button ref={ref} {...props}>
        {children}
      </button>
    </Tooltip>
  );
});

export default IconButton;
