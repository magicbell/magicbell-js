import humps from 'humps';

import { deleteAPI, fetchAPI } from '../../lib/ajax';

/**
 * Class to represent a client that interacts with the MagicBell API.
 *
 * @example
 * class NotificationRepo extends RemoteRepository<Notification, NotificationStore> {}
 */
export default abstract class RemoteRepository<Item, Collection> {
  remotePathOrUrl: string;

  constructor(remotePathOrUrl: string) {
    this.remotePathOrUrl = remotePathOrUrl;
  }

  /**
   * Get an element from the API server by ID.
   *
   * @example
   * const notification = await repo.get('3df592eb-5f09dd6b');
   */
  async get(id: string | number): Promise<Item> {
    const url = `${this.remotePathOrUrl}/${id}`;
    const json = await fetchAPI(url);

    return humps.camelizeKeys(json);
  }

  /**
   * Get elements that match params from the API server.
   *
   * @example
   * const notifications = await repo.findBy({ unread: true });
   */
  async findBy(queryParams: any): Promise<Collection | void> {
    try {
      const json = await fetchAPI(this.remotePathOrUrl, queryParams);
      return humps.camelizeKeys(json);
    } catch (error) {
      // Don't throw Network Errors. Browsers log these themselves and the realtime connection makes
      // MagicBell sensitive to connection errors. We don't want to have these flooding consumer logs.
      if (/Network Error/.test(error.message)) {
        return;
      }

      // rethrow so upstream can handle all other errors
      throw error;
    }
  }

  /**
   * Delete an element by ID from the API server.
   *
   * @example
   * const deleted = await repo.delete('3df592eb-5f09dd6b');
   */
  delete(id: string | number): Promise<boolean> {
    const url = `${this.remotePathOrUrl}/${id}`;

    return deleteAPI(url)
      .then(() => true)
      .catch(() => false);
  }
}
