import { z } from 'zod';

import {
  projectDeliveryConfigChannels,
  projectDeliveryConfigChannelsRequest,
  projectDeliveryConfigChannelsResponse,
} from './project-delivery-config-channels.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const projectDeliveryConfig = z.lazy(() => {
  return z.object({
    channels: z.array(projectDeliveryConfigChannels),
  });
});

/**
 *
 * @typedef  {ProjectDeliveryConfig} projectDeliveryConfig
 * @property {ProjectDeliveryConfigChannels[]}
 */
export type ProjectDeliveryConfig = z.infer<typeof projectDeliveryConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const projectDeliveryConfigResponse = z.lazy(() => {
  return z
    .object({
      channels: z.array(projectDeliveryConfigChannelsResponse),
    })
    .transform((data) => ({
      channels: data['channels'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const projectDeliveryConfigRequest = z.lazy(() => {
  return z.object({ channels: z.array(projectDeliveryConfigChannelsRequest).nullish() }).transform((data) => ({
    channels: data['channels'],
  }));
});
