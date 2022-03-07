// TODO: Consider creating a test library and/or exposing our existing test
// data: specifically https://github.com/magicbell-io/react-headless/blob/main/tests/factories/NotificationPreferencesFactory.ts
// in this case.

import IRemoteNotificationPreferences from '@magicbell/react-headless/src/types/IRemoteNotificationPreferences';

import deepFreeze from '../lib/deepFreeze';

export const twoChannelPreference: IRemoteNotificationPreferences = deepFreeze({
  categories: [
    {
      label: 'Comments',
      slug: 'comments',
      channels: [
        {
          label: 'Web push',
          slug: 'web_push',
          enabled: true,
        },
        {
          label: 'Email',
          slug: 'email',
          enabled: false,
        },
      ],
    },
  ],
});

export const threeChannelPreference: IRemoteNotificationPreferences = deepFreeze({
  categories: [
    {
      label: 'Comments',
      slug: 'comments',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: true,
        },
        {
          label: 'Web push',
          slug: 'web_push',
          enabled: true,
        },
        {
          label: 'Email',
          slug: 'email',
          enabled: false,
        },
      ],
    },
  ],
});

export const threeChannelAfterUpdatePreference: IRemoteNotificationPreferences = deepFreeze({
  categories: [
    {
      label: 'Comments',
      slug: 'comments',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: true,
        },
        {
          label: 'Web push',
          slug: 'web_push',
          enabled: true,
        },
        {
          label: 'Email',
          slug: 'email',
          enabled: true,
        },
      ],
    },
  ],
});

export const sampleNotificationPreferences: IRemoteNotificationPreferences = deepFreeze({
  categories: [
    {
      label: 'Comments Label',
      slug: 'comments',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: true,
        },
        {
          label: 'Web push',
          slug: 'web_push',
          enabled: true,
        },
        {
          label: 'Email',
          slug: 'email',
          enabled: false,
        },
        {
          label: 'Slack',
          slug: 'slack',
          enabled: true,
        },
        {
          label: 'Mobile push',
          slug: 'mobile_push',
          enabled: true,
        },
        {
          label: 'Sms',
          slug: 'sms',
          enabled: true,
        },
      ],
    },
    {
      label: 'New Reply',
      slug: 'new_reply',
      channels: [
        {
          label: 'In app',
          slug: 'in_app',
          enabled: false,
        },
        {
          label: 'Web push',
          slug: 'web_push',
          enabled: false,
        },
        {
          label: 'Email',
          slug: 'email',
          enabled: true,
        },
        {
          label: 'Slack',
          slug: 'slack',
          enabled: true,
        },
        {
          label: 'Mobile push',
          slug: 'mobile_push',
          enabled: true,
        },
        {
          label: 'Sms',
          slug: 'sms',
          enabled: true,
        },
      ],
    },
  ],
});
