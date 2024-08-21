import { Broadcast } from './Broadcast';

export interface BroadcastListResponse {
  /**
   * Number of the page returned.
   */
  current_page: number;
  /**
   * Number of entities per page.
   */
  per_page: number;
  broadcasts: Broadcast[];
}
