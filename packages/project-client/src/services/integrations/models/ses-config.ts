import { z } from 'zod';

import { sesConfigFrom, sesConfigFromRequest, sesConfigFromResponse } from './ses-config-from';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sesConfig = z.lazy(() => {
  return z.object({
    endpoint: z.string().min(1).optional(),
    from: sesConfigFrom.optional(),
    keyId: z.string().min(1),
    region: z.string().min(1),
    secretKey: z.string().min(1),
  });
});

/**
 *
 * @typedef  {SesConfig} sesConfig
 * @property {string} - HTTP endpoint to send requests to (testing only)
 * @property {SesConfigFrom}
 * @property {string} - AWS Access Key ID
 * @property {string} - AWS Region
 * @property {string} - AWS Secret Key
 */
export type SesConfig = z.infer<typeof sesConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sesConfigResponse = z.lazy(() => {
  return z
    .object({
      endpoint: z.string().min(1).optional(),
      from: sesConfigFromResponse.optional(),
      key_id: z.string().min(1),
      region: z.string().min(1),
      secret_key: z.string().min(1),
    })
    .transform((data) => ({
      endpoint: data['endpoint'],
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
export const sesConfigRequest = z.lazy(() => {
  return z
    .object({
      endpoint: z.string().nullish(),
      from: sesConfigFromRequest.nullish(),
      keyId: z.string().nullish(),
      region: z.string().nullish(),
      secretKey: z.string().nullish(),
    })
    .transform((data) => ({
      endpoint: data['endpoint'],
      from: data['from'],
      key_id: data['keyId'],
      region: data['region'],
      secret_key: data['secretKey'],
    }));
});
