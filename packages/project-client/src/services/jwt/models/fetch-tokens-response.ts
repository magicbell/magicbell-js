import { z } from 'zod';

import { tokens, tokensRequest, tokensResponse } from './tokens.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const fetchTokensResponse = z.lazy(() => {
  return z.object({
    tokens: z.array(tokens),
  });
});

/**
 *
 * @typedef  {FetchTokensResponse} fetchTokensResponse
 * @property {Tokens[]}
 */
export type FetchTokensResponse = z.infer<typeof fetchTokensResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const fetchTokensResponseResponse = z.lazy(() => {
  return z
    .object({
      tokens: z.array(tokensResponse),
    })
    .transform((data) => ({
      tokens: data['tokens'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const fetchTokensResponseRequest = z.lazy(() => {
  return z.object({ tokens: z.array(tokensRequest).nullish() }).transform((data) => ({
    tokens: data['tokens'],
  }));
});
