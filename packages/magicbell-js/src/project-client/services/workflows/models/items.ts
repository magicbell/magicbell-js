import { z } from 'zod';

import { ItemsSteps, itemsSteps, itemsStepsRequest, itemsStepsResponse } from './items-steps.js';

/**
 * Zod schema for the Items model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the Items application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the Items application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
