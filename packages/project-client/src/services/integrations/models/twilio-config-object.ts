import { z } from 'zod';

import { twilioConfig, twilioConfigRequest, twilioConfigResponse } from './twilio-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const twilioConfigObject = z.lazy(() => {
  return z.object({
    config: twilioConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {TwilioConfigObject} twilioConfigObject
 * @property {TwilioConfig}
 * @property {string}
 * @property {string}
 */
export type TwilioConfigObject = z.infer<typeof twilioConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const twilioConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: twilioConfigResponse,
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
export const twilioConfigObjectRequest = z.lazy(() => {
  return z.object({ config: twilioConfigRequest, id: z.string(), name: z.string() }).transform((data) => ({
    config: data['config'],
    id: data['id'],
    name: data['name'],
  }));
});
