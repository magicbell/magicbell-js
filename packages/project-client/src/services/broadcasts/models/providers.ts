import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const providers = z.lazy(() => {
  return z.object({
    amazonSes: z.any().optional(),
    android: z.any().optional(),
    ios: z.any().optional(),
    mailgun: z.any().optional(),
    postmark: z.any().optional(),
    sendgrid: z.any().optional(),
    slack: z.any().optional(),
  });
});

/**
 *
 * @typedef  {Providers} providers
 * @property {any}
 * @property {any}
 * @property {any}
 * @property {any}
 * @property {any}
 * @property {any}
 * @property {any}
 */
export type Providers = z.infer<typeof providers>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const providersResponse = z.lazy(() => {
  return z
    .object({
      amazon_ses: z.any().optional(),
      android: z.any().optional(),
      ios: z.any().optional(),
      mailgun: z.any().optional(),
      postmark: z.any().optional(),
      sendgrid: z.any().optional(),
      slack: z.any().optional(),
    })
    .transform((data) => ({
      amazonSes: data['amazon_ses'],
      android: data['android'],
      ios: data['ios'],
      mailgun: data['mailgun'],
      postmark: data['postmark'],
      sendgrid: data['sendgrid'],
      slack: data['slack'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const providersRequest = z.lazy(() => {
  return z
    .object({
      amazonSes: z.any().optional(),
      android: z.any().optional(),
      ios: z.any().optional(),
      mailgun: z.any().optional(),
      postmark: z.any().optional(),
      sendgrid: z.any().optional(),
      slack: z.any().optional(),
    })
    .transform((data) => ({
      amazon_ses: data['amazonSes'],
      android: data['android'],
      ios: data['ios'],
      mailgun: data['mailgun'],
      postmark: data['postmark'],
      sendgrid: data['sendgrid'],
      slack: data['slack'],
    }));
});
