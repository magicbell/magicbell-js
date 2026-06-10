import { z } from 'zod';

import {
  OverridesChannels,
  overridesChannels,
  overridesChannelsRequest,
  overridesChannelsResponse,
} from './overrides-channels.js';
import { Providers, providers, providersRequest, providersResponse } from './providers.js';

/**
 * Zod schema for the Overrides model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const overrides = z.lazy(() => {
  return z.object({
    channels: overridesChannels.optional(),
    providers: providers.optional(),
  });
});

/**
 * Channel- or provider-specific values that override the defaults.
 * @typedef  {Overrides} overrides - Channel- or provider-specific values that override the defaults. - Channel- or provider-specific values that override the defaults.
 * @property {OverridesChannels} - Overrides that are scoped to individual delivery channels.
 * @property {Providers} - Overrides that are scoped to specific providers for a channel.
 */
export type Overrides = z.infer<typeof overrides>;

/**
 * Zod schema for mapping API responses to the Overrides application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the Overrides application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
