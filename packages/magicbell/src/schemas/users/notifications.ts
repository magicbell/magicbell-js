// This file is generated. Do not update manually!
export const ListUsersNotificationsResponseSchema = {
  title: 'ListUsersNotificationsResponseSchema',
  type: 'object',
  required: ['current_page', 'notifications', 'per_page'],

  properties: {
    per_page: {
      type: 'integer',
      description: 'Number of entities per page.',
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
        required: ['id', 'created_at', 'updated_at', 'status', 'recipient', 'deliveries'],

        properties: {
          id: {
            type: 'string',
            description: 'The unique id for this notification.',
            readOnly: true,
          },

          title: {
            type: 'string',
            description: 'Title of the notification.',
            nullable: false,
            maxLength: 255,
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

          created_at: {
            type: 'string',
            format: 'date-time',
            nullable: false,
          },

          updated_at: {
            type: 'string',
            format: 'date-time',
            nullable: false,
          },

          sent_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },

          read_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },

          seen_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },

          archived_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },

          discarded_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },

          status: {
            type: 'string',
            enum: ['unseen', 'unread', 'read', 'archived'],
          },

          recipient: {
            type: 'object',
            nullable: false,

            properties: {
              user: {
                type: 'object',
                nullable: false,
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
            },
          },

          deliveries: {
            type: 'array',
            nullable: false,

            items: {
              type: 'object',
              required: ['id', 'title', 'channel', 'scheduled_at', 'status'],
              additionalProperties: false,

              properties: {
                id: {
                  type: 'string',
                  nullable: false,
                },

                title: {
                  type: 'string',
                  nullable: true,
                },

                channel: {
                  type: 'string',
                  nullable: false,
                },

                scheduled_at: {
                  type: 'string',
                  format: 'date-time',
                },

                status: {
                  type: 'string',
                  description: 'The status of the notification delivery.',
                  enum: ['processing', 'skipped', 'dropped', 'scheduled', 'sent', 'failed', 'delivered'],
                  nullable: false,
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

export const ListUsersNotificationsPayloadSchema = {
  title: 'ListUsersNotificationsPayloadSchema',
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
