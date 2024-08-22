import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const integrations = z.lazy(() => {
  return z.object({
    config: z.any().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
  });
});

/**
 *
 * @typedef  {Integrations} integrations
 * @property {any}
 * @property {string}
 * @property {string}
 */
export type Integrations = z.infer<typeof integrations>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const integrationsResponse = z.lazy(() => {
  return z
    .object({
      config: z.any().optional(),
      id: z.string().optional(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const integrationsRequest = z.lazy(() => {
  return z
    .object({ config: z.any().nullish(), id: z.string().nullish(), name: z.string().nullish() })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
