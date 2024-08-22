import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxConfig = z.lazy(() => {
  return z.object({
    images: z.any().nullable(),
    locale: z.string().min(2).nullable(),
    theme: z.any().nullable(),
  });
});

/**
 *
 * @typedef  {InboxConfig} inboxConfig
 * @property {any}
 * @property {string}
 * @property {any}
 */
export type InboxConfig = z.infer<typeof inboxConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxConfigResponse = z.lazy(() => {
  return z
    .object({
      images: z.any().nullable(),
      locale: z.string().min(2).nullable(),
      theme: z.any().nullable(),
    })
    .transform((data) => ({
      images: data['images'],
      locale: data['locale'],
      theme: data['theme'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxConfigRequest = z.lazy(() => {
  return z
    .object({ images: z.any().nullish(), locale: z.string().nullish(), theme: z.any().nullish() })
    .transform((data) => ({
      images: data['images'],
      locale: data['locale'],
      theme: data['theme'],
    }));
});
