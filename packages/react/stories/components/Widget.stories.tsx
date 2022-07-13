import { Meta } from '@storybook/react';
import React from 'react';

import MagicBell, { MagicBellProvider } from '../../src';
import FloatingNotificationInbox from '../../src/components/FloatingNotificationInbox';
import { merge } from '../../src/lib/merge';

const Component = ({ onAllRead, onNotificationClick, apiKey, userEmail, userKey, ...props }) => (
  <MagicBellProvider apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
    <MagicBell {...props}>
      {(props) => (
        <FloatingNotificationInbox
          onAllRead={onAllRead}
          onNotificationClick={onNotificationClick}
          height={500}
          {...props}
        />
      )}
    </MagicBell>
  </MagicBellProvider>
);

const meta: Meta = {
  component: Component,
  argTypes: {
    onAllRead: { action: 'onAllRead' },
    onNotificationClick: { action: 'onNotificationClick' },
  },
};

export default meta;

export const Default = {
  args: {
    locale: 'en',
  },
};

export const WithCustomIcon = merge(Default, {
  args: {
    BellIcon: (
      <svg viewBox="0 0 24 24">
        <path d="M10,21.75a2.087,2.087,0,0,0,4.005,0" />
        <line x1="12" y1="3" x2="12" y2="0.75" />
        <path d="M12,3a7.5,7.5,0,0,1,7.5,7.5c0,7.046,1.5,8.25,1.5,8.25H3s1.5-1.916,1.5-8.25A7.5,7.5,0,0,1,12,3Z" />
      </svg>
    ),
  },
});

export const WithCustomTheme = merge(Default, {
  args: {
    theme: {
      header: { backgroundColor: '#FAD776', textColor: '#161C2D' },
      footer: { backgroundColor: '#FAD776', textColor: '#161C2D' },
      notification: {
        unread: { backgroundColor: '#FAD776', backgroundOpacity: 0.1 },
      },
    },
  },
});

export const WithInboxOpen = merge(Default, {
  args: {
    defaultIsOpen: true,
  },
});

export const WithCustomEmptyImage = merge(Default, {
  args: {
    images: {
      emptyInboxUrl:
        'https://thumbs.dreamstime.com/b/inbox-box-cabinet-document-empty-project-blue-icon-abstract-cloud-background-148443579.jpg',
    },
  },
});

export const WithUnreadCount = merge(Default, {
  args: {
    bellCounter: 'unread',
  },
});

export const WithCustomBadge = merge(Default, {
  args: {
    bellCounter: 'unread',
    Badge: ({ count }) => (
      <div
        style={{
          position: 'absolute',
          background: '#5225c1',
          color: 'white',
          textAlign: 'center',
          fontSize: 12,
          top: -4,
          right: -2,
          width: 16,
          height: 16,
          padding: 2,
          borderRadius: 8,
        }}
      >
        {count}
      </div>
    ),
  },
});
