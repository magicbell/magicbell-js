import { z } from 'zod';

import {
  eventSourceIntegrationConfig,
  eventSourceIntegrationConfigRequest,
  eventSourceIntegrationConfigResponse,
} from './event-source-integration-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const eventSourceIntegrationConfigObject = z.lazy(() => {
  return z.object({
    config: eventSourceIntegrationConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {EventSourceIntegrationConfigObject} eventSourceIntegrationConfigObject
 * @property {EventSourceIntegrationConfig}
 * @property {string}
 * @property {string}
 */
export type EventSourceIntegrationConfigObject = z.infer<typeof eventSourceIntegrationConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const eventSourceIntegrationConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: eventSourceIntegrationConfigResponse,
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
export const eventSourceIntegrationConfigObjectRequest = z.lazy(() => {
  return z
    .object({ config: eventSourceIntegrationConfigRequest, id: z.string(), name: z.string() })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
