// This file is generated. Do not update manually!
export const CreateNotificationsResponseSchema = {
  title: 'CreateNotificationsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    id: {
      type: 'string',
    },
  },
} as const;

export const CreateNotificationsPayloadSchema = {
  title: 'CreateNotificationsPayloadSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    title: {
      type: 'string',
      description: 'Title of the notification.',
      nullable: false,
      maxLength: 255,
    },

    content: {
      type: 'string',
      description:
        'Content of the notification. If you provide HTML content, the notification inbox will render it correctly. It should not exceed 4MB.',
      nullable: true,
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
        'Users to send the notification to. You can specify up to 1000 users at once. Use matches to send a notification to everyone.',
      nullable: false,
      minItems: 1,
      maxItems: 1000,
      type: 'array',

      items: {
        type: 'object',
        additionalProperties: true,

        properties: {
          email: {
            type: 'string',
            description: "The user's email",
          },

          external_id: {
            type: 'string',
            description:
              "A unique string that MagicBell can utilize to uniquely identify the user. We recommend setting this attribute to the ID of the user in your database. Provide the external id if the user's email is unavailable.",
          },

          matches: {
            type: 'string',
            description:
              'An SQL-like expression to match users by their stored attributes. Set it to "*" to send a notification to all users.',
          },
        },
      },
    },

    custom_attributes: {
      type: 'object',
      description:
        'Set of key-value pairs that you can attach to a notification, 6KB at maximum. It accepts objects for the value of a key.\n\nYou can use it to share data between channels or to render a custom UI.',
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
      description: 'Topic the notification belongs to. This is useful to create threads.',
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

  required: ['title', 'recipients'],
} as const;

export const ListNotificationsResponseSchema = {
  title: 'ListNotificationsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    project_id: {
      type: 'integer',
      description: 'ID of the MagicBell project these notifications belong to.',
      readOnly: true,
    },

    total: {
      type: 'integer',
      description: 'Total number of notifications for this user.',
      readOnly: true,
    },

    per_page: {
      type: 'integer',
      description: 'Number of notifications per page.',
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

    unseen_count: {
      type: 'integer',
      description: 'Number of unseen notifications. Any filters applied affect this number.',
      readOnly: true,
    },

    unread_count: {
      type: 'integer',
      description: 'Number of unread notifications. Any filters applied affect this number.',
      readOnly: true,
    },

    notifications: {
      type: 'array',
      description: 'List of all notifications in the current page',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          title: {
            type: 'string',
            description: 'Title of the notification.',
            nullable: false,
            maxLength: 255,
          },

          content: {
            type: 'string',
            description:
              'Content of the notification. If you provide HTML content, the notification inbox will render it correctly. It should not exceed 4MB.',
            nullable: true,
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
              'Users to send the notification to. You can specify up to 1000 users at once. Use matches to send a notification to everyone.',
            nullable: false,
            minItems: 1,
            maxItems: 1000,
            type: 'array',

            items: {
              type: 'object',
              additionalProperties: true,

              properties: {
                email: {
                  type: 'string',
                  description: "The user's email",
                },

                external_id: {
                  type: 'string',
                  description:
                    "A unique string that MagicBell can utilize to uniquely identify the user. We recommend setting this attribute to the ID of the user in your database. Provide the external id if the user's email is unavailable.",
                },

                matches: {
                  type: 'string',
                  description:
                    'An SQL-like expression to match users by their stored attributes. Set it to "*" to send a notification to all users.',
                },
              },
            },
          },

          custom_attributes: {
            type: 'object',
            description:
              'Set of key-value pairs that you can attach to a notification, 6KB at maximum. It accepts objects for the value of a key.\n\nYou can use it to share data between channels or to render a custom UI.',
            nullable: true,
            additionalProperties: true,
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

        required: ['title', 'recipients'],
      },
    },
  },
} as const;

export const ListNotificationsPayloadSchema = {
  title: 'ListNotificationsPayloadSchema',
  type: 'object',

  properties: {
    perPage: {
      title: 'perPage',
      description:
        'A limit on the number of notifications to be returned. It can range between 1 and 100, and the default is 15.',
      type: 'integer',
    },

    page: {
      title: 'page',
      description: 'A parameter for use in pagination. Defaults to 1.',
      type: 'integer',
    },

    read: {
      title: 'read',
      description:
        'A filter on the notifications based on the read state. If false, only unread notifications will be returned. Defaults to null.',
      type: 'boolean',
    },

    seen: {
      title: 'seen',
      description:
        'A filter on the notifications based on the seen state. If false, only unseen notifications will be returned. Defaults to null.',
      type: 'boolean',
    },

    archived: {
      title: 'archived',
      description:
        'A filter on the notifications based on the archived state. If false, only unarchived notifications will be returned. Defaults to null.',
      type: 'boolean',
    },

    categories: {
      title: 'categories',
      description:
        'A filter on the notifications based on the category. If you want to get uncategorized notifications, use the "uncategorized" value.\nThe value can be either an array of strings or a comma-separated string.',
      type: 'array',

      items: {
        type: 'string',
      },
    },

    topics: {
      title: 'topics',
      description: 'A filter on the notifications based on the topic.',
      type: 'array',

      items: {
        type: 'string',
      },
    },
  },

  additionalProperties: false,
  required: [],
} as const;

