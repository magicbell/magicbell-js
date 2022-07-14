import { useNotificationPreferences } from '@magicbell/react-headless';
import {
  CategoryChannelPreference,
  ChannelPreference,
} from '@magicbell/react-headless/dist/types/IRemoteNotificationPreferences';
import React from 'react';

import ToggleInput from './ToggleInput';

interface CategoryPreferencesProps {
  category: CategoryChannelPreference;
  onChange?: (data: { category: CategoryChannelPreference }) => void;
}

export default function CategoryPreferences({ category, onChange }: CategoryPreferencesProps) {
  const preferences = useNotificationPreferences();
  const channels = category.channels;

  const updatePreferences = async (channel: ChannelPreference, channelEnabled: boolean) => {
    const preference: CategoryChannelPreference = {
      label: category.label,
      slug: category.slug,
      channels: [
        {
          label: channel.label,
          slug: channel.slug,
          enabled: channelEnabled,
        },
      ],
    };

    await preferences.save({ categories: [preference] });
    onChange?.({ category: preference });
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
