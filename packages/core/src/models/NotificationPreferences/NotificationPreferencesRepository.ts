import { fetchAPI, putAPI } from '../../lib/ajax';
import IRemoteNotificationPreferences from './IRemoteNotificationPreferences';

/**
 * Class to interact with the user preferences API endpoints.
 *
 * @example
 * const repo = new NotificationPreferencesRepository();
 * await repo.update({ categories: { comment: commentPreferences } });
 */
export default class NotificationPreferencesRepository {
  remotePathOrUrl: string;

  constructor(remotePathOrUrl = '/notification_preferences') {
    this.remotePathOrUrl = remotePathOrUrl;
  }

  /**
   * Get the user preferences from the API server.
   */
  get(): Promise<IRemoteNotificationPreferences> {
    return fetchAPI(this.remotePathOrUrl);
  }

  /**
   * Update user preferences in the API server.
   */
  update(data): Promise<IRemoteNotificationPreferences> {
    return putAPI(this.remotePathOrUrl, data);
  }
}
