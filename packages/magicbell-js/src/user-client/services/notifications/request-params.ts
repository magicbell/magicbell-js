export interface ListNotificationsParams {
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
  status?: string;
  category?: string;
  topic?: string;
}

export interface ArchiveAllNotificationsParams {
  category?: string;
  topic?: string;
}

export interface MarkAllNotificationsReadParams {
  category?: string;
  topic?: string;
}
