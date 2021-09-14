import React from 'react';
import Text from '../Text';
import HeaderTitle from './HeaderTitle';
import StyledHeader from './StyledHeader';

export interface Props {
  onAllRead: () => void;
}

/**
 * Header for the notification inbox. It renders a "Mark All Read" button,
 * which invokes the `onAllRead` callback.
 *
 * The component must be wrapped in a {@link MagicBellThemeProvider} component.
 *
 * @example
 * <Header onAllRead={markNotificationsAsRead} />
 */
export default function Header({ onAllRead }: Props) {
  const handleClick = () => onAllRead();

  return (
    <StyledHeader>
      <HeaderTitle />
      <button onClick={handleClick} data-testid="mark-all-as-read">
        <Text id="header.mark-all-read" defaultMessage="Mark All Read" />
      </button>
    </StyledHeader>
  );
}
