/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Dayjs } from 'dayjs';

import { useTheme } from '../../context/MagicBellThemeContext';

export interface TimestampTooltipProps {
  date: Dayjs;
}

/**
 * Component that renders a formatted date. The component is styled as a
 * tooltip.
 *
 * @example
 * <TimestampTooltip date={dayjs()} />
 */
export default function TimestampTooltip({ date }: TimestampTooltipProps) {
  const theme = useTheme();
  const { container: containerTheme, notification: notificationTheme } = theme;

  return (
    <span
      css={css`
        background: ${containerTheme.backgroundColor} !important;
        border-radius: 4px !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        color: ${notificationTheme.default.textColor} !important;
        font-size: 0.8em !important;
        padding: 0.5em !important;
        text-transform: ${notificationTheme.default.textTransform};
        white-space: nowrap !important;
      `}
    >
      {date.format('LL LT')}
    </span>
  );
}
