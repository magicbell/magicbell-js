import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const pingConfigPayload = z.lazy(() => {
  return z.object({
    url: z.string().min(1).max(100),
  });
});

/**
 *
 * @typedef  {PingConfigPayload} pingConfigPayload
 * @property {string} - URL to ping
 */
export type PingConfigPayload = z.infer<typeof pingConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const pingConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      url: z.string().min(1).max(100),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const pingConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      url: z.string().min(1).max(100),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});
