import { z } from 'zod';

import { integrations, integrationsRequest, integrationsResponse } from './integrations';

/**
 * The shape of the model inside the application code - what the users use
 */
export const listIntegrationsResponse = z.lazy(() => {
  return z.object({
    integrations: z.array(integrations).optional(),
  });
});

/**
 *
 * @typedef  {ListIntegrationsResponse} listIntegrationsResponse
 * @property {Integrations[]}
 */
export type ListIntegrationsResponse = z.infer<typeof listIntegrationsResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const listIntegrationsResponseResponse = z.lazy(() => {
  return z
    .object({
      integrations: z.array(integrationsResponse).optional(),
    })
    .transform((data) => ({
      integrations: data['integrations'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const listIntegrationsResponseRequest = z.lazy(() => {
  return z.object({ integrations: z.array(integrationsRequest).nullish() }).transform((data) => ({
    integrations: data['integrations'],
  }));
});
