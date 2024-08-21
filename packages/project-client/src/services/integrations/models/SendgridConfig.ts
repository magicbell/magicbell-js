export interface SendgridConfig {
  /**
   * The API key for Sendgrid
   */
  api_key: string;
  reply_to?: ReplyTo;
  from_?: From_;
}
interface ReplyTo {
  /**
   * The email address to reply to
   */
  email: string;
  /**
   * The name to reply to
   */
  name?: string;
}
interface From_ {
  /**
   * The email address to send from
   */
  email: string;
  /**
   * The name to send from
   */
  name?: string;
}
