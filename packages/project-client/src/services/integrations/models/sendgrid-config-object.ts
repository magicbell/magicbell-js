import { z } from 'zod';

import { sendgridConfig, sendgridConfigRequest, sendgridConfigResponse } from './sendgrid-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sendgridConfigObject = z.lazy(() => {
  return z.object({
    config: sendgridConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SendgridConfigObject} sendgridConfigObject
 * @property {SendgridConfig}
 * @property {string}
 * @property {string}
 */
export type SendgridConfigObject = z.infer<typeof sendgridConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sendgridConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: sendgridConfigResponse,
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
export const sendgridConfigObjectRequest = z.lazy(() => {
  return z.object({ config: sendgridConfigRequest, id: z.string(), name: z.string() }).transform((data) => ({
    config: data['config'],
    id: data['id'],
    name: data['name'],
  }));
});
