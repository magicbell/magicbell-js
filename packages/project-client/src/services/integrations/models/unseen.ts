import { z } from 'zod';

import { UnseenHover, unseenHover, unseenHoverRequest, unseenHoverResponse } from './unseen-hover.js';
import { UnseenState, unseenState, unseenStateRequest, unseenStateResponse } from './unseen-state.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const unseen = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
    hover: unseenHover.optional(),
    state: unseenState.optional(),
    textColor: z.string(),
  });
});

/**
 *
 * @typedef  {Unseen} unseen
 * @property {string}
 * @property {UnseenHover}
 * @property {UnseenState}
 * @property {string}
 */
export type Unseen = z.infer<typeof unseen>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const unseenResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      hover: unseenHoverResponse.optional(),
      state: unseenStateResponse.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      hover: data['hover'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const unseenRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      hover: unseenHoverRequest.optional(),
      state: unseenStateRequest.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      hover: data['hover'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});