export const GetNotificationsResponseSchema = {
  title: 'GetNotificationsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    title: {
      type: 'string',
      description: 'Title of the notification.',
      nullable: false,
      maxLength: 255,
    },

    content: {
      type: 'string',
      description:
        'Content of the notification. If you provide HTML content, the notification inbox will render it correctly. It should not exceed 4MB.',
      nullable: true,
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
        'Users to send the notification to. You can specify up to 1000 users at once. Use matches to send a notification to everyone.',
      nullable: false,
      minItems: 1,
      maxItems: 1000,
      type: 'array',

      items: {
        type: 'object',
        additionalProperties: true,

        properties: {
          email: {
            type: 'string',
            description: "The user's email",
          },

          external_id: {
            type: 'string',
            description:
              "A unique string that MagicBell can utilize to uniquely identify the user. We recommend setting this attribute to the ID of the user in your database. Provide the external id if the user's email is unavailable.",
          },

          matches: {
            type: 'string',
            description:
              'An SQL-like expression to match users by their stored attributes. Set it to "*" to send a notification to all users.',
          },
        },
      },
    },

    custom_attributes: {
      type: 'object',
      description:
        'Set of key-value pairs that you can attach to a notification, 6KB at maximum. It accepts objects for the value of a key.\n\nYou can use it to share data between channels or to render a custom UI.',
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
      description: 'Topic the notification belongs to. This is useful to create threads.',
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

  required: ['title', 'recipients'],
} as const;

export const MarkAllReadNotificationsPayloadSchema = {
  title: 'MarkAllReadNotificationsPayloadSchema',
  type: 'object',

  properties: {
    archived: {
      title: 'archived',
      description:
        'A filter on the notifications based on the archived state. Specify false to select unarchived notifications. Defaults to null.',
      type: 'boolean',
    },

    read: {
      title: 'read',
      description:
        'A filter on the notifications based on the read state. Specify false to select unread notifications. Defaults to null.',
      type: 'boolean',
    },

    seen: {
      title: 'seen',
      description:
        'A filter on the notifications based on the seen state. Specify false to select unseen notifications. Defaults to null.',
      type: 'boolean',
    },

    categories: {
      title: 'categories',
      description:
        'A filter on the notifications based on the category. If you want to get uncategorized notifications, use the "uncategorized" value.\nThe value can be either an array of strings or a comma-separated string.',
      type: 'array',

      items: {
        type: 'string',
      },
    },

    topics: {
      title: 'topics',
      description: 'A filter on the notifications based on the topic.',
      type: 'array',

      items: {
        type: 'string',
      },
    },
  },

  additionalProperties: false,
  required: [],
} as const;

export const MarkAllSeenNotificationsPayloadSchema = {
  title: 'MarkAllSeenNotificationsPayloadSchema',
  type: 'object',

  properties: {
    archived: {
      title: 'archived',
      description:
        'A filter on the notifications based on the archived state. Specify false to select unarchived notifications. Defaults to null.',
      type: 'boolean',
    },

    read: {
      title: 'read',
      description:
        'A filter on the notifications based on the read state. Specify false to select unread notifications. Defaults to null.',
      type: 'boolean',
    },

    seen: {
      title: 'seen',
      description:
        'A filter on the notifications based on the seen state. Specify false to select unseen notifications. Defaults to null.',
      type: 'boolean',
    },

    categories: {
      title: 'categories',
      description:
        'A filter on the notifications based on the category. If you want to get uncategorized notifications, use the "uncategorized" value.\nThe value can be either an array of strings or a comma-separated string.',
      type: 'array',

      items: {
        type: 'string',
      },
    },

    topics: {
      title: 'topics',
      description: 'A filter on the notifications based on the topic.',
      type: 'array',

      items: {
        type: 'string',
      },
    },
  },

  additionalProperties: false,
  required: [],
} as const;
