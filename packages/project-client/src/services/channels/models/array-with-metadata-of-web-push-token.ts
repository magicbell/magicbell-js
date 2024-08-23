import { z } from 'zod';

import {
  arrayWithMetadataOfWebPushTokenData,
  arrayWithMetadataOfWebPushTokenDataRequest,
  arrayWithMetadataOfWebPushTokenDataResponse,
} from './array-with-metadata-of-web-push-token-data';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayWithMetadataOfWebPushToken = z.lazy(() => {
  return z.object({
    data: z.array(arrayWithMetadataOfWebPushTokenData),
  });
});

/**
 *
 * @typedef  {ArrayWithMetadataOfWebPushToken} arrayWithMetadataOfWebPushToken
 * @property {ArrayWithMetadataOfWebPushTokenData[]}
 */
export type ArrayWithMetadataOfWebPushToken = z.infer<typeof arrayWithMetadataOfWebPushToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfWebPushTokenResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(arrayWithMetadataOfWebPushTokenDataResponse),
    })
    .transform((data) => ({
      data: data['data'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayWithMetadataOfWebPushTokenRequest = z.lazy(() => {
  return z.object({ data: z.array(arrayWithMetadataOfWebPushTokenDataRequest).nullish() }).transform((data) => ({
    data: data['data'],
  }));
});
