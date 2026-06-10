import { z } from 'zod';

import {
  SesConfigPayloadFrom,
  sesConfigPayloadFrom,
  sesConfigPayloadFromRequest,
  sesConfigPayloadFromResponse,
} from './ses-config-payload-from.js';

/**
 * Zod schema for the SesConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the SesConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SesConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
