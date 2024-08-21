/**
 * The region to use for Twilio, defaults to 'us1'
 */
type Region = 'us1' | 'ie1' | 'au1';

export interface TwilioConfig {
  /**
   * The SID for your Twilio account
   */
  account_sid: string;
  /**
   * The API key for Twilio
   */
  api_key: string;
  /**
   * The API Secret for Twilio
   */
  api_secret: string;
  region?: Region;
  /**
   * The phone number to send from, in E.164 format
   */
  from_: string;
}
