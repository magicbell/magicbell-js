/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useConfig, useNotifications } from '@magicbell/react-headless';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import { pathOr } from 'ramda';
import { ReactElement } from 'react';

import { useTranslate } from '../../../context/TranslationsContext';
import EnablePushNotificationsBanner from '../../EnablePushNotificationsBanner';
import Footer from '../../Footer';
import SettingsIcon from '../../Footer/SettingsIcon';
import Header from '../../Header';
import { ListItemProps } from '../../NotificationList';
import Text from '../../Text';
import ClearInboxMessage from '../ClearInboxMessage';
import Layout from '../Layout';
import { NotificationInboxProps, SetViewHandler } from '../NotificationInbox';
import NotificationInboxContent from '../NotificationInboxContent';

type NotificationsViewProps = {
  storeId?: string;
  notificationPreferencesEnabled?: boolean;
  setView: SetViewHandler;
  layout: NonNullable<NotificationInboxProps['layout']>;
  height?: number;
  onAllRead?: () => void;
  NotificationItem?: (props: ListItemProps) => ReactElement;
  EmptyInboxPlaceholder?: () => ReactElement;
  onNotificationClick?: (notification: INotification) => void;
};

export default function NotificationsView({
  layout,
  storeId,
  onNotificationClick,
  onAllRead,
  notificationPreferencesEnabled,
  NotificationItem,
  EmptyInboxPlaceholder = ClearInboxMessage,
  setView,
}: NotificationsViewProps) {
  const t = useTranslate();
  const config = useConfig();
  const store = useNotifications(storeId);
  if (!store) return null;

  const hasNotifications = !store.isEmpty;
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
          hasNotifications ? (
            <button onClick={handleMarkAllAsRead}>
              <Text id="header.mark-all-read" defaultMessage="Mark All Read" />
            </button>
          ) : null
        }
      />

      <div key="content" css={{ flex: 1, overflowY: 'hidden' }}>
        {!store.lastFetchedAt ? null : hasNotifications ? (
          <NotificationInboxContent
            store={store}
            onNotificationClick={onNotificationClick}
            NotificationItem={NotificationItem}
          />
        ) : (
          <EmptyInboxPlaceholder />
        )}
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
