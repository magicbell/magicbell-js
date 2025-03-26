import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const templatesInstallation = z.lazy(() => {
  return z.object({
    category: z.string().optional().nullable(),
    channel: z.string(),
    text: z.string(),
  });
});

/**
 *
 * @typedef  {TemplatesInstallation} templatesInstallation
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type TemplatesInstallation = z.infer<typeof templatesInstallation>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const templatesInstallationResponse = z.lazy(() => {
  return z
    .object({
      category: z.string().optional().nullable(),
      channel: z.string(),
      text: z.string(),
    })
    .transform((data) => ({
      category: data['category'],
      channel: data['channel'],
      text: data['text'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const templatesInstallationRequest = z.lazy(() => {
  return z
    .object({ category: z.string().nullable().optional(), channel: z.string(), text: z.string() })
    .transform((data) => ({
      category: data['category'],
      channel: data['channel'],
      text: data['text'],
    }));
});
