import { z } from 'zod';

/**
 * Zod schema for the Team model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const team = z.lazy(() => {
  return z.object({
    id: z.string(),
    name: z.string().optional(),
  });
});

/**
 *
 * @typedef  {Team} team
 * @property {string} - Workspace ID where the app was installed.
 * @property {string} - Workspace name where the app was installed.
 */
export type Team = z.infer<typeof team>;

/**
 * Zod schema for mapping API responses to the Team application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const teamResponse = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      id: data['id'],
      name: data['name'],
    }));
});

/**
 * Zod schema for mapping the Team application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const teamRequest = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      id: data['id'],
      name: data['name'],
    }));
});
