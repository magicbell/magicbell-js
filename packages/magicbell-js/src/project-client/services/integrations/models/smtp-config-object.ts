import { z } from 'zod';

import { SmtpConfig, smtpConfig, smtpConfigRequest, smtpConfigResponse } from './smtp-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const smtpConfigObject = z.lazy(() => {
  return z.object({
    config: smtpConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SmtpConfigObject} smtpConfigObject
 * @property {SmtpConfig}
 * @property {string}
 * @property {string}
 */
export type SmtpConfigObject = z.infer<typeof smtpConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const smtpConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: smtpConfigResponse,
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
export const smtpConfigObjectRequest = z.lazy(() => {
  return z
    .object({
      config: smtpConfigRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
