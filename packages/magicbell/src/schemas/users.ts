// This file is generated. Do not update manually!
export const CreateUsersResponseSchema = {
  title: 'CreateUsersResponseSchema',
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

      items: {
        type: 'string',
      },

      maxItems: 50,
    },
  },
} as const;

export const CreateUsersPayloadSchema = {
  title: 'CreateUsersPayloadSchema',
  type: 'object',
  additionalProperties: false,

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
  },
} as const;

export const ListUsersResponseSchema = {
  title: 'ListUsersResponseSchema',
  type: 'object',

  properties: {
    per_page: {
      type: 'integer',
    },

    current_page: {
      type: 'integer',
    },

    total_pages: {
      type: 'integer',
    },

    total: {
      type: 'integer',
    },

    users: {
      type: 'array',

      items: {
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

            items: {
              type: 'string',
            },

            maxItems: 50,
          },
        },
      },
    },
  },
} as const;

export const ListUsersPayloadSchema = {
  title: 'ListUsersPayloadSchema',
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

    'lastSeenAt:before': {
      title: 'lastSeenAt:before',
      description: 'Fetch users seen before the specified `last_seen_at` timestamp. Please send it in RFC3339 format',
      type: 'string',
    },

    'lastSeenAt:after': {
      title: 'lastSeenAt:after',
      description: 'Fetch users seen after the specified `last_seen_at` timestamp. Please send it in RFC3339 format',
      type: 'string',
    },

    'lastNotifiedAt:before': {
      title: 'lastNotifiedAt:before',
      description:
        'Fetch users last notified before the specified `last_notified_at` timestamp. Please send it in RFC3339 format',
      type: 'string',
    },

    'lastNotifiedAt:after': {
      title: 'lastNotifiedAt:after',
      description:
        'Fetch users last notified after the specified `last_notified_at` timestamp. Please send it in RFC3339 format',
      type: 'string',
    },

    orderBy: {
      title: 'orderBy',
      description: 'Use it to order the returned list of users. Defaults to `created_at,DESC`',
      type: 'string',

      enum: [
        'created_at,ASC',
        'created_at,DESC',
        'last_seen_at,ASC',
        'last_seen_at,DESC',
        'last_notified_at,ASC',
        'last_notified_at,DESC',
      ],
    },
  },

  additionalProperties: false,
  required: [],
} as const;

export const FetchUsersResponseSchema = {
  title: 'FetchUsersResponseSchema',
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

      items: {
        type: 'string',
      },

      maxItems: 50,
    },
  },
} as const;

export const UpdateUsersResponseSchema = {
  title: 'UpdateUsersResponseSchema',
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

      items: {
        type: 'string',
      },

      maxItems: 50,
    },
  },
} as const;

export const UpdateUsersPayloadSchema = {
  title: 'UpdateUsersPayloadSchema',
  type: 'object',
  additionalProperties: false,

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
  },
} as const;

export const UpdateByEmailUsersResponseSchema = {
  title: 'UpdateByEmailUsersResponseSchema',
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

      items: {
        type: 'string',
      },

      maxItems: 50,
    },
  },
} as const;

export const UpdateByEmailUsersPayloadSchema = {
  title: 'UpdateByEmailUsersPayloadSchema',
  type: 'object',
  additionalProperties: false,

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
  },
} as const;

export const UpdateByExternalIdUsersResponseSchema = {
  title: 'UpdateByExternalIdUsersResponseSchema',
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

      items: {
        type: 'string',
      },

      maxItems: 50,
    },
  },
} as const;

export const UpdateByExternalIdUsersPayloadSchema = {
  title: 'UpdateByExternalIdUsersPayloadSchema',
  type: 'object',
  additionalProperties: false,

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
  },
} as const;
