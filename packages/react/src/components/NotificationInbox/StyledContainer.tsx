/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { useTheme } from '../../context/MagicBellThemeContext';
import { cleanslate } from '../Styled';
import useContainerBorderRadius from './useContainerBorderRadius';

interface StyledContainerProps {
  height?: number;
  children: React.ReactElement | React.ReactElement[];
  layout: string[];
}

/**
 * Container for the notification inbox.
 *
 * @example
 * <StyledContainer height={500}>
 *   <p>Cannot fetch notifications</p>
 * </StyledContainer>
 */
export default function StyledContainer({ height, children, layout }: StyledContainerProps) {
  const { container: theme } = useTheme();
  const [ltBorderRadius, rtBorderRadius, rbBorderRadius, lbBorderRadius] =
    useContainerBorderRadius(layout);

  return (
    <div
      css={[
        cleanslate,
        css`
          background-color: ${theme.backgroundColor};
          border-radius: ${ltBorderRadius} ${rtBorderRadius} ${rbBorderRadius} ${lbBorderRadius};
          color: ${theme.textColor};
          display: flex;
          flex-direction: column;
          font-family: ${theme.fontFamily} !important;
          font-weight: ${theme.fontWeight} !important;
          height: ${height ? `${height}px` : 'auto'};
          overflow: hidden;
          border: ${theme.borderColor ? `1px solid ${theme.borderColor} !important` : undefined};
          box-shadow: ${theme.boxShadow ? `${theme.boxShadow} !important` : undefined};
        `,
      ]}
    >
      {children}
    </div>
  );
}
