import { z } from 'zod';

import { Channels, channels, channelsRequest, channelsResponse } from './channels.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
