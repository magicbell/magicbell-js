import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
