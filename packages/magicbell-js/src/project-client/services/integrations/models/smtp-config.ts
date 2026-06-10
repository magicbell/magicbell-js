import { z } from 'zod';

import { SmtpConfigFrom, smtpConfigFrom, smtpConfigFromRequest, smtpConfigFromResponse } from './smtp-config-from.js';
import {
  SmtpConfigReplyTo,
  smtpConfigReplyTo,
  smtpConfigReplyToRequest,
  smtpConfigReplyToResponse,
} from './smtp-config-reply-to.js';

/**
 * Zod schema for the SmtpConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const smtpConfig = z.lazy(() => {
  return z.object({
    from: smtpConfigFrom,
    host: z.string(),
    password: z.string(),
    port: z.number().gte(1).lte(65535),
    replyTo: smtpConfigReplyTo.optional(),
    security: z.string().optional(),
    username: z.string(),
  });
});

/**
 *
 * @typedef  {SmtpConfig} smtpConfig
 * @property {SmtpConfigFrom} - Default sender email address
 * @property {string} - SMTP server hostname
 * @property {string} - SMTP authentication password
 * @property {number} - SMTP server port
 * @property {SmtpConfigReplyTo} - Reply-to email address
 * @property {Security} - SMTP security/encryption method
 * @property {string} - SMTP authentication username
 */
export type SmtpConfig = z.infer<typeof smtpConfig>;

/**
 * Zod schema for mapping API responses to the SmtpConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const smtpConfigResponse = z.lazy(() => {
  return z
    .object({
      from: smtpConfigFromResponse,
      host: z.string(),
      password: z.string(),
      port: z.number().gte(1).lte(65535),
      reply_to: smtpConfigReplyToResponse.optional(),
      security: z.string().optional(),
      username: z.string(),
    })
    .transform((data) => ({
      from: data['from'],
      host: data['host'],
      password: data['password'],
      port: data['port'],
      replyTo: data['reply_to'],
      security: data['security'],
      username: data['username'],
    }));
});

/**
 * Zod schema for mapping the SmtpConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const smtpConfigRequest = z.lazy(() => {
  return z
    .object({
      from: smtpConfigFromRequest,
      host: z.string(),
      password: z.string(),
      port: z.number().gte(1).lte(65535),
      replyTo: smtpConfigReplyToRequest.optional(),
      security: z.string().optional(),
      username: z.string(),
    })
    .transform((data) => ({
      from: data['from'],
      host: data['host'],
      password: data['password'],
      port: data['port'],
      reply_to: data['replyTo'],
      security: data['security'],
      username: data['username'],
    }));
});
