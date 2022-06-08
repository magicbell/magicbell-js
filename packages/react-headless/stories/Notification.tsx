import cn from 'clsx';
import React from 'react';

import { useNotification } from '../src';

export function Notification({ notification: data }) {
  const notification = useNotification(data);

  const toggleRead = () => {
    if (notification.isRead) notification.markAsUnread();
    else notification.markAsRead();
  };

  return (
    <div className="p-3 bg-gray-100 rounded mb-2 flex text-sm items-center space-x-4">
      <div className="text-center">
        <button
          className={`w-2 h-2 rounded-full bg-${notification.isRead ? 'green' : 'yellow'}-500 focus:outline-none`}
          onClick={toggleRead}
        />
      </div>
      <div className="flex-1">
        <p className="mb-1">{notification.title}</p>
        <span style={{ opacity: 0.5 }}>{notification.sentAt?.format('ddd MMM, YYYY')}</span>
      </div>
      <div className="flex space-x-4 items-center">
        <button
          className={cn('p-2 rounded focus:outline-none', notification.isRead ? 'bg-green-500' : 'bg-green-100')}
          onClick={() => (notification.isRead ? notification.markAsUnread() : notification.markAsRead())}
        >
          {notification.isRead ? 'read' : 'unread'}
        </button>
        <button
          className={cn('p-2 rounded focus:outline-none', notification.isSeen ? 'bg-yellow-500' : 'bg-yellow-100')}
          onClick={() => notification.markAsSeen()}
        >
          {notification.isSeen ? 'seen' : 'unseen'}
        </button>
        <button className="bg-red-100 p-2 rounded focus:outline-none" onClick={() => notification.delete()}>
          Delete
        </button>
      </div>
    </div>
  );
}
