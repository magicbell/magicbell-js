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
