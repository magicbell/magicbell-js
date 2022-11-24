// This file is generated. Do not update manually!
export const ListSubscriptionsResponseSchema = {
  title: 'ListSubscriptionsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    subscriptions: {
      type: 'array',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          topic: {
            type: 'string',
          },

          categories: {
            type: 'array',
            description: 'A list of hashes containing the category slug and the reason for the subscription',

            items: {
              type: 'object',
              additionalProperties: false,

              properties: {
                slug: {
                  type: 'string',
                  description:
                    'The slug of the category to be subscribed to. * can also be be specified if the subscription should match all categories',
                },

                reason: {
                  type: 'string',
                  description: 'The reason for the subscription',
                },

                status: {
                  type: 'string',
                  enum: ['subscribed', 'unsubscribed'],
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

export const CreateSubscriptionsResponseSchema = {
  title: 'CreateSubscriptionsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    categories: {
      type: 'array',
      description: 'A list of hashes containing the category slug and the reason for the subscription',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          slug: {
            type: 'string',
            description:
              'The slug of the category to be subscribed to. * can also be be specified if the subscription should match all categories',
          },

          reason: {
            type: 'string',
            description: 'The reason for the subscription',
          },

          status: {
            type: 'string',
            description: 'The status of the topic subscription',
            enum: ['subscribed', 'unsubscribed'],
          },
        },
      },
    },

    topic: {
      type: 'string',
      description: 'The topic the user should be subscribed to. If the topic does not exist it will be created.',
    },
  },
} as const;

export const CreateSubscriptionsPayloadSchema = {
  title: 'CreateSubscriptionsPayloadSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    categories: {
      type: 'array',
      description: 'A list of hashes containing the category slug and the reason for the subscription',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          slug: {
            type: 'string',
            description:
              'The slug of the category to be subscribed to. * can also be be specified if the subscription should match all categories',
          },

          reason: {
            type: 'string',
            description: 'The reason for the subscription',
          },
        },
      },
    },

    topic: {
      type: 'string',
      description: 'The topic the user should be subscribed to. If the topic does not exist it will be created.',
    },
  },

  required: ['categories', 'topic'],
} as const;

export const UnsubscribeSubscriptionsResponseSchema = {
  title: 'UnsubscribeSubscriptionsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    categories: {
      type: 'array',
      description: 'A list of hashes containing the category slug and the reason for the subscription',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          slug: {
            type: 'string',
            description:
              'The slug of the category to be subscribed to. * can also be be specified if the subscription should match all categories',
          },

          reason: {
            type: 'string',
            description: 'The reason for the subscription',
          },

          status: {
            type: 'string',
            description: 'The status of the topic subscription',
            enum: ['subscribed', 'unsubscribed'],
          },
        },
      },
    },

    topic: {
      type: 'string',
      description: 'The topic the user should be subscribed to. If the topic does not exist it will be created.',
    },
  },
} as const;

export const UnsubscribeSubscriptionsPayloadSchema = {
  title: 'UnsubscribeSubscriptionsPayloadSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    categories: {
      type: 'array',
      description: 'A list of hashes containing the category slug and the reason for the subscription',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          slug: {
            type: 'string',
            description:
              'The slug of the category to be subscribed to. * can also be be specified if the subscription should match all categories',
          },

          reason: {
            type: 'string',
            description: 'The reason for the subscription',
          },
        },
      },
    },
  },

  required: ['categories'],
} as const;

export const GetSubscriptionsResponseSchema = {
  title: 'GetSubscriptionsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    categories: {
      type: 'array',
      description: 'A list of hashes containing the category slug and the reason for the subscription',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          slug: {
            type: 'string',
            description:
              'The slug of the category to be subscribed to. * can also be be specified if the subscription should match all categories',
          },

          reason: {
            type: 'string',
            description: 'The reason for the subscription',
          },

          status: {
            type: 'string',
            description: 'The status of the topic subscription',
            enum: ['subscribed', 'unsubscribed'],
          },
        },
      },
    },

    topic: {
      type: 'string',
      description: 'The topic the user should be subscribed to. If the topic does not exist it will be created.',
    },
  },
} as const;

export const DeleteSubscriptionsPayloadSchema = {
  title: 'DeleteSubscriptionsPayloadSchema',
  type: 'object',

  properties: {
    categories: {
      type: 'array',
      description:
        'A list of hashes containing the category slug and the reason for the subscription. Omiting categories deletes all topic subscriptions beloning to the topic.',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          slug: {
            type: 'string',
            description:
              'The slug of the category to be subscribed to. * can also be be specified if the subscription should match all categories',
          },
        },
      },
    },
  },

  additionalProperties: false,
} as const;
