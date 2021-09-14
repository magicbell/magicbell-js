import humps from 'humps';
import { fetchAPI, putAPI } from '../../lib/ajax';
import { IRemoteNotificationPreferences } from '../../types/IRemoteNotificationPreferences';

interface IWrappedNotificationPreferences {
  notificationPreferences: IRemoteNotificationPreferences;
}

/**
 * Class to interact with the notification preferences API endpoints.
 *
 * @example
 * const repo = new NotificationPreferencesRepository();
 * const preferences = repo.get();
 */
export default class NotificationPreferencesRepository {
  remotePathOrUrl: string;

  constructor(remotePathOrUrl = '/notification_preferences') {
    this.remotePathOrUrl = remotePathOrUrl;
  }

  /**
   * Get the user preferences from the API server.
   */
  async get(): Promise<IWrappedNotificationPreferences> {
    const json = await fetchAPI(this.remotePathOrUrl);
    return humps.camelizeKeys(json);
  }

  /**
   * Update user preferences in the API server.
   *
   * @param data Data to send to the server.
   */
  update(data: Partial<IWrappedNotificationPreferences>): Promise<boolean> {
    return putAPI(this.remotePathOrUrl, humps.decamelizeKeys(data))
      .then(() => true)
      .catch(() => false);
  }
}
