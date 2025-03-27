import { ablyAuth, ablyRequestToken } from './fake/ably.js';
import { config, notificationPreferences, wsAuth } from './fake/index.js';
import { mockHandler } from './mock-server.js';

async function updateNotificationPreferences(req) {
  const payload = await req.json();
  const category = payload.notification_preferences.categories[0];

  return {
    notification_preferences: {
      categories: notificationPreferences.categories.map((cat) => {
        if (cat.slug !== category.slug) return cat;
        return {
          ...cat,
          channels: cat.channels.map((channel) => {
            if (channel.slug !== category.channels[0].slug) return channel;
            return {
              ...channel,
              enabled: category.channels[0].enabled,
            };
          }),
        };
      }),
    },
  };
}

export const mockHandlers = [
  mockHandler('get', '/config', config),
  mockHandler('post', '/ws/auth', wsAuth),
  mockHandler('get', '/notification_preferences', { notification_preferences: notificationPreferences }),
  mockHandler('put', '/notification_preferences', updateNotificationPreferences),
  mockHandler('post', 'https://api.magicbell.com/ably/auth', ablyAuth),
  mockHandler('post', 'https://rest.ably.io/keys/:key/requestToken', ablyRequestToken),
];
