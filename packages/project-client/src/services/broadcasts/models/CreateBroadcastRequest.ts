import { Topic } from './Topic';
import { User } from './User';

export interface CreateBroadcastRequest {
  action_url?: string;
  category?: string;
  content?: string;
  custom_attributes?: CustomAttributes;
  overrides?: Overrides;
  /**
   * @minItems 1
   * @maxItems 1000
   */
  recipients: [Topic | User, ...(Topic | User)[]];
  title: string;
  topic?: string;
}
interface CustomAttributes {
  [k: string]: unknown;
}
interface Overrides {
  channels?: Channels;
  providers?: Providers;
}
interface Channels {
  email?: Email;
  in_app?: InApp;
  mobile_push?: MobilePush;
  slack?: Slack;
  sms?: Sms;
  web_push?: WebPush;
}
interface Email {
  action_url?: string;
  content?: string;
  title?: string;
}
interface InApp {
  action_url?: string;
  content?: string;
  title?: string;
}
interface MobilePush {
  action_url?: string;
  content?: string;
  title?: string;
}
interface Slack {
  action_url?: string;
  content?: string;
  title?: string;
}
interface Sms {
  action_url?: string;
  content?: string;
  title?: string;
}
interface WebPush {
  action_url?: string;
  content?: string;
  title?: string;
}
interface Providers {
  amazon_ses?: AmazonSes;
  android?: Android;
  ios?: Ios;
  mailgun?: Mailgun;
  postmark?: Postmark;
  sendgrid?: Sendgrid;
  slack?: Slack1;
}
interface AmazonSes {
  [k: string]: unknown;
}
interface Android {
  [k: string]: unknown;
}
interface Ios {
  [k: string]: unknown;
}
interface Mailgun {
  [k: string]: unknown;
}
interface Postmark {
  [k: string]: unknown;
}
interface Sendgrid {
  [k: string]: unknown;
}
interface Slack1 {
  [k: string]: unknown;
}
