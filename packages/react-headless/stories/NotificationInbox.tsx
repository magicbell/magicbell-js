import './NotificationInbox.css';

import React from 'react';

import { useNotification, useNotifications } from '../src';

function NotificationState({ isRead, onClick }) {
  return (
    <a onClick={onClick} className="p-3">
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: isRead ? '#10B981' : '#FCD34D',
          borderRadius: '50%',
        }}
      />
    </a>
  );
}

function Notification({ notification: data }) {
  const notification = useNotification(data);

  const toggleRead = () => {
    if (notification.isRead) notification.markAsUnread();
    else notification.markAsRead();
  };

  return (
    <article className="p-3 bg-gray-100 rounded mb-2 flex">
      <div className="text-center">
        <NotificationState isRead={notification.isRead} onClick={toggleRead} />
      </div>
      <div className="flex-1">
        <p className="mb-1">{notification.title}</p>
        <span style={{ opacity: 0.5 }}>{notification.sentAt?.format('ddd MMM, YYYY')}</span>
      </div>
      <div>
        <button className="delete-button p-2 rounded">Delete</button>
      </div>
    </article>
  );
}

export default function NotificationInbox() {
  const store = useNotifications();

  return (
    <main>
      <header className="mb-4 flex">
        <div className="flex-1">
          <button onClick={() => store.markAllAsRead()}>Mark all as read</button>
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
