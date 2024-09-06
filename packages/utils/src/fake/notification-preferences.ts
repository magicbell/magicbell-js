export const notificationPreferences = {
  categories: [
    {
      label: 'Comments Label',
      slug: 'comments',
      channels: [
        {
          label: 'Email',
          slug: 'email',
          enabled: false,
        },
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
        {
          label: 'Slack',
          slug: 'slack',
          enabled: true,
        },
        {
          label: 'Sms',
          slug: 'sms',
          enabled: true,
        },
        {
          label: 'Web push',
          slug: 'web_push',
          enabled: true,
        },
      ],
    },
    {
      label: 'New Reply',
      slug: 'new_reply',
      channels: [
        {
          label: 'Email',
          slug: 'email',
          enabled: true,
        },
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
        {
          label: 'Slack',
          slug: 'slack',
          enabled: true,
        },
        {
          label: 'Sms',
          slug: 'sms',
          enabled: true,
        },
        {
          label: 'Web push',
          slug: 'web_push',
          enabled: false,
        },
      ],
    },
  ],
} as const;
