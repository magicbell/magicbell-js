export interface ListNotificationsParams {
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
  status?: string;
  topic?: string;
}
