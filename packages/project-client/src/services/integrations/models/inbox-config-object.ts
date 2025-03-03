import { z } from 'zod';

import { inboxConfig, inboxConfigRequest, inboxConfigResponse } from './inbox-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxConfigObject = z.lazy(() => {
  return z.object({
    config: inboxConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {InboxConfigObject} inboxConfigObject
 * @property {InboxConfig}
 * @property {string}
 * @property {string}
 */
export type InboxConfigObject = z.infer<typeof inboxConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: inboxConfigResponse,
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
export const inboxConfigObjectRequest = z.lazy(() => {
  return z
    .object({ config: inboxConfigRequest.nullish(), id: z.string().nullish(), name: z.string().nullish() })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
