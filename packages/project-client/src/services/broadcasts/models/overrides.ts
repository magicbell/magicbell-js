import { z } from 'zod';

import { channels, channelsRequest, channelsResponse } from './channels';
import { providers, providersRequest, providersResponse } from './providers';

/**
 * The shape of the model inside the application code - what the users use
 */
export const overrides = z.lazy(() => {
  return z.object({
    channels: channels.optional(),
    providers: providers.optional(),
  });
});

/**
 *
 * @typedef  {Overrides} overrides
 * @property {Channels}
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
      channels: channelsResponse.optional(),
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
  return z.object({ channels: channelsRequest.nullish(), providers: providersRequest.nullish() }).transform((data) => ({
    channels: data['channels'],
    providers: data['providers'],
  }));
});
