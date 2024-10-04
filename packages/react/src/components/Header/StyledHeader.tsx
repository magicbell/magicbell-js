/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import { toRGBA } from '../../lib/color.js';
import { cleanslate } from '../Styled/index.js';

export interface Props {
  children: ReactNode;
}

/**
 * Header for the notification inbox. It renders a "Mark All Read" button,
 * which invokes the `onAllRead` callback.
 *
 * The component must be wrapped in a {@link MagicBellThemeProvider} component.
 *
 * @example
 * <StyledHeader>Title</StyledHeader>
 */
export default function StyledHeader({ children }: Props) {
  const theme = useTheme();
  const { header: headerTheme } = theme;

  const style = css`
    align-items: center;
    background: ${toRGBA(headerTheme.backgroundColor, headerTheme.backgroundOpacity)} !important;
    color: ${headerTheme.textColor};
    display: flex;
    font-family: ${headerTheme.fontFamily} !important;
    font-size: ${headerTheme.fontSize} !important;
    justify-content: space-between;
    text-align: ${headerTheme.textAlign} !important;
    text-transform: ${headerTheme.textTransform} !important;
    padding: ${headerTheme.padding} !important;
    flex-shrink: 0 !important;
    border-bottom: ${headerTheme.borderColor ? `1px solid ${headerTheme.borderColor} !important` : undefined};
    font-weight: ${headerTheme.fontWeight};
    height: ${headerTheme.fontSize} !important;

    &:first-of-type {
      border-radius: ${headerTheme.borderRadius} ${headerTheme.borderRadius} 0 0 !important;
    }

    &:last-of-type {
      border-radius: 0 0 ${headerTheme.borderRadius} ${headerTheme.borderRadius}!important;
    }

    & button:hover {
      opacity: 0.8;
    }

    & button:active {
      opacity: 0.9;
    }

    & button:focus {
      outline: none;
    }

    & button:focus-visible {
      outline: 2px ${headerTheme.textColor} auto !important;
    }
  `;

  return <div css={[cleanslate, style]}>{children}</div>;
}
