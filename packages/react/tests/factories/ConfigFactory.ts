import faker from 'faker';
import { Factory } from 'rosie';

export default new Factory()
  .attr('channels', () => ({
    webPush: {
      enabled: true,
      config: {
        subscribeUrl: faker.internet.url(),
        vapidAuthentication: {
          publicKey: faker.random.alphaNumeric(),
        },
      },
    },
  }))
  .attr('inbox', () => [])
  .attr('ws', () => ({
    ws: {
      region: 'eu',
      channel: faker.datatype.uuid(),
      authUrl: '/ws/auth',
    },
  }));

export const sampleConfig = {
  channels: {
    webPush: {
      enabled: true,
      config: {
        subscribeUrl: 'https://magicbell-notifications.com/push_subscriptions?userToken=4yYGgmbI',
        vapidAuthentication: {
          publicKey: 'HopHUJ49WhmXJaBjDh',
        },
      },
    },
  },
  inbox: {
    features: [],
  },
  ws: {
    region: 'eu',
    channel: '687ee2d0-b6bc-46b3-bcd1-bdff6b5b4ffc',
    authUrl: '/ws/auth',
  },
};
