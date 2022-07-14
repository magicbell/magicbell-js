import { Response, Server } from 'miragejs';
import { ServerConfig } from 'miragejs/server';

import { sampleConfig } from '../factories/ConfigFactory';
import { sampleNotification } from '../factories/NotificationFactory';
import { sampleNotificationPreferences } from '../factories/NotificationPreferencesFactory';

export function createServer(config?: ServerConfig<any, any>) {
  const server = new Server({
    environment: 'test',
    urlPrefix: 'https://api.magicbell.com',
    timing: 0,
    trackRequests: true,
    ...config,
  });

  server.get('/config', () => sampleConfig);
  server.post('/notifications/seen', () => new Response(204, {}, ''));
  server.get('/notifications', () => ({
    total: 1,
    per_page: 15,
    current_page: 1,
    unseen_count: 0,
    unread_count: 1,
    notifications: [sampleNotification],
  }));

  server.post('/notifications/seen', () => new Response(204, {}, ''));
  server.post('/notifications/read', () => new Response(204, {}, ''));
  server.post(`/notifications/*/read`, () => new Response(204, {}, ''));
  server.post(`/notifications/*/unread`, () => new Response(204, {}, ''));

  server.get('/notification_preferences', () => ({
    notification_preferences: sampleNotificationPreferences,
  }));

  server.put('/notification_preferences', () => ({
    notification_preferences: sampleNotificationPreferences,
  }));

  return server;
}
