/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useNotificationPreferences } from '@magicbell/react-headless';
import { useEffect } from 'react';

import CategoryPreferences from './CategoryPreferences';

export default function PreferencesCategories() {
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

  if (!preferences.categories.length) {
    // TODO: Consider providing an "empty" screen or some other way to let the
    // user know they have no categories and could go create some.
    return null;
  }

  const channelHeaders = preferences.categories[0].channels;

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
        {preferences.categories.map((category) => {
          return <CategoryPreferences key={category.slug} category={category} />;
        })}
      </div>
    </div>
  );
}
