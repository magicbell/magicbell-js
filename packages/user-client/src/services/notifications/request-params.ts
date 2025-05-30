export interface ListNotificationsParams {
  limit?: number;
  startingAfter?: string;
  endingBefore?: string;
  status?: string;
  category?: string;
  topic?: string;
}

export interface ArchiveNotificationsParams {
  category?: string;
  topic?: string;
}

export interface MarkNotificationsReadParams {
  category?: string;
  topic?: string;
}
