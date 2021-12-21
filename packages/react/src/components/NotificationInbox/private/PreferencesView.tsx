/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement } from 'react';

import { useTranslate } from '../../../context/TranslationsContext';
import Footer from '../../Footer';
import SettingsIcon from '../../Footer/SettingsIcon';
import Header from '../../Header';
import Text from '../../Text';
import CloseIcon from '../../UserPreferencesPanel/CloseIcon';
import PreferencesCategories from '../../UserPreferencesPanel/PreferencesCategories';
import Layout from '../Layout';
import { NotificationInboxProps, SetViewHandler } from '../NotificationInbox';

type PreferencesViewProps = {
  setView: SetViewHandler;
  layout: NonNullable<NotificationInboxProps['layout']>;
  NotificationPreferences?: () => ReactElement;
};

export default function PreferencesView({
  layout,
  setView,
  NotificationPreferences = PreferencesCategories,
}: PreferencesViewProps) {
  const t = useTranslate();

  return (
    <Layout order={layout}>
      <Header
        key="header"
        title={<Text id="preferences.title" defaultMessage="PREFERENCES" />}
        actions={
          <button onClick={() => setView('inbox')} aria-label="close">
            <CloseIcon />
          </button>
        }
      />

      <div key="content" css={{ flex: 1, overflowY: 'hidden' }}>
        <NotificationPreferences />
      </div>

      <Footer key="footer">
        <button
          onClick={() => setView('inbox')}
          aria-label={t('preferences.toggle', 'Notification preferences')}
        >
          <SettingsIcon />
        </button>
      </Footer>
    </Layout>
  );
}
