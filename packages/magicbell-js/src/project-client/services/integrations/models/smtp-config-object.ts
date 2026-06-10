import { z } from 'zod';

import { SmtpConfig, smtpConfig, smtpConfigRequest, smtpConfigResponse } from './smtp-config.js';

/**
 * Zod schema for the SmtpConfigObject model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the SmtpConfigObject application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SmtpConfigObject application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
