export interface StripeConfig {
  /**
   * The signing secret to verify incoming requests from Stripe
   */
  webhook_signing_secret: string;
}
