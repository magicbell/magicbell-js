/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Dayjs } from 'dayjs';

import { useTheme } from '../../context/MagicBellThemeContext';
import { darken, toRGBA } from '../../lib/color';

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
        border-radius: ${notificationTheme.default.borderRadius} !important;
        box-shadow: 2px 2px 3px ${darken(toRGBA(containerTheme.backgroundColor, 0.5), 10)};
        color: ${notificationTheme.default.textColor} !important;
        font-size: 0.8em !important;
        padding: 0.5em !important;
        text-transform: ${notificationTheme.default.textTransform};
      `}
    >
      {date.format('LL LT')}
    </span>
  );
}
