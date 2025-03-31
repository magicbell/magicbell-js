import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const integrationConfig = z.lazy(() => {
  return z.object({
    config: z.any(),
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {IntegrationConfig} integrationConfig
 * @property {any}
 * @property {string}
 * @property {string}
 */
export type IntegrationConfig = z.infer<typeof integrationConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const integrationConfigResponse = z.lazy(() => {
  return z
    .object({
      config: z.any(),
      id: z.string(),
      name: z.string(),
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
export const integrationConfigRequest = z.lazy(() => {
  return z
    .object({
      config: z.any(),
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
