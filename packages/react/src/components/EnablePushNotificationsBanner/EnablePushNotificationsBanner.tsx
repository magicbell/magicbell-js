/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { clientSettings, useConfig } from '@magicbell/react-headless';
import axios from 'axios';
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
    const subscribeUrl = path(['webPush', 'config', 'subscribeUrl'], channels);
    const url = axios.getUri({
      url: subscribeUrl,
      params: {
        user_email: userEmail,
        user_external_id: userExternalId,
        background_color: theme.header.backgroundColor,
        text_color: theme.header.textColor,
      },
    });

    setRequestedAt(Date.now());
    openWindow(url);
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
