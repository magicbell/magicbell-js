// This file is generated. Do not update manually!
export const GetMetricsCategoriesResponseSchema = {
  title: 'GetMetricsCategoriesResponseSchema',
  type: 'object',
  required: ['metrics', 'labels', 'schema'],
  additionalProperties: false,

  properties: {
    metrics: {
      type: 'array',
      nullable: false,

      items: {
        type: 'array',

        items: {
          type: 'integer',
        },
      },
    },

    labels: {
      type: 'array',

      items: {
        type: 'string',
      },
    },

    schema: {
      type: 'object',
      required: ['metric', 'label'],
      additionalProperties: false,

      properties: {
        metric: {
          type: 'array',

          items: {
            type: 'object',
            required: ['entity', 'operation'],
            additionalProperties: false,

            properties: {
              entity: {
                type: 'string',
              },

              operation: {
                type: 'string',
                enum: ['count', 'avg', 'sum', 'min', 'max'],
              },
            },
          },
        },

        label: {
          type: 'object',
          required: ['name', 'type'],
          additionalProperties: false,

          properties: {
            name: {
              type: 'string',
            },

            type: {
              type: 'string',
              enum: ['timestamp', 'string'],
            },
          },
        },
      },
    },
  },
} as const;
