/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useNotificationPreferences } from '@magicbell/react-headless';
import { CategoryPreference } from '@magicbell/react-headless/dist/types/IRemoteNotificationPreferences';
import { useEffect } from 'react';

import CategoryPreferences, { ChannelType } from './CategoryPreferences';

function channelToTitle(channel: ChannelType) {
  return (
    {
      inApp: 'IN-APP',
      email: 'EMAIL',
      webPush: 'WEB PUSH',
      mobilePush: 'MOBILE PUSH',
    }[channel] || channel
  );
}

function getChannelsFromPreferences(preferences: {
  categories: CategoryPreference;
}): ChannelType[] {
  const channelPrefs = Object.values(preferences.categories);
  if (!channelPrefs.length) return [];

  const combinedChannels = channelPrefs.reduce((channels, otherChannels) => {
    return { ...channels, ...otherChannels };
  });

  return Object.keys(combinedChannels) as ChannelType[];
}

export default function PreferencesCategories() {
  const preferences = useNotificationPreferences();

  const headerStyle = css`
    opacity: 0.8;
    text-transform: uppercase;
    font-size: 0.7rem !important;
  `;

  useEffect(() => {
    if (!preferences.lastFetchedAt) {
      preferences.fetch();
    }
  }, [preferences]);

  const channels = getChannelsFromPreferences(preferences);

  return (
    <div
      css={css`
        flex: 1;
        padding: 16px 20px !important;
        height: 100%;
        overflow-y: auto;
      `}
    >
      <div
        css={css`
          display: grid;
          gap: 1rem;
          grid-template-columns: 2fr ${' 1fr'.repeat(channels.length).trim()};
        `}
      >
        <div />
        {channels.map((channel) => (
          <div key={channel} css={headerStyle}>
            {channelToTitle(channel)}
          </div>
        ))}
        {Object.keys(preferences.categories).map((categoryKey) => (
          <CategoryPreferences key={categoryKey} category={categoryKey} channels={channels} />
        ))}
      </div>
    </div>
  );
}
