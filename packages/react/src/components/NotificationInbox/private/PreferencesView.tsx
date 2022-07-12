/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement } from 'react';

import Footer from '../../Footer';
import Header from '../../Header';
import Text from '../../Text';
import CloseIcon from '../../UserPreferencesPanel/CloseIcon';
import PreferencesCategories from '../../UserPreferencesPanel/PreferencesCategories';
import Layout from '../Layout';
import { NotificationInboxProps, SetViewHandler } from '../NotificationInbox';

// TODO: Remove null when PreferencesCategories or PreferencesView has been
//  updated to support a preferences page.
type PreferencesViewProps = {
  setView: SetViewHandler;
  layout: NonNullable<NotificationInboxProps['layout']>;
  NotificationPreferences?: () => ReactElement | null;
};

export default function PreferencesView({
  layout,
  setView,
  NotificationPreferences = PreferencesCategories,
}: PreferencesViewProps) {
  return (
    <Layout order={layout}>
      <Header
        key="header"
        title={<Text id="preferences.title" defaultMessage="Preferences" />}
        actions={
          <button onClick={() => setView('inbox')} aria-label="close">
            <CloseIcon />
          </button>
        }
      />

      <div key="content" css={{ flex: 1, overflowY: 'hidden' }}>
        <NotificationPreferences />
      </div>

      <Footer key="footer" />
    </Layout>
  );
}
