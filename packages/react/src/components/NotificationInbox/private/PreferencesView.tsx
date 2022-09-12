/** @jsxImportSource @emotion/react */
import { ReactElement } from 'react';

import { useTranslate } from '../../../context/TranslationsContext';
import Footer from '../../Footer';
import Header from '../../Header';
import IconButton from '../../IconButton/IconButton';
import Text from '../../Text';
import CloseIcon from '../../UserPreferencesPanel/CloseIcon';
import PreferencesCategories, {
  PreferencesCategoriesProps,
} from '../../UserPreferencesPanel/PreferencesCategories';
import Layout from '../Layout';
import { NotificationInboxProps, SetViewHandler } from '../NotificationInbox';

// TODO: Remove null when PreferencesCategories or PreferencesView has been
//  updated to support a preferences page.
type PreferencesViewProps = {
  setView: SetViewHandler;
  layout: NonNullable<NotificationInboxProps['layout']>;
  NotificationPreferences?: (props: PreferencesCategoriesProps) => ReactElement | null;
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
        title={<Text id="preferences.title" defaultMessage="Preferences" />}
        actions={
          <IconButton
            onClick={() => setView('inbox')}
            aria-label={t('preferences.close', 'Close preferences')}
          >
            <CloseIcon />
          </IconButton>
        }
      />

      <div key="content" css={{ flex: 1, overflowY: 'hidden' }}>
        <NotificationPreferences />
      </div>

      <Footer key="footer" />
    </Layout>
  );
}
