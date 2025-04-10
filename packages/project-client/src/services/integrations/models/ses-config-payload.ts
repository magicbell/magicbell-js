import { z } from 'zod';

import {
  SesConfigPayloadFrom,
  sesConfigPayloadFrom,
  sesConfigPayloadFromRequest,
  sesConfigPayloadFromResponse,
} from './ses-config-payload-from.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sesConfigPayload = z.lazy(() => {
  return z.object({
    from: sesConfigPayloadFrom.optional(),
    keyId: z.string().min(1),
    region: z.string().min(1),
    secretKey: z.string().min(1),
  });
});

/**
 *
 * @typedef  {SesConfigPayload} sesConfigPayload
 * @property {SesConfigPayloadFrom}
 * @property {string} - AWS Access Key ID
 * @property {string} - AWS Region
 * @property {string} - AWS Secret Key
 */
export type SesConfigPayload = z.infer<typeof sesConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sesConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      from: sesConfigPayloadFromResponse.optional(),
      key_id: z.string().min(1),
      region: z.string().min(1),
      secret_key: z.string().min(1),
    })
    .transform((data) => ({
      from: data['from'],
      keyId: data['key_id'],
      region: data['region'],
      secretKey: data['secret_key'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const sesConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      from: sesConfigPayloadFromRequest.optional(),
      keyId: z.string().min(1),
      region: z.string().min(1),
      secretKey: z.string().min(1),
    })
    .transform((data) => ({
      from: data['from'],
      key_id: data['keyId'],
      region: data['region'],
      secret_key: data['secretKey'],
    }));
});
