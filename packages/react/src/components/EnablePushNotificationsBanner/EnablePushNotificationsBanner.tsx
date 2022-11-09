/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { clientSettings, useConfig } from '@magicbell/react-headless';
import { path, pathOr } from 'ramda';
import { useLocalStorage } from 'react-use';

import { useTheme } from '../../context/MagicBellThemeContext';
import { toRGBA } from '../../lib/color';
import { openWindow } from '../../lib/window';
import Text from '../Text';
import CloseBannerButton from './CloseBannerButton';
import EnablePushNotificationsButton from './EnablePushNotificationsButton';

/**
 * Banner to ask the user to enable push notifications.
 *
 * @example
 * <EnablePushNotificationsBanner />
 */
export default function EnablePushNotificationsBanner() {
  const config = useConfig();
  const { channels } = config;
  const isWebPushEnabled = pathOr(false, ['webPush', 'enabled'], channels);

  const { getState } = clientSettings;
  const { apiKey, userEmail, userExternalId } = getState();

  const theme = useTheme();

  const [wasRequested, setRequestedAt] = useLocalStorage<number | null>(
    `magicbell:${apiKey}:web-push-requested-at`,
    null,
  );

  const enablePushNotifications = () => {
    const subscribeUrl = path<string>(['webPush', 'config', 'subscribeUrl'], channels);

    const { backgroundColor, textColor } = theme.header;

    const url = new URL(subscribeUrl);
    if (userEmail) url.searchParams.append('user_email', userEmail);
    if (userExternalId) url.searchParams.append('user_external_id', userExternalId);
    if (backgroundColor) url.searchParams.append('background_color', backgroundColor);
    if (textColor) url.searchParams.append('text_color', textColor);

    setRequestedAt(Date.now());
    openWindow(url.toString());
  };

  const closeBanner = () => {
    setRequestedAt(Date.now());
  };

  if (wasRequested || !isWebPushEnabled) return null;
  return (
    <div
      css={css`
        padding: 14px 24px !important;
        display: flex;
        align-items: center;
        background: ${toRGBA(theme.banner.backgroundColor, theme.banner.backgroundOpacity)};
        box-shadow: ${theme.banner.boxShadow ? `${theme.banner.boxShadow} !important` : undefined};
        color: ${theme.banner.textColor} !important;
        font-family: ${theme.banner.fontFamily} !important;
        text-align: ${theme.banner.textAlign} !important;
        font-size: ${theme.banner.fontSize} !important;
        line-height: 1.5 !important;

        & > * {
          margin-left: 1em;
        }
      `}
    >
      <p style={{ flex: 1 }}>
        <Text
          id="web-push-notifications.notice"
          defaultMessage="By enabling browser notifications, you’ll stay up to date even better."
        />
      </p>
      <EnablePushNotificationsButton onClick={enablePushNotifications} />
      <CloseBannerButton onClick={closeBanner} />
    </div>
  );
}
