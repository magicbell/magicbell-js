// This file is generated. Do not update manually!
export const ListBroadcastsNotificationsResponseSchema = {
  title: 'ListBroadcastsNotificationsResponseSchema',
  type: 'object',
  required: ['current_page', 'notifications', 'per_page', 'total', 'total_pages'],

  properties: {
    total: {
      type: 'integer',
      description: 'Total number of entities for this query.',
      readOnly: true,
    },

    per_page: {
      type: 'integer',
      description: 'Number of entities per page.',
      readOnly: true,
    },

    total_pages: {
      type: 'integer',
      description: 'Total number of pages.',
      readOnly: true,
    },

    current_page: {
      type: 'integer',
      description: 'Number of the page returned.',
      readOnly: true,
    },

    notifications: {
      type: 'array',

      items: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
            description: 'The unique id for this notification.',
            readOnly: true,
          },

          category: {
            type: 'string',
            description:
              'Category the notification belongs to. This is useful to allow users to set their preferences.',
            nullable: true,
            maxLength: 100,
          },

          topic: {
            type: 'string',
            description: 'Topic the notification belongs to. This is useful to create threads.',
            nullable: true,
            maxLength: 100,
          },

          sent_at: {
            type: 'number',
            description: 'The timestamp when the notification was sent to its recipients.',
            readOnly: true,
          },

          user: {
            type: 'object',
            additionalProperties: false,

            properties: {
              id: {
                type: 'string',
                description: 'The unique id for this user.',
                readOnly: true,
              },

              external_id: {
                type: 'string',
                description:
                  "A unique string that MagicBell can utilize to identify the user uniquely. We recommend setting this attribute to the ID of the user in your database. Provide the external id if the user's email is unavailable.",
                maxLength: 255,
                nullable: true,
              },

              email: {
                type: 'string',
                description: "The user's email.",
                maxLength: 255,
                nullable: true,
              },

              first_name: {
                type: 'string',
                description: "The user's first name.",
                maxLength: 50,
                nullable: true,
              },

              last_name: {
                type: 'string',
                description: "The user's last name.",
                maxLength: 50,
                nullable: true,
              },

              custom_attributes: {
                type: 'object',
                description:
                  "Any customer attributes that you'd like to associate with the user. You may want to use these attributes later when writing email templates, for example.",
                additionalProperties: true,
              },

              phone_numbers: {
                type: 'array',
                description: 'An array of phone numbers to use for sending SMS notifications.',
                maxItems: 50,

                items: {
                  type: 'string',
                },
              },
            },
          },

          deliveries: {
            type: 'array',

            items: {
              type: 'object',
              required: ['id', 'channel', 'scheduled_at', 'status'],
              additionalProperties: false,

              properties: {
                id: {
                  type: 'string',
                },

                channel: {
                  type: 'string',
                },

                scheduled_at: {
                  type: 'string',
                  format: 'date-time',
                },

                status: {
                  type: 'integer',
                  description: '0: unseen, 5: unread, 10: read, 20: archived',
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

export const ListBroadcastsNotificationsPayloadSchema = {
  title: 'ListBroadcastsNotificationsPayloadSchema',
  type: 'object',

  properties: {
    page: {
      title: 'page',
      description: 'The page number of the paginated response. Defaults to 1.',
      type: 'integer',
    },

    per_page: {
      title: 'per_page',
      description: 'The number of items per page. Defaults to 20.',
      type: 'integer',
    },
  },

  additionalProperties: false,
  required: [],
} as const;
