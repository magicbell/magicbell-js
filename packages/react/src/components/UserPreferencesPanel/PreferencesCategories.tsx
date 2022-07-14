/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useNotificationPreferences } from '@magicbell/react-headless';
import { useEffect, useMemo } from 'react';

import CategoryPreferences from './CategoryPreferences';

export type PreferencesCategoriesProps = {
  channels?: Array<string>;
};

export default function PreferencesCategories({
  channels: selectedChannels,
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
    if (!selectedChannels?.length || !preferences.categories?.length) return preferences.categories;

    const channelsSet = new Set(selectedChannels);

    return preferences.categories.map((category) => ({
      ...category,
      channels: category.channels.filter((channel) => channelsSet.has(channel.slug)),
    }));
  }, [preferences.categories, selectedChannels]);

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
        padding: 16px 20px !important;
        height: 100%;
        overflow-y: auto;
      `}
    >
      <div
        css={css`
          display: grid;
          gap: 1em;
          grid-template-columns: 2fr ${' 1fr'.repeat(channelHeaders.length).trim()};
        `}
      >
        <div />
        {channelHeaders.map((header) => (
          <div key={header.slug} css={headerStyle}>
            {header.label}
          </div>
        ))}
        {categories.map((category) => {
          return <CategoryPreferences key={category.slug} category={category} />;
        })}
      </div>
    </div>
  );
}
