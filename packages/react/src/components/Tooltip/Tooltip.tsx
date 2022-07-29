/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ReactElement } from 'react';

import { useTheme } from '../../context/MagicBellThemeContext';
import Popover, { PopoverProps } from '../Popover/Popover';

export type TooltipProps = {
  tooltip?: string;
  children: ReactElement;
} & Omit<PopoverProps, 'children' | 'launcher'>;

/**
 * Component that renders a tooltip.
 */
export default function Tooltip({ children, tooltip, placement = 'auto', ...props }: TooltipProps) {
  const theme = useTheme();
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
    <Popover launcher={children} placement={placement} {...props}>
      {() => <span css={tipStyle}>{tooltip}</span>}
    </Popover>
  );
}
