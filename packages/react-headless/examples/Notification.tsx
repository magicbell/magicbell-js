import React from 'react';

import { useNotification } from '../src';
import IRemoteNotification from '../src/types/IRemoteNotification';

export function Notification({ notification: data }: { notification: IRemoteNotification }) {
  const notification = useNotification(data, () => void null);

  const toggleRead = () => {
    if (notification.isRead) notification.markAsUnread();
    else notification.markAsRead();
  };

  return (
    <div className="bg-gray-100 p-2 bg-gray-100 rounded mb-2">
      <div className="mb-2 flex text-sm items-center space-x-4">
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
      </div>
      <div className="flex space-x-2 items-center">
        <button
          className={`text-sm p-1 rounded w-24 focus:outline-none ${
            notification.isRead ? 'bg-green-500' : 'bg-green-100'
          }`}
          onClick={() => (notification.isRead ? notification.markAsUnread() : notification.markAsRead())}
        >
          {notification.isRead ? 'read' : 'unread'}
        </button>
        <button
          className={`text-sm p-1 rounded w-24 focus:outline-none ${
            notification.isArchived ? 'bg-blue-500' : 'bg-blue-100'
          }`}
          onClick={() => (notification.isArchived ? notification.unarchive() : notification.archive())}
        >
          {notification.isArchived ? 'archived' : 'unarchived'}
        </button>
        <button
          className={`text-sm p-1 rounded w-24 focus:outline-none ${
            notification.isSeen ? 'bg-yellow-500' : 'bg-yellow-100'
          }`}
          onClick={() => notification.markAsSeen()}
        >
          {notification.isSeen ? 'seen' : 'unseen'}
        </button>
        <button
          className="bg-red-100 text-sm p-1 rounded w-24 focus:outline-none"
          onClick={() => notification.delete()}
        >
          delete
        </button>
      </div>
    </div>
  );
}
