import React from 'react';

import { useNotifications } from '../src';
import { Notification } from './Notification';

export default function NotificationInbox() {
  const store = useNotifications();

  return (
    <main>
      <header className="mb-4 flex">
        <div className="flex-1">
          <button onClick={() => store?.markAllAsRead()}>Mark all as read</button>
        </div>
        <p>
          {store?.total} notifications / {store?.unreadCount} unread
        </p>
      </header>
      <section>
        {store?.notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </section>
    </main>
  );
}
