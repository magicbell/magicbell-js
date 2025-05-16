import { z } from 'zod';

import { DefaultHover, defaultHover, defaultHoverRequest, defaultHoverResponse } from './default-hover.js';
import { DefaultState, defaultState, defaultStateRequest, defaultStateResponse } from './default-state.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const default_ = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
    borderRadius: z.string(),
    fontFamily: z.string(),
    fontSize: z.string(),
    hover: defaultHover.optional(),
    margin: z.string(),
    state: defaultState.optional(),
    textColor: z.string(),
  });
});

/**
 *
 * @typedef  {Default_} default_
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {DefaultHover}
 * @property {string}
 * @property {DefaultState}
 * @property {string}
 */
export type Default_ = z.infer<typeof default_>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const defaultResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      borderRadius: z.string(),
      fontFamily: z.string(),
      fontSize: z.string(),
      hover: defaultHoverResponse.optional(),
      margin: z.string(),
      state: defaultStateResponse.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      borderRadius: data['borderRadius'],
      fontFamily: data['fontFamily'],
      fontSize: data['fontSize'],
      hover: data['hover'],
      margin: data['margin'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const defaultRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      borderRadius: z.string(),
      fontFamily: z.string(),
      fontSize: z.string(),
      hover: defaultHoverRequest.optional(),
      margin: z.string(),
      state: defaultStateRequest.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      borderRadius: data['borderRadius'],
      fontFamily: data['fontFamily'],
      fontSize: data['fontSize'],
      hover: data['hover'],
      margin: data['margin'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});
