/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import { useTheme } from '../../context/MagicBellThemeContext';
import { darken, toRGBA } from '../../lib/color';
import { cleanslate } from '../Styled';

export interface Props {
  notification: INotification;
  children: React.ReactElement | React.ReactElement[];
}

/**
 * A container for the `ClickableNotification` component. The style is taken
 * from the theme.
 *
 * @example
 * <StyledContainer notification={notification} onClick={openActionUrl} />
 */
export default function StyledContainer({ notification, children }: Props) {
  const theme = useTheme();
  const { notification: notificationTheme } = theme;

  let themeVariation = notificationTheme.default;
  if (!notification.isSeen) themeVariation = notificationTheme.unseen;
  else if (!notification.isRead) themeVariation = notificationTheme.unread;

  const style = css`
    background-color: ${notification.isSeen && notification.isRead
      ? 'transparent'
      : toRGBA(themeVariation.backgroundColor, themeVariation.backgroundOpacity)} !important;
    border-radius: ${themeVariation.borderRadius};
    color: ${themeVariation.textColor} !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-family: ${themeVariation.fontFamily} !important;
    font-size: ${themeVariation.fontSize};
    margin: 4px !important;
    overflow: hidden;
    text-align: ${themeVariation.textAlign} !important;
    text-transform: ${themeVariation.textTransform};
    transition: background-color 300ms ease-out;
    padding: 16px 20px !important;
    min-height: 32px;

    &:hover {
      background-color: ${darken(
        toRGBA(themeVariation.backgroundColor, themeVariation.backgroundOpacity),
        5,
      )} !important;
    }

    & > button {
      flex: 1;
      display: inline-flex;
      align-items: center;
      margin: 0 0 0 -16px;
      text-align: inherit !important;

      & > div {
        margin: 0 0 0 16px;
      }

      & > div:first-of-type {
        flex: 1;
      }
    }
  `;

  return <div css={[cleanslate, style]}>{children}</div>;
}
