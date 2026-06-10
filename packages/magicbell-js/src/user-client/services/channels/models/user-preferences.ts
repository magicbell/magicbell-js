import { z } from 'zod';

import { Categories, categories, categoriesRequest, categoriesResponse } from './categories.js';

/**
 * Zod schema for the UserPreferences model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the UserPreferences application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the UserPreferences application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
