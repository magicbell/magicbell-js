/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useTheme } from '../../context/MagicBellThemeContext';
import { toRGBA } from '../../lib/color';
import { cleanslate } from '../Styled';
import { ReactNode } from 'react';

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
    padding: 16px 24px !important;
    flex-shrink: 0 !important;

    &:first-of-type {
      border-radius: ${headerTheme.borderRadius} ${headerTheme.borderRadius} 0 0 !important;
    }

    &:last-of-type {
      border-radius: 0 0 ${headerTheme.borderRadius} ${headerTheme.borderRadius}!important;
    }
  `;

  return <div css={[cleanslate, style]}>{children}</div>;
}
