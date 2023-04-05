// This file is generated. Do not update manually!
export const ListUsersPushSubscriptionsResponseSchema = {
  title: 'ListUsersPushSubscriptionsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    total: {
      type: 'integer',
    },

    per_page: {
      type: 'integer',
    },

    total_pages: {
      type: 'integer',
    },

    current_page: {
      type: 'integer',
    },

    push_subscriptions: {
      type: 'array',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          id: {
            type: 'string',
          },

          user_id: {
            type: 'string',
            format: 'uuid',
          },

          device_token: {
            type: 'string',
          },

          platform: {
            type: 'string',
          },

          created_at: {
            type: 'string',
            format: 'date-time',
          },

          discarded_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
        },
      },
    },
  },
} as const;

export const ListUsersPushSubscriptionsPayloadSchema = {
  title: 'ListUsersPushSubscriptionsPayloadSchema',
  type: 'object',

  properties: {
    page: {
      title: 'page',
      description: 'The page number of the paginated response. Defaults to 1.',
      type: 'integer',
    },

    perPage: {
      title: 'perPage',
      description: 'The number of items per page. Defaults to 20.',
      type: 'integer',
    },
  },

  additionalProperties: false,
  required: [],
} as const;
