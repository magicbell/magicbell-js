import { useNotificationPreferences } from '@magicbell/react-headless';
import React from 'react';

import ToggleInput from './ToggleInput';

export type ChannelType = 'inApp' | 'email' | 'webPush' | 'mobilePush';

interface Props {
  category: string;
  channels: Array<ChannelType>;
}

const humanize = (str) =>
  str
    .replace(/([A-Z])/g, ' $1')
    .replace(/(\W+)/g, ' ')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
    .replace(/([._])/g, ' ');

function channelToClass(channel: ChannelType): string {
  return (
    {
      inApp: 'inapp',
      email: 'email',
      webPush: 'web-push',
      mobilePush: 'mobile-push',
    }[channel] || 'inapp'
  );
}

export default function CategoryPreferences({ category, channels }: Props) {
  const preferences = useNotificationPreferences();
  const categoryTitle = humanize(category);

  const updatePreferences = (data) => {
    preferences.save({ categories: { [category]: data } });
  };

  return (
    <>
      <div>{categoryTitle}</div>
      {channels.map((channel) => (
        <div key={channel}>
          <ToggleInput
            id={`${category}-${channelToClass(channel)}`}
            value={preferences.categories[category][channel]}
            onClick={(value) => updatePreferences({ [channel]: value })}
          />
        </div>
      ))}
    </>
  );
}
