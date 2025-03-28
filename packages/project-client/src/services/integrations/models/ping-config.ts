import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const pingConfig = z.lazy(() => {
  return z.object({
    url: z.string().min(1).max(100),
  });
});

/**
 *
 * @typedef  {PingConfig} pingConfig
 * @property {string} - URL to ping
 */
export type PingConfig = z.infer<typeof pingConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const pingConfigResponse = z.lazy(() => {
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
export const pingConfigRequest = z.lazy(() => {
  return z.object({ url: z.string() }).transform((data) => ({
    url: data['url'],
  }));
});
