/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useBell } from '@magicbell/react-headless';
import { isNil } from 'ramda';

import { useMagicBellContext } from '../../context/MagicBellContext.js';
import { useTheme } from '../../context/MagicBellThemeContext.js';
import { cleanslate } from '../Styled/index.js';
import BellBadge from './BellBadge.js';
import BellIcon from './BellIcon.js';

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
  const { isFetchingConfig } = useMagicBellContext();
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

  if (isFetchingConfig) {
    return <div css={[cleanslate, containerStyle]} />;
  }

  return (
    <a
      // Ugly, but we need it for now due to style issues
      role="button"
      onClick={handleClick}
      css={[cleanslate, containerStyle]}
      aria-label="Notifications"
      data-testid="bell"
      data-magicbell-bell
    >
      <div css={iconStyle}>{!isNil(Icon) ? Icon : <BellIcon />}</div>
      {notifications && (
        <Badge count={counter === 'unread' ? notifications?.unreadCount : notifications?.unseenCount} />
      )}
    </a>
  );
}
