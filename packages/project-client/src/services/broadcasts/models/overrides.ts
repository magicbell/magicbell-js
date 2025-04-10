import { z } from 'zod';

import {
  OverridesChannels,
  overridesChannels,
  overridesChannelsRequest,
  overridesChannelsResponse,
} from './overrides-channels.js';
import { Providers, providers, providersRequest, providersResponse } from './providers.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const overrides = z.lazy(() => {
  return z.object({
    channels: overridesChannels.optional(),
    providers: providers.optional(),
  });
});

/**
 *
 * @typedef  {Overrides} overrides
 * @property {OverridesChannels}
 * @property {Providers}
 */
export type Overrides = z.infer<typeof overrides>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const overridesResponse = z.lazy(() => {
  return z
    .object({
      channels: overridesChannelsResponse.optional(),
      providers: providersResponse.optional(),
    })
    .transform((data) => ({
      channels: data['channels'],
      providers: data['providers'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const overridesRequest = z.lazy(() => {
  return z
    .object({
      channels: overridesChannelsRequest.optional(),
      providers: providersRequest.optional(),
    })
    .transform((data) => ({
      channels: data['channels'],
      providers: data['providers'],
    }));
});
