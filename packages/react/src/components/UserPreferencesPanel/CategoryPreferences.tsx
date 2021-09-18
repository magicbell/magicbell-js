import { useNotificationPreferences } from '@magicbell/react-headless';
import React from 'react';
import ToggleInput from './ToggleInput';

interface Props {
  category: string;
}

const humanize = (str) =>
  str
    .replace(/([A-Z])/g, ' $1')
    .replace(/(\W+)/g, ' ')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
    .replace(/(\.|_)/g, ' ');

export default function CategoryPreferences({ category }: Props) {
  const preferences = useNotificationPreferences();
  const categoryTitle = humanize(category);

  const updatePreferences = (data) => {
    preferences.save({ categories: { [category]: data } });
  };

  return (
    <>
      <div>{categoryTitle}</div>
      <div>
        <ToggleInput
          id={`${category}-inapp`}
          value={preferences.categories[category].inApp}
          onClick={(value) => updatePreferences({ inApp: value })}
        />
      </div>
      <div>
        <ToggleInput
          id={`${category}-email`}
          value={preferences.categories[category].email}
          onClick={(value) => updatePreferences({ email: value })}
        />
      </div>
      <div>
        <ToggleInput
          id={`${category}-web-push`}
          value={preferences.categories[category].webPush}
          onClick={(value) => updatePreferences({ webPush: value })}
        />
      </div>
    </>
  );
}
