/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useTheme } from '../../context/MagicBellThemeContext';
import Badge from '../Badge';

export interface Props {
  count: number;
}

/**
 * Badge for the bell. Fetches the notifications to get the number of unseen
 * notifications, and displays a badge if there are any.
 *
 * It must be wrapped in a {@link MagicBellThemeProvider}.
 *
 * @example
 * <BellBadge count={3} />
 */
export default function BellBadge({ count }: Props) {
  const theme = useTheme();
  const { icon: iconTheme } = theme;

  if (count === 0) return null;

  return (
    <div
      css={css`
        position: absolute !important;
        transform: translate(-50%, -50%) scale(${Math.max(1, parseInt(iconTheme.width) / 24)});
        top: 10%;
        left: 80%;
      `}
    >
      <Badge count={count} />
    </div>
  );
}
