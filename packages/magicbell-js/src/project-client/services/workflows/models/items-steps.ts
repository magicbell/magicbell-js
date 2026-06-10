import { z } from 'zod';

/**
 * Zod schema for the ItemsSteps model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const itemsSteps = z.lazy(() => {
  return z.object({
    command: z.string().regex(/^[a-z_]+$/),
    if: z.string().optional().nullable(),
    input: z.any().optional().nullable(),
  });
});

/**
 *
 * @typedef  {ItemsSteps} itemsSteps
 * @property {string} - Command to execute (e.g., broadcast, pause, wait, abort)
 * @property {string}
 * @property {any}
 */
export type ItemsSteps = z.infer<typeof itemsSteps>;

/**
 * Zod schema for mapping API responses to the ItemsSteps application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const itemsStepsResponse = z.lazy(() => {
  return z
    .object({
      command: z.string().regex(/^[a-z_]+$/),
      if: z.string().optional().nullable(),
      input: z.any().optional().nullable(),
    })
    .transform((data) => ({
      command: data['command'],
      if: data['if'],
      input: data['input'],
    }));
});

/**
 * Zod schema for mapping the ItemsSteps application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const itemsStepsRequest = z.lazy(() => {
  return z
    .object({
      command: z.string().regex(/^[a-z_]+$/),
      if: z.string().optional().nullable(),
      input: z.any().optional().nullable(),
    })
    .transform((data) => ({
      command: data['command'],
      if: data['if'],
      input: data['input'],
    }));
});
