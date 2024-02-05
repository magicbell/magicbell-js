import cn from 'clsx';
import React from 'react';

import { useNotifications } from '../src';
import { Notification } from './Notification';

export default function SplittedNotificationInbox() {
  const stores = {
    Default: useNotifications('default'),
    Read: useNotifications('read'),
    Unread: useNotifications('unread'),
    Archived: useNotifications('archived'),
  };

  return (
    <main className="grid grid-cols-4 gap-8 p-4">
      {Object.entries(stores).map(([name, store]) => (
        <div key={name} className="py-4">
          <header className="mb-4">
            <div className="flex justify-between">
              <div
                className={cn('mr-8 font-bold px-2 rounded', {
                  'bg-green-500': name === 'Read',
                  'bg-green-100': name === 'Unread',
                  'bg-blue-500': name === 'Archived',
                })}
              >
                {name}
              </div>
              {store?.total} notifications / {store?.unreadCount} unread / {store?.unseenCount} unseen
            </div>
            <p className="flex-1 text-right">
              <button onClick={() => store?.markAllAsRead()}>Mark all as read</button>
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
