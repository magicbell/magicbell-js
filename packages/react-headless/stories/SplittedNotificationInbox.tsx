import React from 'react';

import { useNotifications } from '../src';
import { Notification } from './Notification';

export default function SplittedNotificationInbox() {
  const stores = {
    Read: useNotifications('read'),
    Unread: useNotifications('unread'),
  };

  return (
    <main className="divide-y">
      {Object.entries(stores).map(([name, store]) => (
        <div key={name} className="py-4">
          <header className="mb-4 flex">
            <div className="mr-8 font-bold">{name}</div>
            <button onClick={() => store?.markAllAsRead()}>Mark all as read</button>
            <p className="flex-1 text-right">
              {store?.total} notifications / {store?.unreadCount} unread / {store?.unseenCount} unseen
            </p>
          </header>
          <section>
            {store?.notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
          </section>
        </div>
      ))}
    </main>
  );
}
