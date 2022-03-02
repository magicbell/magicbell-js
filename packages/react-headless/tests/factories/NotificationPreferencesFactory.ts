import faker from '@faker-js/faker';
import { Factory } from 'rosie';

import IRemoteNotificationPreferences from '../../src/types/IRemoteNotificationPreferences';
import deepFreeze from '../lib/deepFreeze';

// NOTE: We deepfreeze all test objects to assure the library is immutable

export default new Factory().attr(
  'categories',
  (): IRemoteNotificationPreferences =>
    deepFreeze([
      {
        label: faker.random.word(),
        slug: `${faker.random.word().toLowerCase()}_${faker.random.word().toLowerCase()}`,
        channels: [
          {
            label: 'In app',
            slug: 'in_app',
            enabled: faker.datatype.boolean(),
          },
          {
            label: 'Mobile push',
            slug: 'mobile_push',
            enabled: faker.datatype.boolean(),
          },
          {
            label: 'Web push',
            slug: 'web_push',
            enabled: faker.datatype.boolean(),
          },
          {
            label: 'Email',
            slug: 'email',
            enabled: faker.datatype.boolean(),
          },
          {
            label: 'Slack',
            slug: 'slack',
            enabled: faker.datatype.boolean(),
          },
        ],
      },
      {
        label: faker.random.word(),
        slug: `${faker.random.word().toLowerCase}_${faker.random.word().toLowerCase}`,
        channels: [
          {
            label: 'In app',
            slug: 'in_app',
            enabled: faker.datatype.boolean(),
          },
          {
            label: 'Mobile push',
            slug: 'mobile_push',
            enabled: faker.datatype.boolean(),
          },
          {
            label: 'Web push',
            slug: 'web_push',
            enabled: faker.datatype.boolean(),
          },
          {
            label: 'Email',
            slug: 'email',
            enabled: faker.datatype.boolean(),
          },
          {
            label: 'Slack',
            slug: 'slack',
            enabled: faker.datatype.boolean(),
          },
        ],
      },
    ]),
);

export const sampleNotificationPreferences: IRemoteNotificationPreferences = deepFreeze({
  categories: [
    {
      label: 'New Message',
      slug: 'new_message',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: true,
        },
        {
          label: 'Mobile push',
          slug: 'mobile_push',
          enabled: true,
        },
      ],
    },
    {
      label: 'Marketing',
      slug: 'marketing',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: false,
        },
        {
          label: 'Mobile push',
          slug: 'mobile_push',
          enabled: true,
        },
      ],
    },
  ],
});

export const sampleNotificationPreferencesChanged: IRemoteNotificationPreferences = deepFreeze({
  categories: [
    {
      label: 'New Message',
      slug: 'new_message',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: false, // changed
        },
        {
          label: 'Mobile push',
          slug: 'mobile_push',
          enabled: true,
        },
      ],
    },
    {
      label: 'Marketing',
      slug: 'marketing',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: true, // changed
        },
        {
          label: 'Mobile push',
          slug: 'mobile_push',
          enabled: true,
        },
      ],
    },
  ],
});

export const sampleNotificationSaveResponse: IRemoteNotificationPreferences = deepFreeze({
  categories: [
    {
      label: 'New Message',
      slug: 'new_message',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: false,
        },
        {
          label: 'Mobile push',
          slug: 'mobile_push',
          enabled: false, // mocking that this value was changed on server side
        },
      ],
    },
    {
      label: 'Marketing',
      slug: 'marketing',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: true,
        },
        {
          label: 'Mobile push',
          slug: 'mobile_push',
          enabled: true,
        },
        // New channel
        {
          label: 'Email',
          slug: 'email',
          enabled: true,
        },
      ],
    },
    {
      label: 'New Category',
      slug: 'new_category',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: true,
        },
        {
          label: 'Mobile push',
          slug: 'mobile_push',
          enabled: true,
        },
        // New channel
        {
          label: 'Email',
          slug: 'email',
          enabled: true,
        },
      ],
    },
  ],
});
