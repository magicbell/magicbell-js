/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { useTheme } from '../../context/MagicBellThemeContext';
import Text from '../Text';

interface Props {
  onClick: () => void;
}

/**
 *
 * @example
 * <EnablePushNotificationsButton onClick={enableNotifications} />
 */
export default function EnablePushNotificationsButton({ onClick }: Props) {
  const theme = useTheme();

  const handleClick = () => {
    onClick();
  };

  return (
    <button
      css={css`
        padding: 10px !important;
        border-radius: 4px !important;
        background: ${theme.footer.backgroundColor} !important;
        color: ${theme.footer.textColor} !important;
      `}
      onClick={handleClick}
    >
      <Text id="web-push-notifications.enable-now" defaultMessage="Enable Now" />
    </button>
  );
}
