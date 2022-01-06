export type Recipient =
  | {
      email: string;
    }
  | {
      external_id: string;
    }
  | { matches: string };

/**
 * Interface used for the creation of new notifications
 * to send to the MagicBell API
 */
export interface NewNotification {
  title: string;
  category?: string;
  content?: string;
  action_url?: string;
  recipients: Array<Recipient>;
  custom_attributes?: Record<string, unknown>;
  topic?: string;
}
