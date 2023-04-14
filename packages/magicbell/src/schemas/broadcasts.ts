// This file is generated. Do not update manually!
export const ListBroadcastsResponseSchema = {
  title: 'ListBroadcastsResponseSchema',
  type: 'object',
  required: ['broadcasts', 'current_page', 'per_page', 'total', 'total_pages'],

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

    broadcasts: {
      type: 'array',

      items: {
        type: 'object',
        required: ['id', 'title', 'sent_at'],
        additionalProperties: false,

        properties: {
          id: {
            type: 'string',
            description: 'The unique id for this broadcast.',
            readOnly: true,
          },

          title: {
            type: 'string',
            description: 'Title of the broadcast.',
            nullable: false,
            maxLength: 255,
          },

          content: {
            type: 'string',
            description: 'Content of the broadcast.',
            nullable: true,
            maxLength: 4194304,
          },

          action_url: {
            type: 'string',
            format: 'uri',
            description: 'A URL to redirect the user to when they click the notification in their notification inbox.',
            nullable: true,
            maxLength: 2048,
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

          custom_attributes: {
            type: 'object',
            description:
              'Set of key-value pairs that you can attach to a notification, 6KB at maximum. It accepts objects for the value of a key.\n\nYou can use it to share data between channels or to render a custom UI.',
            nullable: true,
            additionalProperties: true,
          },

          sent_at: {
            type: 'number',
            description: 'The timestamp when the notification was sent to its recipients.',
            readOnly: true,
          },

          recipients: {
            type: 'array',
            nullable: false,
            minItems: 1,
            maxItems: 1000,

            items: {
              anyOf: [
                {
                  type: 'object',
                  additionalProperties: false,
                  required: ['matches'],

                  properties: {
                    matches: {
                      type: 'string',
                      description:
                        'An expression to match users by their stored attributes. Set it to `*` to match all users.',
                      nullable: false,
                    },
                  },
                },
                {
                  type: 'object',
                  additionalProperties: true,
                  required: ['email'],

                  properties: {
                    email: {
                      type: 'string',
                      format: 'email',
                      description: 'The identifying email of the recipient.',
                      nullable: false,
                    },
                  },
                },
                {
                  type: 'object',
                  additionalProperties: true,
                  required: ['external_id'],

                  properties: {
                    external_id: {
                      type: 'string',
                      format: 'email',
                      description: 'The identifying external_id of the recipient.',
                      nullable: false,
                    },
                  },
                },
              ],
            },
          },

          recipients_count: {
            type: 'integer',
            description: 'The number of recipients that the broadcast was sent to.',
            readOnly: true,
            nullable: false,
          },

          overrides: {
            type: 'object',
            additionalProperties: true,
          },

          processing_status: {
            status: 'string',

            summary: {
              type: 'object',
              additionalProperties: false,

              properties: {
                total: {
                  type: 'integer',
                },

                failures: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

export const ListBroadcastsPayloadSchema = {
  title: 'ListBroadcastsPayloadSchema',
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

export const GetBroadcastsResponseSchema = {
  title: 'GetBroadcastsResponseSchema',
  type: 'object',
  required: ['id', 'title', 'sent_at'],
  additionalProperties: false,

  properties: {
    id: {
      type: 'string',
      description: 'The unique id for this broadcast.',
      readOnly: true,
    },

    title: {
      type: 'string',
      description: 'Title of the broadcast.',
      nullable: false,
      maxLength: 255,
    },

    content: {
      type: 'string',
      description: 'Content of the broadcast.',
      nullable: true,
      maxLength: 4194304,
    },

    action_url: {
      type: 'string',
      format: 'uri',
      description: 'A URL to redirect the user to when they click the notification in their notification inbox.',
      nullable: true,
      maxLength: 2048,
    },

    category: {
      type: 'string',
      description: 'Category the notification belongs to. This is useful to allow users to set their preferences.',
      nullable: true,
      maxLength: 100,
    },

    topic: {
      type: 'string',
      description: 'Topic the notification belongs to. This is useful to create threads.',
      nullable: true,
      maxLength: 100,
    },

    custom_attributes: {
      type: 'object',
      description:
        'Set of key-value pairs that you can attach to a notification, 6KB at maximum. It accepts objects for the value of a key.\n\nYou can use it to share data between channels or to render a custom UI.',
      nullable: true,
      additionalProperties: true,
    },

    sent_at: {
      type: 'number',
      description: 'The timestamp when the notification was sent to its recipients.',
      readOnly: true,
    },

    recipients: {
      type: 'array',
      nullable: false,
      minItems: 1,
      maxItems: 1000,

      items: {
        anyOf: [
          {
            type: 'object',
            additionalProperties: false,
            required: ['matches'],

            properties: {
              matches: {
                type: 'string',
                description:
                  'An expression to match users by their stored attributes. Set it to `*` to match all users.',
                nullable: false,
              },
            },
          },
          {
            type: 'object',
            additionalProperties: true,
            required: ['email'],

            properties: {
              email: {
                type: 'string',
                format: 'email',
                description: 'The identifying email of the recipient.',
                nullable: false,
              },
            },
          },
          {
            type: 'object',
            additionalProperties: true,
            required: ['external_id'],

            properties: {
              external_id: {
                type: 'string',
                format: 'email',
                description: 'The identifying external_id of the recipient.',
                nullable: false,
              },
            },
          },
        ],
      },
    },

    recipients_count: {
      type: 'integer',
      description: 'The number of recipients that the broadcast was sent to.',
      readOnly: true,
      nullable: false,
    },

    overrides: {
      type: 'object',
      additionalProperties: true,
    },

    processing_status: {
      status: 'string',

      summary: {
        type: 'object',
        additionalProperties: false,

        properties: {
          total: {
            type: 'integer',
          },

          failures: {
            type: 'integer',
          },
        },
      },
    },
  },
} as const;
