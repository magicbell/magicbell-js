/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import { toRGBA } from '../../lib/color.js';
import { cleanslate } from '../Styled/index.js';

export interface StyledFooterProps {
  children: React.ReactElement | React.ReactElement[];
}

/**
 * Container for the `Footer` component. Applies the theme defined for the footer.
 *
 * @example
 * <StyledFooter>Powered by MB</StyledFooter>
 */
export default function StyledFooter({ children }: StyledFooterProps) {
  const theme = useTheme();
  const { footer: footerTheme } = theme;

  const style = css`
    background: ${toRGBA(footerTheme.backgroundColor, footerTheme.backgroundOpacity)};
    color: ${toRGBA(footerTheme.textColor, 0.75)} !important;
    font-family: ${footerTheme.fontFamily} !important;
    font-size: ${footerTheme.fontSize} !important;
    font-weight: ${footerTheme.fontWeight} !important;
    text-align: ${footerTheme.textAlign} !important;
    padding: ${footerTheme.padding} !important;
    border-top: ${footerTheme.borderColor ? `1px solid ${footerTheme.borderColor} !important` : undefined};
    flex-shrink: 0 !important;

    &:first-of-type {
      border-radius: ${footerTheme.borderRadius} ${footerTheme.borderRadius} 0 0 !important;
    }

    &:last-of-type {
      border-radius: 0 0 ${footerTheme.borderRadius} ${footerTheme.borderRadius}!important;
    }

    span {
      color: ${footerTheme.textColor} !important;

      a {
        color: ${footerTheme.textColor};
        margin-right: 16px !important;
        opacity: 0.75;
        display: block;
      }
    }
  `;

  return <div css={[cleanslate, style]}>{children}</div>;
}
