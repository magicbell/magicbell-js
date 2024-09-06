import { config, notificationPreferences, wsAuth } from './fake';
import { ablyAuth, ablyRequestToken } from './fake/ably';
import { mockHandler } from './mock-server';

export const mockHandlers = [
  mockHandler('get', '/config', config),
  mockHandler('post', '/ws/auth', wsAuth),
  mockHandler('get', '/notification_preferences', notificationPreferences),
  mockHandler('put', '/notification_preferences', async (req) => {
    const payload = await req.json();
    const category = payload.categories[0];
    return {
      categories: notificationPreferences.categories.map((cat) => {
        if (cat.slug !== category.slug) return cat;
        return {
          ...cat,
          channels: cat.channels.map((channel) => {
            if (channel.slug !== category.channels[0].slug) return channel;
            return category.channels[0];
          }),
        };
      }),
    };
  }),
  mockHandler('post', 'https://api.magicbell.com/ably/auth', ablyAuth),
  mockHandler('post', 'https://rest.ably.io/keys/:key/requestToken', ablyRequestToken),
];
