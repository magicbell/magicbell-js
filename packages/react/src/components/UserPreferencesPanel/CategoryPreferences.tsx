import { useNotificationPreferences } from '@magicbell/react-headless';
import IRemoteNotificationPreferences, {
  CategoryChannelPreference,
  ChannelPreference,
} from '@magicbell/react-headless/dist/types/IRemoteNotificationPreferences';
import React from 'react';

import ToggleInput from './ToggleInput';

interface CategoryPreferencesProps {
  category: CategoryChannelPreference;
}

export default function CategoryPreferences({ category }: CategoryPreferencesProps) {
  const preferences = useNotificationPreferences();
  const channels = category.channels;

  const updatePreferences = async (channel: ChannelPreference, channelEnabled: boolean) => {
    const newPreference: IRemoteNotificationPreferences = {
      categories: [
        {
          label: category.label,
          slug: category.slug,
          channels: [
            {
              label: channel.label,
              slug: channel.slug,
              enabled: channelEnabled,
            },
          ],
        },
      ],
    };

    await preferences.save(newPreference);
  };

  return (
    <>
      <div>{category.label}</div>
      {channels.map((channel) => (
        <div key={channel.slug}>
          <ToggleInput
            id={`${category.slug}-${channel.slug}`}
            value={channel.enabled}
            onClick={(value) => updatePreferences(channel, value)}
          />
        </div>
      ))}
    </>
  );
}
