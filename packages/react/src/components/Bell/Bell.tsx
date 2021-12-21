/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useBell } from '@magicbell/react-headless';
import isNil from 'ramda/src/isNil';

import { useTheme } from '../../context/MagicBellThemeContext';
import { cleanslate } from '../Styled';
import BellBadge from './BellBadge';
import BellIcon from './BellIcon';

export interface Props {
  Icon?: JSX.Element;
  Badge?: (props: { count: number }) => JSX.Element | null;
  onClick: () => void;
  storeId?: string;
  counter?: 'unread' | 'unseen';
}

/**
 * Bell. Renders the number of unseen notifications as well. When the bell is
 * clicked, all notifications are marked as seen.
 *
 * It must be wrapped in a {@link MagicBellThemeProvider} component.
 *
 * @example
 * <Bell onClick={toggleNotifications} />
 */
export default function Bell({ Icon, Badge = BellBadge, onClick, storeId, counter }: Props) {
  const notifications = useBell({ storeId });
  const theme = useTheme();
  const { icon: iconTheme } = theme;

  const handleClick = () => {
    notifications?.markAllAsSeen();
    onClick();
  };

  const containerStyle = css`
    display: block;
    cursor: pointer;
    position: relative !important;
    width: ${iconTheme.width} !important;
  `;

  const iconStyle = css`
    position: relative !important;

    & > * {
      height: 100%;
      width: 100%;
    }
  `;

  return (
    <a
      // Ugly, but we need it for now due to style issues
      role="button"
      onClick={handleClick}
      css={[cleanslate, containerStyle]}
      aria-label="Notifications"
    >
      <div css={iconStyle}>{!isNil(Icon) ? Icon : <BellIcon />}</div>
      {notifications && (
        <Badge
          count={counter === 'unread' ? notifications?.unreadCount : notifications?.unseenCount}
        />
      )}
    </a>
  );
}
