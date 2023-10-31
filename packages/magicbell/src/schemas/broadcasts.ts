// This file is generated. Do not update manually!
export const ListBroadcastsResponseSchema = {
  title: 'ListBroadcastsResponseSchema',
  type: 'object',
  required: ['broadcasts', 'current_page', 'per_page'],

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

    broadcasts: {
      type: 'array',

      items: {
        type: 'object',
        description:
          'A broadcast is a precursor to a notification. When you specify multiple recipients, MagicBell creates a notification for each recipient and delivers it to them based on their preferences.',
        required: ['id', 'title', 'created_at', 'recipients', 'status'],
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
            description:
              'Topic the notification belongs to. This is useful for creating threads or offering topic level unsubscriptions.',
            nullable: true,
            maxLength: 100,
          },

          custom_attributes: {
            type: 'object',
            description:
              'Nested key-value attributes that can be used for rendering in templates in MagicBell or third-party providers. Limited to 256KB - please see Overrides for another way to send channel specific data.',
            nullable: true,
            additionalProperties: true,
          },

          sent_at: {
            type: 'string',
            format: 'date-time',
            description: 'The timestamp when the notification was sent to its recipients.',
            readOnly: true,
            nullable: true,
          },

          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'The timestamp when the notification was created.',
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
                  required: ['topic'],

                  properties: {
                    topic: {
                      type: 'object',
                      description: 'The topic to deliver to.',
                      nullable: false,
                      required: ['subscribers'],
                      additionalProperties: false,

                      properties: {
                        subscribers: {
                          type: 'boolean',
                          description:
                            'Setting this property triggers delivery to topic subscribers, respecting their unsubscriptions.',
                          nullable: false,
                        },
                      },
                    },
                  },
                },
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
                      description: 'The identifying external_id of the recipient.',
                      nullable: false,
                    },
                  },
                },
              ],
            },
          },

          overrides: {
            type: 'object',
            additionalProperties: true,
          },

          status: {
            type: 'object',
            required: ['status', 'summary', 'errors'],
            additionalProperties: true,

            properties: {
              status: {
                type: 'string',
                enum: ['enqueued', 'processing', 'processed'],
                readOnly: true,
                nullable: false,
              },

              summary: {
                type: 'object',
                required: ['total', 'failures'],
                additionalProperties: false,

                properties: {
                  total: {
                    type: 'integer',
                    description: 'The number of recipients that the broadcast was sent to.',
                    readOnly: true,
                    nullable: false,
                  },

                  failures: {
                    type: 'integer',
                    description: 'The number of failures while processing the broadcast.',
                    readOnly: true,
                    nullable: false,
                  },
                },
              },

              errors: {
                type: 'array',

                items: {
                  type: 'object',
                  additionalProperties: true,
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

export const CreateBroadcastsResponseSchema = {
  title: 'CreateBroadcastsResponseSchema',
  description:
    'A broadcast is a precursor to a notification. When you specify multiple recipients, MagicBell creates a notification for each recipient and delivers it to them based on their preferences.',
  type: 'object',
  required: ['id', 'title', 'created_at', 'recipients', 'status'],
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
      description:
        'Topic the notification belongs to. This is useful for creating threads or offering topic level unsubscriptions.',
      nullable: true,
      maxLength: 100,
    },

    custom_attributes: {
      type: 'object',
      description:
        'Nested key-value attributes that can be used for rendering in templates in MagicBell or third-party providers. Limited to 256KB - please see Overrides for another way to send channel specific data.',
      nullable: true,
      additionalProperties: true,
    },

    sent_at: {
      type: 'string',
      format: 'date-time',
      description: 'The timestamp when the notification was sent to its recipients.',
      readOnly: true,
      nullable: true,
    },

    created_at: {
      type: 'string',
      format: 'date-time',
      description: 'The timestamp when the notification was created.',
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
            required: ['topic'],

            properties: {
              topic: {
                type: 'object',
                description: 'The topic to deliver to.',
                nullable: false,
                required: ['subscribers'],
                additionalProperties: false,

                properties: {
                  subscribers: {
                    type: 'boolean',
                    description:
                      'Setting this property triggers delivery to topic subscribers, respecting their unsubscriptions.',
                    nullable: false,
                  },
                },
              },
            },
          },
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
                description: 'The identifying external_id of the recipient.',
                nullable: false,
              },
            },
          },
        ],
      },
    },

    overrides: {
      type: 'object',
      additionalProperties: true,
    },

    status: {
      type: 'object',
      required: ['status', 'summary', 'errors'],
      additionalProperties: true,

      properties: {
        status: {
          type: 'string',
          enum: ['enqueued', 'processing', 'processed'],
          readOnly: true,
          nullable: false,
        },

        summary: {
          type: 'object',
          required: ['total', 'failures'],
          additionalProperties: false,

          properties: {
            total: {
              type: 'integer',
              description: 'The number of recipients that the broadcast was sent to.',
              readOnly: true,
              nullable: false,
            },

            failures: {
              type: 'integer',
              description: 'The number of failures while processing the broadcast.',
              readOnly: true,
              nullable: false,
            },
          },
        },

        errors: {
          type: 'array',

          items: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
  },
} as const;

export const CreateBroadcastsPayloadSchema = {
  title: 'CreateBroadcastsPayloadSchema',
  type: 'object',
  required: ['title', 'recipients'],
  additionalProperties: false,

  properties: {
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

    recipients: {
      description:
        'Users to send the notification to. You can specify up to 1000 users in the request body or use [matches](https://www.magicbell.com/docs/segments#how-to-create-segments-using-the-api) to send a notification to any number of users.',
      nullable: false,
      minItems: 1,
      maxItems: 1000,
      type: 'array',

      items: {
        type: 'object',
        description:
          'A recipient is a user, a segment (specified by matches), or a topic. For guidance on selecting a primary identifier, see https://www.magicbell.com/docs/choosing-an-identifier',
        additionalProperties: true,

        properties: {
          email: {
            type: 'string',
            description: "The user's email",
            nullable: true,
          },

          external_id: {
            type: 'string',
            description: 'The unique identifier from your database for the recipient.',
            nullable: true,
          },

          matches: {
            type: 'string',
            description:
              'An SQL-like expression to match users by their stored attributes. Set it to "*" to send a notification to all users.',
          },

          topic: {
            type: 'object',
            description: 'The topic to send the notification to. It can be a user, a segment or a group.',
          },
        },
      },
    },

    custom_attributes: {
      type: 'object',
      description:
        'Nested key-value attributes that can be used for rendering in templates in MagicBell or third-party providers. Limited to 256KB - please see Overrides for another way to send channel specific data.',
      nullable: true,
      additionalProperties: true,
    },

    category: {
      type: 'string',
      description: 'Category the notification belongs to. This is useful to allow users to set their preferences.',
      nullable: true,
      maxLength: 100,
    },

    topic: {
      type: 'string',
      description:
        'Topic the notification belongs to. This is useful for creating threads or offering topic level unsubscriptions.',
      nullable: true,
      maxLength: 100,
    },

    overrides: {
      type: 'object',
      description: 'Optional overrides to configure notifications per target destination.',
      nullable: true,

      properties: {
        channels: {
          type: 'object',
          description: 'Overrides for specific channels',

          properties: {
            in_app: {
              type: 'object',

              properties: {
                title: {
                  type: 'string',
                  description: 'Overriden title for this channel',
                },

                content: {
                  type: 'string',
                  description: 'Overriden content for this channel',
                },

                action_url: {
                  type: 'string',
                  description: 'Overriden action_url for this channel',
                },
              },
            },

            email: {
              type: 'object',

              properties: {
                title: {
                  type: 'string',
                  description: 'Overriden title for this channel',
                },

                content: {
                  type: 'string',
                  description: 'Overriden content for this channel',
                },

                action_url: {
                  type: 'string',
                  description: 'Overriden action_url for this channel',
                },
              },
            },

            web_push: {
              type: 'object',

              properties: {
                title: {
                  type: 'string',
                  description: 'Overriden title for this channel',
                },

                content: {
                  type: 'string',
                  description: 'Overriden content for this channel',
                },

                action_url: {
                  type: 'string',
                  description: 'Overriden action_url for this channel',
                },
              },
            },

            mobile_push: {
              type: 'object',

              properties: {
                title: {
                  type: 'string',
                  description: 'Overriden title for this channel',
                },

                content: {
                  type: 'string',
                  description: 'Overriden content for this channel',
                },

                action_url: {
                  type: 'string',
                  description: 'Overriden action_url for this channel',
                },
              },
            },
          },
        },

        providers: {
          type: 'object',
          description: 'Overrides for specific providers (Sendgrid, Postmark, APNs, etc)',

          properties: {
            sendgrid: {
              type: 'object',
              description:
                'Set of key-value pairs that you can pass on to Sendgrid. Applied only if it is configured for your project.',
            },

            mailgun: {
              type: 'object',
              description:
                'Set of key-value pairs that you can pass on to Mailgun. Applied only if it is configured for your project.',
            },

            postmark: {
              type: 'object',
              description:
                'Set of key-value pairs that you can pass on to Postmark. Applied only if it is configured for your project.',
            },

            ios: {
              type: 'object',
              description:
                'Set of key-value pairs that you can pass on to APNs. Applied only if it is configured for your project.',
            },

            android: {
              type: 'object',
              description:
                'Set of key-value pairs that you can pass on to FCM. Applied only if it is configured for your project.',
            },
          },
        },
      },
    },
  },
} as const;

export const GetBroadcastsResponseSchema = {
  title: 'GetBroadcastsResponseSchema',
  description:
    'A broadcast is a precursor to a notification. When you specify multiple recipients, MagicBell creates a notification for each recipient and delivers it to them based on their preferences.',
  type: 'object',
  required: ['id', 'title', 'created_at', 'recipients', 'status'],
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
      description:
        'Topic the notification belongs to. This is useful for creating threads or offering topic level unsubscriptions.',
      nullable: true,
      maxLength: 100,
    },

    custom_attributes: {
      type: 'object',
      description:
        'Nested key-value attributes that can be used for rendering in templates in MagicBell or third-party providers. Limited to 256KB - please see Overrides for another way to send channel specific data.',
      nullable: true,
      additionalProperties: true,
    },

    sent_at: {
      type: 'string',
      format: 'date-time',
      description: 'The timestamp when the notification was sent to its recipients.',
      readOnly: true,
      nullable: true,
    },

    created_at: {
      type: 'string',
      format: 'date-time',
      description: 'The timestamp when the notification was created.',
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
            required: ['topic'],

            properties: {
              topic: {
                type: 'object',
                description: 'The topic to deliver to.',
                nullable: false,
                required: ['subscribers'],
                additionalProperties: false,

                properties: {
                  subscribers: {
                    type: 'boolean',
                    description:
                      'Setting this property triggers delivery to topic subscribers, respecting their unsubscriptions.',
                    nullable: false,
                  },
                },
              },
            },
          },
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
                description: 'The identifying external_id of the recipient.',
                nullable: false,
              },
            },
          },
        ],
      },
    },

    overrides: {
      type: 'object',
      additionalProperties: true,
    },

    status: {
      type: 'object',
      required: ['status', 'summary', 'errors'],
      additionalProperties: true,

      properties: {
        status: {
          type: 'string',
          enum: ['enqueued', 'processing', 'processed'],
          readOnly: true,
          nullable: false,
        },

        summary: {
          type: 'object',
          required: ['total', 'failures'],
          additionalProperties: false,

          properties: {
            total: {
              type: 'integer',
              description: 'The number of recipients that the broadcast was sent to.',
              readOnly: true,
              nullable: false,
            },

            failures: {
              type: 'integer',
              description: 'The number of failures while processing the broadcast.',
              readOnly: true,
              nullable: false,
            },
          },
        },

        errors: {
          type: 'array',

          items: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
  },
} as const;
