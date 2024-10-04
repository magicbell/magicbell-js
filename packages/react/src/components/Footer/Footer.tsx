/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import FooterLogo from './FooterLogo.js';
import StyledFooter from './StyledFooter.js';

export type FooterProps = {
  children?: ReactNode;
};

/**
 * Footer for the notification inbox. Renders a button to toggle the user
 * preferences panel.
 *
 * @example
 * <Footer />
 */
export default function Footer({ children }: FooterProps) {
  const theme = useTheme();
  const { footer: footerTheme } = theme;

  const contentStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${footerTheme.textColor} !important;

    a,
    button {
      color: ${footerTheme.textColor};
      display: block;
    }

    a {
      opacity: 0.85;
    }
  `;

  return (
    <StyledFooter>
      <div css={contentStyle}>
        <FooterLogo />
        {children}
      </div>
    </StyledFooter>
  );
}
