import { deleteAPI, fetchAPI, postAPI, putAPI } from '../lib/ajax';
import IReader from './IReader';
import IWriter from './IWriter';

/**
 * Class to represent a client that interacts with the MagicBell API.
 *
 * @example
 * class NotificationRepo extends RemoteRepository<Notification> {}
 */
export default abstract class RemoteRepository<RemoteType, CreationType = RemoteType>
  implements IReader<RemoteType>, IWriter<CreationType>
{
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
  get(id: string | number): Promise<RemoteType> {
    const url = `${this.remotePathOrUrl}/${id}`;
    return fetchAPI(url);
  }

  /**
   * Get elements that match params from the API server.
   *
   * @example
   * const notifications = await repo.findBy({ unread: true });
   */
  findBy(queryParams: any): Promise<RemoteType[]> {
    return fetchAPI(this.remotePathOrUrl, queryParams);
  }

  create(item: CreationType): Promise<CreationType> {
    return postAPI(this.remotePathOrUrl, item);
  }

  update(id: string | number, item: CreationType): Promise<CreationType> {
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
