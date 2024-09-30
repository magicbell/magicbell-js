/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { clientSettings, useConfig } from '@magicbell/react-headless';
import { path, pathOr } from 'ramda';

import { useTheme } from '../../context/MagicBellThemeContext.js';
import { toRGBA } from '../../lib/color.js';
import { useLocalStorage } from '../../lib/use-local-storage.js';
import { openWindow } from '../../lib/window.js';
import Text from '../Text/index.js';
import CloseBannerButton from './CloseBannerButton.js';
import EnablePushNotificationsButton from './EnablePushNotificationsButton.js';

/**
 * Banner to ask the user to enable push notifications.
 *
 * @example
 * <EnablePushNotificationsBanner />
 */
export default function EnablePushNotificationsBanner() {
  const { channels } = useConfig();
  const isWebPushEnabled = pathOr(false, ['webPush', 'enabled'], channels);

  const { apiKey, userEmail, userExternalId } = clientSettings.getState();

  const theme = useTheme();

  const [wasRequested, setRequestedAt] = useLocalStorage<number | null>(
    `magicbell:${apiKey}:web-push-requested-at`,
    null,
  );

  const enablePushNotifications = () => {
    const subscribeUrl = path<string>(['webPush', 'config', 'subscribeUrl'], channels);
    const { accentColor, backgroundColor, textColor } = theme.dialog;

    const url = new URL(subscribeUrl);
    if (userEmail) url.searchParams.set('user_email', userEmail);
    if (userExternalId) url.searchParams.set('user_external_id', userExternalId);

    if (accentColor && backgroundColor && textColor) {
      url.searchParams.set('background_color', backgroundColor);
      url.searchParams.set('text_color', textColor);
      url.searchParams.set('accent_color', accentColor);
    }

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
