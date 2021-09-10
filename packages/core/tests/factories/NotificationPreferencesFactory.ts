import faker from 'faker';
import { Factory } from 'rosie';

export default new Factory().attr('categories', () => ({
  [faker.commerce.department()]: { email: true, inApp: true, webPush: false },
  [faker.commerce.department()]: { email: false, inApp: true, webPush: true },
}));

export const sampleNotificationPreferences = {
  categories: {
    uncategorized: {
      inApp: true,
      email: false,
    },
    marketing: {
      inApp: true,
      email: false,
    },
  },
};
