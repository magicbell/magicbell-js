/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ListItemProps } from '../../NotificationList';
import { ReactElement } from 'react';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import { useTranslate } from '../../../context/TranslationsContext';
import { useConfig, useNotifications } from '@magicbell/react-headless';
import Layout from '../Layout';
import Header from '../../Header';
import Text from '../../Text';
import NotificationInboxContent from '../NotificationInboxContent';
import EnablePushNotificationsBanner from '../../EnablePushNotificationsBanner';
import Footer from '../../Footer';
import SettingsIcon from '../../Footer/SettingsIcon';
import { NotificationInboxProps, SetViewHandler } from '../NotificationInbox';
import pathOr from 'ramda/src/pathOr';

type NotificationsViewProps = {
  storeId?: string;
  notificationPreferencesEnabled?: boolean;
  setView: SetViewHandler;
  layout: NonNullable<NotificationInboxProps['layout']>;
  height?: number;
  onAllRead?: () => void;
  NotificationItem?: (props: ListItemProps) => ReactElement;
  onNotificationClick?: (notification: INotification) => void;
};

export default function NotificationsView({
  layout,
  storeId,
  onNotificationClick,
  onAllRead,
  notificationPreferencesEnabled,
  NotificationItem,
  setView,
}: NotificationsViewProps) {
  const t = useTranslate();
  const config = useConfig();
  const store = useNotifications(storeId);
  if (!store) return null;

  const showPreferencesButton =
    notificationPreferencesEnabled ??
    pathOr(true, ['features', 'notificationPreferences', 'enabled'], config.inbox);

  const handleMarkAllAsRead = () => {
    store?.markAllAsRead();
    onAllRead?.();
  };

  return (
    <Layout order={layout}>
      <Header
        key="header"
        title={<Text id="header.title" defaultMessage="NOTIFICATIONS" />}
        actions={
          <button onClick={handleMarkAllAsRead}>
            <Text id="header.mark-all-read" defaultMessage="Mark All Read" />
          </button>
        }
      />

      <div key="content" css={{ flex: 1, overflowY: 'hidden' }}>
        <NotificationInboxContent
          store={store}
          onNotificationClick={onNotificationClick}
          NotificationItem={NotificationItem}
        />
      </div>

      <EnablePushNotificationsBanner key="push-notifications-banner" />

      <Footer key="footer">
        {showPreferencesButton ? (
          <button
            onClick={() => setView('preferences')}
            aria-label={t('preferences.toggle', 'Notification preferences')}
          >
            <SettingsIcon />
          </button>
        ) : null}
      </Footer>
    </Layout>
  );
}
