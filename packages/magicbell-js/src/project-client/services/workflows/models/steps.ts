import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const steps = z.lazy(() => {
  return z.object({
    command: z.string().regex(/^[A-Za-z0-9\_\:]+$/),
    if: z.string().optional().nullable(),
    input: z.any().optional().nullable(),
  });
});

/**
 *
 * @typedef  {Steps} steps
 * @property {string}
 * @property {string}
 * @property {any}
 */
export type Steps = z.infer<typeof steps>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const stepsResponse = z.lazy(() => {
  return z
    .object({
      command: z.string().regex(/^[A-Za-z0-9\_\:]+$/),
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
export const stepsRequest = z.lazy(() => {
  return z
    .object({
      command: z.string().regex(/^[A-Za-z0-9\_\:]+$/),
      if: z.string().optional().nullable(),
      input: z.any().optional().nullable(),
    })
    .transform((data) => ({
      command: data['command'],
      if: data['if'],
      input: data['input'],
    }));
});
