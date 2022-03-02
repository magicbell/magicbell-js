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
  const { footer: footerTheme } = theme;
  const { notification: notificationTheme } = theme;

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
        text-align: left;
        align-items: center;
        background: ${toRGBA(notificationTheme.unseen.backgroundColor, 0.1)};

        color: ${notificationTheme.unseen.textColor} !important;
        font-family: ${footerTheme.fontFamily} !important;
        text-align: ${footerTheme.textAlign} !important;
        font-size: ${footerTheme.fontSize} !important;

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
