// This file is generated. Do not update manually!
export const GetNotificationPreferencesResponseSchema = {
  title: 'GetNotificationPreferencesResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    categories: {
      type: 'array',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          label: {
            type: 'string',
            description: 'The label of the category',
          },

          slug: {
            type: 'string',
            description: 'The slug of the category.',
          },

          channels: {
            description: 'Preferences for each channel for this category.',
            type: 'array',

            items: {
              type: 'object',
              additionalProperties: false,

              properties: {
                label: {
                  type: 'string',
                  description: 'The label of the channel',
                },

                slug: {
                  type: 'string',
                  description: 'The slug of the channel.',
                },

                enabled: {
                  type: 'boolean',
                  description: 'The current state of the channel.',
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

export const UpdateNotificationPreferencesResponseSchema = {
  title: 'UpdateNotificationPreferencesResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    categories: {
      type: 'array',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          label: {
            type: 'string',
            description: 'The label of the category',
          },

          slug: {
            type: 'string',
            description: 'The slug of the category.',
          },

          channels: {
            description: 'Preferences for each channel for this category.',
            type: 'array',

            items: {
              type: 'object',
              additionalProperties: false,

              properties: {
                label: {
                  type: 'string',
                  description: 'The label of the channel',
                },

                slug: {
                  type: 'string',
                  description: 'The slug of the channel.',
                },

                enabled: {
                  type: 'boolean',
                  description: 'The current state of the channel.',
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

export const UpdateNotificationPreferencesPayloadSchema = {
  title: 'UpdateNotificationPreferencesPayloadSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    categories: {
      type: 'array',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          label: {
            type: 'string',
            description: 'The label of the category',
          },

          slug: {
            type: 'string',
            description: 'The slug of the category.',
          },

          channels: {
            description: 'Preferences for each channel for this category.',
            type: 'array',

            items: {
              type: 'object',
              additionalProperties: false,

              properties: {
                label: {
                  type: 'string',
                  description: 'The label of the channel',
                },

                slug: {
                  type: 'string',
                  description: 'The slug of the channel.',
                },

                enabled: {
                  type: 'boolean',
                  description: 'The current state of the channel.',
                },
              },
            },
          },
        },
      },
    },
  },
} as const;
