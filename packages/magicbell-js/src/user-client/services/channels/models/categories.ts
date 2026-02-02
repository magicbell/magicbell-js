import { z } from 'zod';

import { Channels, channels, channelsRequest, channelsResponse } from './channels.js';

/**
 * Zod schema for the Categories model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const categories = z.lazy(() => {
  return z.object({
    channels: z.array(channels).optional(),
    key: z
      .string()
      .max(255)
      .regex(/^[A-Za-z0-9_\.\-\/:]+$/)
      .optional(),
    label: z.string().max(255).optional().nullable(),
  });
});

/**
 *
 * @typedef  {Categories} categories
 * @property {Channels[]}
 * @property {string}
 * @property {string}
 */
export type Categories = z.infer<typeof categories>;

/**
 * Zod schema for mapping API responses to the Categories application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const categoriesResponse = z.lazy(() => {
  return z
    .object({
      channels: z.array(channelsResponse).optional(),
      key: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_\.\-\/:]+$/)
        .optional(),
      label: z.string().max(255).optional().nullable(),
    })
    .transform((data) => ({
      channels: data['channels'],
      key: data['key'],
      label: data['label'],
    }));
});

/**
 * Zod schema for mapping the Categories application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const categoriesRequest = z.lazy(() => {
  return z
    .object({
      channels: z.array(channelsRequest).optional(),
      key: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_\.\-\/:]+$/)
        .optional(),
      label: z.string().max(255).optional().nullable(),
    })
    .transform((data) => ({
      channels: data['channels'],
      key: data['key'],
      label: data['label'],
    }));
});
