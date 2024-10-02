/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

import StyledHeader from './StyledHeader.js';

export interface Props {
  title: ReactNode;
  actions?: ReactNode;
}

/**
 * Header for the notification inbox. It renders a "Mark All Read" button,
 * which invokes the `onAllRead` callback.
 *
 * The component must be wrapped in a {@link MagicBellThemeProvider} component.
 *
 * @example
 * <Header title="Inbox" actions={<button>mark as read</button>>} />
 */
export default function Header({ title, actions }: Props) {
  return (
    <StyledHeader>
      <div
        role="heading"
        css={css`
          margin-right: 16px !important;
        `}
      >
        {title}
      </div>

      <div
        css={css`
          height: 14px;
          overflow: visible;
          display: flex;
          align-items: center;
          & > * + * {
            margin-left: 8px;
          }
        `}
      >
        {actions}
      </div>
    </StyledHeader>
  );
}
