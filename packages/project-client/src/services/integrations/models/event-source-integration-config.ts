import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const eventSourceIntegrationConfig = z.lazy(() => {
  return z.object({
    source: z.string(),
  });
});

/**
 *
 * @typedef  {EventSourceIntegrationConfig} eventSourceIntegrationConfig
 * @property {string}
 */
export type EventSourceIntegrationConfig = z.infer<typeof eventSourceIntegrationConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const eventSourceIntegrationConfigResponse = z.lazy(() => {
  return z
    .object({
      source: z.string(),
    })
    .transform((data) => ({
      source: data['source'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const eventSourceIntegrationConfigRequest = z.lazy(() => {
  return z.object({ source: z.string() }).transform((data) => ({
    source: data['source'],
  }));
});
