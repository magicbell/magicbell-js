import { z } from 'zod';

import { Categories, categories, categoriesRequest, categoriesResponse } from './categories.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const userPreferences = z.lazy(() => {
  return z.object({
    categories: z.array(categories).optional(),
  });
});

/**
 *
 * @typedef  {UserPreferences} userPreferences
 * @property {Categories[]}
 */
export type UserPreferences = z.infer<typeof userPreferences>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const userPreferencesResponse = z.lazy(() => {
  return z
    .object({
      categories: z.array(categoriesResponse).optional(),
    })
    .transform((data) => ({
      categories: data['categories'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const userPreferencesRequest = z.lazy(() => {
  return z
    .object({
      categories: z.array(categoriesRequest).optional(),
    })
    .transform((data) => ({
      categories: data['categories'],
    }));
});
