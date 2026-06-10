import { z } from 'zod';

/**
 * Zod schema for the CategoryDeliveryConfigChannels model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const categoryDeliveryConfigChannels = z.lazy(() => {
  return z.object({
    channel: z.string(),
    delay: z.number().gte(0).optional(),
    if: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {CategoryDeliveryConfigChannels} categoryDeliveryConfigChannels
 * @property {Channel} - Name of the channel used for this step.
 * @property {number} - Delay in seconds to wait after the previous step.
 * @property {string} - Conditional expression evaluated before running the step.
 */
export type CategoryDeliveryConfigChannels = z.infer<typeof categoryDeliveryConfigChannels>;

/**
 * Zod schema for mapping API responses to the CategoryDeliveryConfigChannels application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const categoryDeliveryConfigChannelsResponse = z.lazy(() => {
  return z
    .object({
      channel: z.string(),
      delay: z.number().gte(0).optional(),
      if: z.string().optional().nullable(),
    })
    .transform((data) => ({
      channel: data['channel'],
      delay: data['delay'],
      if: data['if'],
    }));
});

/**
 * Zod schema for mapping the CategoryDeliveryConfigChannels application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const categoryDeliveryConfigChannelsRequest = z.lazy(() => {
  return z
    .object({
      channel: z.string(),
      delay: z.number().gte(0).optional(),
      if: z.string().optional().nullable(),
    })
    .transform((data) => ({
      channel: data['channel'],
      delay: data['delay'],
      if: data['if'],
    }));
});
