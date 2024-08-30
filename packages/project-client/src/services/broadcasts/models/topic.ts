import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const topic = z.lazy(() => {
  return z.union([z.string(), z.any()]);
});

/**
 *
 * @typedef  {Topic} topic
 * @property {string}
 * @property {any}
 */
export type Topic = z.infer<typeof topic>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const topicResponse = z.lazy(() => {
  return z.union([z.string(), z.any()]);
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const topicRequest = z.lazy(() => {
  return z.union([z.string(), z.any()]);
});
