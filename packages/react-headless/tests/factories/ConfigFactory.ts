import faker from '@faker-js/faker';
import { Factory } from 'rosie';

export default new Factory()
  .attr('apiKey', () => faker.random.alphaNumeric())
  .attr('userEmail', () => faker.internet.email())
  .attr('userKey', () => faker.random.alphaNumeric())
  .attrs({
    ws: { region: 'eu', authUrl: '/ws/auth' },
  });

export const sampleConfig = {
  apiKey: 'w3sauUlWoM/yVNTcNJdXi',
  userEmail: 'john@example.com',
  userKey: 'bsZySfyZQcjr7rVWcLe5PeTHJ4zxQLTwHBk7',
  ws: {
    region: 'eu',
    authUrl: '/ws/auth',
  },
};
