import { z } from 'zod';

import { slackConfig, slackConfigRequest, slackConfigResponse } from './slack-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackConfigObject = z.lazy(() => {
  return z.object({
    config: slackConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SlackConfigObject} slackConfigObject
 * @property {SlackConfig}
 * @property {string}
 * @property {string}
 */
export type SlackConfigObject = z.infer<typeof slackConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: slackConfigResponse,
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
export const slackConfigObjectRequest = z.lazy(() => {
  return z.object({ config: slackConfigRequest, id: z.string(), name: z.string() }).transform((data) => ({
    config: data['config'],
    id: data['id'],
    name: data['name'],
  }));
});
