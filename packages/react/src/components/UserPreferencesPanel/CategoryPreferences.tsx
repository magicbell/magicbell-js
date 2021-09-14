import { useNotificationPreferences } from '@magicbell/react-headless';
import { capitalize, kebabCase } from 'lodash';
import React from 'react';
import ToggleInput from './ToggleInput';

interface Props {
  category: string;
}

export default function CategoryPreferences({ category }: Props) {
  const preferences = useNotificationPreferences();
  const categoryId = kebabCase(category);
  const categoryTitle = capitalize(categoryId.replace(/-/g, ' '));

  const updatePreferences = (data) => {
    preferences.save({ categories: { [category]: data } });
  };

  return (
    <>
      <div>{categoryTitle}</div>
      <div>
        <ToggleInput
          id={`${categoryId}-inapp`}
          value={preferences.categories[category].inApp}
          onClick={(value) => updatePreferences({ inApp: value })}
        />
      </div>
      <div>
        <ToggleInput
          id={`${categoryId}-email`}
          value={preferences.categories[category].email}
          onClick={(value) => updatePreferences({ email: value })}
        />
      </div>
      <div>
        <ToggleInput
          id={`${categoryId}-web-push`}
          value={preferences.categories[category].webPush}
          onClick={(value) => updatePreferences({ webPush: value })}
        />
      </div>
    </>
  );
}
