import { z } from 'zod';

import { ItemsSteps, itemsSteps, itemsStepsRequest, itemsStepsResponse } from './items-steps.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const items = z.lazy(() => {
  return z.object({
    disabled: z.boolean().optional(),
    key: z
      .string()
      .min(3)
      .regex(/^[A-Za-z0-9\_\.\-\:]+$/),
    steps: z.array(itemsSteps),
  });
});

/**
 *
 * @typedef  {Items} items
 * @property {boolean}
 * @property {string}
 * @property {ItemsSteps[]}
 */
export type Items = z.infer<typeof items>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const itemsResponse = z.lazy(() => {
  return z
    .object({
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9\_\.\-\:]+$/),
      steps: z.array(itemsStepsResponse),
    })
    .transform((data) => ({
      disabled: data['disabled'],
      key: data['key'],
      steps: data['steps'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const itemsRequest = z.lazy(() => {
  return z
    .object({
      disabled: z.boolean().optional(),
      key: z
        .string()
        .min(3)
        .regex(/^[A-Za-z0-9\_\.\-\:]+$/),
      steps: z.array(itemsStepsRequest),
    })
    .transform((data) => ({
      disabled: data['disabled'],
      key: data['key'],
      steps: data['steps'],
    }));
});
