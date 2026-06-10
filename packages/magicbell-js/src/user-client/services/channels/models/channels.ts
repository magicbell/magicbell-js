import { z } from 'zod';

/**
 * Zod schema for the Channels model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const channels = z.lazy(() => {
  return z.object({
    enabled: z.boolean().optional(),
    name: z.string().optional(),
  });
});

/**
 *
 * @typedef  {Channels} channels
 * @property {boolean}
 * @property {string}
 */
export type Channels = z.infer<typeof channels>;

/**
 * Zod schema for mapping API responses to the Channels application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const channelsResponse = z.lazy(() => {
  return z
    .object({
      enabled: z.boolean().optional(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      enabled: data['enabled'],
      name: data['name'],
    }));
});

/**
 * Zod schema for mapping the Channels application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const channelsRequest = z.lazy(() => {
  return z
    .object({
      enabled: z.boolean().optional(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      enabled: data['enabled'],
      name: data['name'],
    }));
});
