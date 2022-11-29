// This file is generated. Do not update manually!
export const CreateImportsResponseSchema = {
  title: 'CreateImportsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    id: {
      type: 'string',
      description: 'ID of the import. This is used to query the status of the import.',
    },

    status: {
      type: 'string',
      enum: ['processing'],
    },

    summary: {
      type: 'object',
      additionalProperties: false,

      properties: {
        total: {
          type: 'integer',
          description: 'The total number of records processed.',
        },

        failures: {
          type: 'integer',
          description: 'The total number of failed records.',
        },
      },
    },

    errors: {
      type: 'array',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          email: {
            type: 'string',
            description:
              "The identifying email of the user. If the user's external_id is used as identifier, the email key will not be present",
          },

          external_id: {
            type: 'string',
            description:
              "The identifying external_id of the user. If the user's email is used as identifier, the external_id key will not be present",
          },

          message: {
            type: 'string',
            description: 'The error message indicating why importing the user failed',
          },
        },
      },
    },
  },
} as const;

export const CreateImportsPayloadSchema = {
  title: 'CreateImportsPayloadSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    users: {
      type: 'array',

      items: {
        type: 'object',

        properties: {
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

            items: {
              type: 'string',
            },

            maxItems: 50,
          },

          channels: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
  },
} as const;

export const GetImportsResponseSchema = {
  title: 'GetImportsResponseSchema',
  type: 'object',
  additionalProperties: false,

  properties: {
    id: {
      type: 'string',
      description: 'ID of the import. This is used to query the status of the import.',
    },

    status: {
      type: 'string',
      enum: ['processing'],
    },

    summary: {
      type: 'object',
      additionalProperties: false,

      properties: {
        total: {
          type: 'integer',
          description: 'The total number of records processed.',
        },

        failures: {
          type: 'integer',
          description: 'The total number of failed records.',
        },
      },
    },

    errors: {
      type: 'array',

      items: {
        type: 'object',
        additionalProperties: false,

        properties: {
          email: {
            type: 'string',
            description:
              "The identifying email of the user. If the user's external_id is used as identifier, the email key will not be present",
          },

          external_id: {
            type: 'string',
            description:
              "The identifying external_id of the user. If the user's email is used as identifier, the external_id key will not be present",
          },

          message: {
            type: 'string',
            description: 'The error message indicating why importing the user failed',
          },
        },
      },
    },
  },
} as const;
