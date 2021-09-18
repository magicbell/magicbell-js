import { useNotifications } from '@magicbell/react-headless';
import INotification from '@magicbell/react-headless/dist/types/INotification';
import React from 'react';
import EnablePushNotificationsBanner from '../EnablePushNotificationsBanner';
import Footer from '../Footer';
import Header from '../Header';
import { NotificationListItem } from '../NotificationList/NotificationList';
import Layout from './Layout';
import NotificationInboxContent from './NotificationInboxContent';
import StyledContainer from './StyledContainer';

export interface NotificationInboxProps {
  height?: number;
  onAllRead?: () => void;
  onNotificationClick?: (notification: INotification) => void;
  storeId?: string;
  NotificationItem?: NotificationListItem;
  layout?: string[];
}

/**
 * Component that renders all notifications as well as a header and a footer.
 *
 * @example
 * <NotificationInbox
 *   storeId="unread"
 *   onNotificationClick={openTicket}
 *   onAllRead={showAlert} />
 */
export default function NotificationInbox({
  height,
  layout = ['header', 'content', 'push-notifications-banner', 'footer'],
  onAllRead,
  onNotificationClick,
  NotificationItem,
  storeId = 'default',
}: NotificationInboxProps) {
  const store = useNotifications(storeId);

  const markAsRead = () => {
    store?.markAllAsRead();
    if (onAllRead) onAllRead();
  };

  if (!store) return null;

  return (
    <StyledContainer height={height} layout={layout}>
      <Layout order={layout}>
        <Header key="header" onAllRead={markAsRead} />
        <NotificationInboxContent
          key="content"
          store={store}
          onNotificationClick={onNotificationClick}
          height={height}
          NotificationItem={NotificationItem}
        />
        <EnablePushNotificationsBanner key="push-notifications-banner" />
        <Footer key="footer" />
      </Layout>
    </StyledContainer>
  );
}
