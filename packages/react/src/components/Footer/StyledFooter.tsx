/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useTheme } from '../../context/MagicBellThemeContext';
import { toRGBA } from '../../lib/color';
import { cleanslate } from '../Styled';

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
    text-align: ${footerTheme.textAlign} !important;
    font-size: ${footerTheme.fontSize} !important;
    padding: 12px 24px !important;
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
