import { z } from 'zod';

import {
  CategoryDeliveryConfigChannels,
  categoryDeliveryConfigChannels,
  categoryDeliveryConfigChannelsRequest,
  categoryDeliveryConfigChannelsResponse,
} from './category-delivery-config-channels.js';

/**
 * Zod schema for the CategoryDeliveryConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const categoryDeliveryConfig = z.lazy(() => {
  return z.object({
    channels: z.array(categoryDeliveryConfigChannels),
    disabled: z.boolean().optional(),
    key: z
      .string()
      .min(3)
      .regex(/^[A-Za-z0-9_.\-:\/]+$/),
  });
});

/**
 *
 * @typedef  {CategoryDeliveryConfig} categoryDeliveryConfig
 * @property {CategoryDeliveryConfigChannels[]} - Ordered channel steps the delivery planner should execute.
 * @property {boolean} - Disables the plan so it cannot be executed.
 * @property {string} - Unique identifier for this delivery plan.
 */
export type CategoryDeliveryConfig = z.infer<typeof categoryDeliveryConfig>;

/**
 * Zod schema for mapping API responses to the CategoryDeliveryConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const categoryDeliveryConfigResponse = z.lazy(() => {
  return z
    .object({
      channels: z.array(categoryDeliveryConfigChannelsResponse),
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9_.\-:\/]+$/),
    })
    .transform((data) => ({
      channels: data['channels'],
      disabled: data['disabled'],
      key: data['key'],
    }));
});

/**
 * Zod schema for mapping the CategoryDeliveryConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const categoryDeliveryConfigRequest = z.lazy(() => {
  return z
    .object({
      channels: z.array(categoryDeliveryConfigChannelsRequest),
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9_.\-:\/]+$/),
    })
    .transform((data) => ({
      channels: data['channels'],
      disabled: data['disabled'],
      key: data['key'],
    }));
});
