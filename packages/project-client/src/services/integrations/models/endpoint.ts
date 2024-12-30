import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const endpoint = z.lazy(() => {
  return z.union([z.any(), z.any()]);
});

/**
 * HTTP endpoint to send requests to (testing only)
 * @typedef  {Endpoint} endpoint - HTTP endpoint to send requests to (testing only) - HTTP endpoint to send requests to (testing only)
 * @property {any}
 * @property {any}
 */
export type Endpoint = z.infer<typeof endpoint>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const endpointResponse = z.lazy(() => {
  return z.union([z.any(), z.any()]);
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const endpointRequest = z.lazy(() => {
  return z.union([z.any(), z.any()]);
});
