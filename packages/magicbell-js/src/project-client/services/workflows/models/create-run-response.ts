import { z } from 'zod';

/**
 * Zod schema for the CreateRunResponse model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const createRunResponse = z.lazy(() => {
  return z.object({
    id: z.string(),
  });
});

/**
 *
 * @typedef  {CreateRunResponse} createRunResponse
 * @property {string} - Identifier of the workflow run that was created.
 */
export type CreateRunResponse = z.infer<typeof createRunResponse>;

/**
 * Zod schema for mapping API responses to the CreateRunResponse application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const createRunResponseResponse = z.lazy(() => {
  return z
    .object({
      id: z.string(),
    })
    .transform((data) => ({
      id: data['id'],
    }));
});

/**
 * Zod schema for mapping the CreateRunResponse application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const createRunResponseRequest = z.lazy(() => {
  return z
    .object({
      id: z.string(),
    })
    .transform((data) => ({
      id: data['id'],
    }));
});
