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
    font-size: 0.7rem !important;
  `;

  useEffect(() => {
    if (!preferences.lastFetchedAt) {
      preferences.fetch();
    }
  }, [preferences]);

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
          grid-template-columns: 2fr 1fr 1fr 1fr;
        `}
      >
        <div />
        <div css={headerStyle}>In-app</div>
        <div css={headerStyle}>Email</div>
        <div css={headerStyle}>Web push</div>
        {Object.keys(preferences.categories).map((categoryKey) => (
          <CategoryPreferences key={categoryKey} category={categoryKey} />
        ))}
      </div>
    </div>
  );
}
