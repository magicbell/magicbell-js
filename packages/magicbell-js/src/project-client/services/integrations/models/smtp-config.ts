import { z } from 'zod';

import { SmtpConfigFrom, smtpConfigFrom, smtpConfigFromRequest, smtpConfigFromResponse } from './smtp-config-from.js';
import {
  SmtpConfigReplyTo,
  smtpConfigReplyTo,
  smtpConfigReplyToRequest,
  smtpConfigReplyToResponse,
} from './smtp-config-reply-to.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
