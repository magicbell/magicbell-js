/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { INotification } from '@magicbell/react-headless';
import { HTMLAttributes, ReactNode } from 'react';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import { toRGBA } from '../../lib/color.js';
import { cleanslate } from '../Styled/index.js';

export type Props = {
  notification: INotification;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * A container for the `ClickableNotification` component. The style is taken
 * from the theme.
 *
 * @example
 * <StyledContainer notification={notification} onClick={openActionUrl} />
 */
export default function StyledContainer({ notification, children, ...props }: Props) {
  const { notification: themeVariants } = useTheme();

  const theme = !notification.isSeen
    ? themeVariants.unseen
    : !notification.isRead
    ? themeVariants.unread
    : themeVariants.default;

  const style = css`
    background-color: ${toRGBA(theme.backgroundColor, theme.backgroundOpacity)} !important;
    border-radius: ${theme.borderRadius} !important;
    color: ${theme.textColor} !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-family: ${theme.fontFamily} !important;
    font-size: ${theme.fontSize} !important;
    margin: ${theme.margin} !important;
    padding: ${theme.padding} !important;
    text-align: ${theme.textAlign} !important;
    text-transform: ${theme.textTransform};
    transition: background-color 300ms ease-out;
    min-height: 32px;
    position: relative !important;

    &:hover {
      background-color: ${toRGBA(theme.hover.backgroundColor, theme.hover.backgroundOpacity)} !important;
    }

    & > * {
      position: relative;
    }
  `;

  return (
    <div css={[cleanslate, style]} {...props}>
      {children}
    </div>
  );
}
