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
  const theme = useTheme();
  const { container: containerTheme } = theme;
  const [ltBorderRadius, rtBorderRadius, rbBorderRadius, lbBorderRadius] =
    useContainerBorderRadius(layout);

  return (
    <div
      css={[
        cleanslate,
        css`
          background-color: ${containerTheme.backgroundColor};
          border-radius: ${ltBorderRadius} ${rtBorderRadius} ${rbBorderRadius} ${lbBorderRadius};
          color: ${containerTheme.textColor};
          display: flex;
          flex-direction: column;
          font-family: ${containerTheme.fontFamily} !important;
          height: ${height ? `${height}px` : 'auto'};
          overflow: hidden;
        `,
      ]}
    >
      {children}
    </div>
  );
}
