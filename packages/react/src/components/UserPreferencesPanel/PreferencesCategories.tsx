/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNotificationPreferences } from '@magicbell/react-headless';
import { ComponentProps, useEffect, useMemo } from 'react';

import CategoryPreferences from './CategoryPreferences.js';

export type PreferencesCategoriesProps = {
  channels?: Array<string>;
  categories?: Array<string>;
  onChange?: ComponentProps<typeof CategoryPreferences>['onChange'];
};

export default function PreferencesCategories({
  channels: selectedChannels,
  categories: selectedCategories,
  onChange,
}: PreferencesCategoriesProps) {
  const preferences = useNotificationPreferences();

  const headerStyle = css`
    opacity: 0.8;
    text-transform: uppercase;
    font-size: 0.7em !important;
  `;

  useEffect(() => {
    if (!preferences.lastFetchedAt) {
      preferences.fetch();
    }
  }, [preferences]);

  const categories = useMemo(() => {
    if (!preferences.categories?.length) {
      return preferences.categories;
    }

    let categories = preferences.categories;

    if (selectedCategories?.length) {
      const categoriesSet = new Set(selectedCategories);
      categories = categories.filter((category) => categoriesSet.has(category.slug));
    }

    if (selectedChannels?.length) {
      const channelsSet = new Set(selectedChannels);
      categories = categories.map((category) => ({
        ...category,
        channels: category.channels.filter((channel) => channelsSet.has(channel.slug)),
      }));
    }

    return categories;
  }, [preferences.categories, selectedChannels, selectedCategories]);

  if (!categories.length) {
    // TODO: Consider providing an "empty" screen or some other way to let the
    // user know they have no categories and could go create some.
    return null;
  }

  const channelHeaders = categories[0].channels;

  return (
    <div
      css={css`
        flex: 1;
        height: 100%;
        overflow-y: auto;
      `}
    >
      <div
        css={css`
          display: grid;
          gap: 1em;
          grid-template-columns: 2fr ${' 1fr'.repeat(channelHeaders.length).trim()};
          padding: 16px 20px !important;
        `}
      >
        <div />

        {channelHeaders.map((header) => (
          <div key={header.slug} css={headerStyle}>
            {header.label}
          </div>
        ))}

        {categories.map((category) => (
          <CategoryPreferences key={category.slug} category={category} onChange={onChange} />
        ))}
      </div>
    </div>
  );
}
