import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
