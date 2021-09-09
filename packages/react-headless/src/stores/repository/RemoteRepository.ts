import humps from 'humps';
import { deleteAPI, fetchAPI, postAPI, putAPI } from '../../lib/ajax';

/**
 * Class to represent a client that interacts with the MagicBell API.
 *
 * @example
 * class NotificationRepo extends RemoteRepository<Notification, NotificationStore> {}
 */
export default abstract class RemoteRepository<Item extends Object, Collection> {
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
  async findBy(queryParams: any): Promise<Collection> {
    const json = await fetchAPI(this.remotePathOrUrl, queryParams);
    return humps.camelizeKeys(json);
  }

  async create(item: Partial<Item>): Promise<Item> {
    const json = await postAPI(this.remotePathOrUrl, item);
    return humps.camelizeKeys(json);
  }

  update(id: string | number, item: Item): Promise<Item> {
    const url = `${this.remotePathOrUrl}/${id}`;
    return putAPI(url, item);
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
