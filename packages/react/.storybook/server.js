import { Server } from 'miragejs';
import NotificationFactory from '../tests/factories/NotificationFactory';

function buildNotifications(page) {
  const isFirstPage = page === 1;

  return {
    total: 100,
    total_pages: 10,
    per_page: 10,
    current_page: page,
    notifications: NotificationFactory.buildList(10, { seenAt: isFirstPage ? null : new Date() }),
    unseen_count: isFirstPage ? 5 : 0,
    unread_count: 100,
  };
}

const server = new Server({ urlPrefix: 'https://api.magicbell.com' });

// Settings
server.get('/config', {
  ws: {
    region: 'eu',
    channel: 'user_05d52b50-9842-4a5c-acef-a1bb361f9e68-project_83',
    auth_url: 'ws/auth',
  },
  inbox: {
    features: {
      notification_preferences: {
        enabled: true,
      },
    },
  },
  channels: {
    web_push: {
      enabled: true,
      config: {
        subscribe_url: 'https://api.magicbell.com',
      },
    },
  },
});

server.get('/notification_preferences', {
  notification_preferences: {
    categories: {
      comment: { email: false },
      new_message: { email: false },
      _replies: { in_app: true, web_push: true },
    },
  },
});

// Notifications
server.get('/notifications', (req, res) => buildNotifications(parseInt(res.queryParams.page)));
server.post('/notifications/read', {});
server.post('/notifications/seen', {});
server.post('/notifications/*/read', {});
server.delete('/notifications/*', {});

// Realtime
server.post('/ws/*', {
  keyName: '0ugvOA.85mHKQ',
  timestamp: Date.now(),
  nonce: 'f55a1d8c22c304dfb59599e8f9dff3fe',
  mac: 'wymLnXnoufQO8pL5dAlXRDgMyXEwLPhru81HtaVk1NM=',
});

server.post('https://rest.ably.io:443/*', {});
