import { IRemoteNotificationPreferences, useNotificationPreferences } from '@magicbell/react-headless';
import React from 'react';

import { useTranslate } from '../../context/TranslationsContext';
import ToggleInput from './ToggleInput';

type CategoryChannelPreference = IRemoteNotificationPreferences['categories'][number];
type ChannelPreference = CategoryChannelPreference['channels'][number];

interface CategoryPreferencesProps {
  category: CategoryChannelPreference;
  onChange?: (data: { category: CategoryChannelPreference }) => void;
}

export default function CategoryPreferences({ category, onChange }: CategoryPreferencesProps) {
  const preferences = useNotificationPreferences();
  const channels = category.channels;
  const t = useTranslate();

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
      <div>{t(`preferences.categories.${category.slug}`, category.label)}</div>
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
