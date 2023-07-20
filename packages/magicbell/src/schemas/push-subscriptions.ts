// This file is generated. Do not update manually!
export const CreatePushSubscriptionsResponseSchema = {
  title: 'CreatePushSubscriptionsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    id: {
      type: 'string',
    },

    device_token: {
      type: 'string',
    },

    platform: {
      type: 'string',
    },

    app_bundle_id: {
      type: 'string',
      nullable: true,
    },
  },
} as const;

export const CreatePushSubscriptionsPayloadSchema = {
  title: 'CreatePushSubscriptionsPayloadSchema',
  type: 'object',
  required: ['device_token', 'platform'],
  additionalProperties: false,

  properties: {
    device_token: {
      type: 'string',
      description:
        'Token that identifies the device. This is usually generated automatically by your app once installed.',
      maxLength: 255,
    },

    platform: {
      type: 'string',
      description:
        "The platform where the device token was generated from. This value is used to determine the delivery mechanism for mobile push notifications. Either 'ios', 'android' or 'safari'.",
      minLength: 3,
    },

    app_bundle_id: {
      type: 'string',
      description:
        'The bundle ID of your app. This value is used to determine the delivery mechanism for mobile push notifications based on your workflow so that you can link several mobile applications to one project.',
      maxLength: 155,
    },
  },
} as const;

export const ListPushSubscriptionsResponseSchema = {
  title: 'ListPushSubscriptionsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    per_page: {
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
