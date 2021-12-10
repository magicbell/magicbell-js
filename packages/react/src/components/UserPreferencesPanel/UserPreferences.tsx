import { clientSettings, useConfig } from '@magicbell/react-headless';
import axios from 'axios';
import path from 'ramda/src/path';
import React from 'react';
import { useTheme } from '../../context/MagicBellThemeContext';
import ToggleInput from './ToggleInput';

/**
 * @example
 * <UserPreferences />
 */
export default function UserPreferences() {
  const { getState } = clientSettings;
  const { userEmail, userExternalId } = getState();
  const channelsConfig = useConfig((state) => state.channels);
  const theme = useTheme();

  const enablePushNotifications = () => {
    const top = (window.screen.height - 400) / 4;
    const left = (window.screen.width - 600) / 2;
    const subscribeUrl = path(['webPushNotifications', 'subscribeUrl'], channelsConfig);

    const url = axios.getUri({
      url: subscribeUrl,
      params: {
        user_email: userEmail,
        user_external_id: userExternalId,
        background_color: theme.header.backgroundColor,
        text_color: theme.header.textColor,
      },
    });

    window.open(url, '', `width=600,height=400,scrollbars=no,top=${top},left=${left}`);
  };

  return (
    <div>
      <ToggleInput
        id="toggle-push-notifications"
        label={
          <>
            Enable Browser-Push Notification Delivery
            <span
              style={{
                backgroundColor: '#BBB',
                borderRadius: '4px',
                color: 'white',
                padding: '4px',
                margin: '0 4px',
                fontSize: '10px',
              }}
            >
              Beta
            </span>
          </>
        }
        onClick={enablePushNotifications}
        value={false}
      />
    </div>
  );
}
