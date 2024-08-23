import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webhook = z.lazy(() => {
  return z.object({
    url: z.string(),
  });
});

/**
 *
 * @typedef  {Webhook} webhook
 * @property {string}
 */
export type Webhook = z.infer<typeof webhook>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webhookResponse = z.lazy(() => {
  return z
    .object({
      url: z.string(),
    })
    .transform((data) => ({
      url: data['url'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const webhookRequest = z.lazy(() => {
  return z.object({ url: z.string().nullish() }).transform((data) => ({
    url: data['url'],
  }));
});
