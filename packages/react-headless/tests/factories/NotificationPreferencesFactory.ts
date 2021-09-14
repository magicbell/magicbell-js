import faker from 'faker';
import { Factory } from 'rosie';

export default new Factory().attr('categories', () => ({
  newMessage: {
    email: faker.datatype.boolean(),
    inApp: faker.datatype.boolean(),
    webPush: faker.datatype.boolean(),
    mobilePush: faker.datatype.boolean(),
  },
  billing: {
    email: faker.datatype.boolean(),
    inApp: faker.datatype.boolean(),
    webPush: faker.datatype.boolean(),
    mobilePush: faker.datatype.boolean(),
  },
}));

export const sampleNotificationPreferences = {
  categories: {
    newMessage: {
      inApp: true,
      email: false,
      webPush: true,
    },
    marketing: {
      inApp: true,
      email: false,
      webPush: false,
    },
  },
};
