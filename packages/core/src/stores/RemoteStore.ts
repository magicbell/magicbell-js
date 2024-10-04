import PaginatedStore from './PaginatedStore.js';
import { Identifiable } from './Store.js';

/**
 * A store that keep tracks of pagination as well.
 *
 * @example
 * const store = new RemoteStore();
 * store.push(model);
 */
export default abstract class RemoteStore<T extends Identifiable> extends PaginatedStore<T> {
  abstract repo;
  xhrFetchState: 'idle' | 'pending' | 'success' | 'failure' = 'idle';

  /**
   * Fetch items from the API server. The pagination data is also
   * updated. By default the array of items is not reset.
   *
   * @param queryParams Parameters to send to the API.
   * @param options.reset Reset the store.
   */
  async fetch(queryParams, options = { reset: false }) {
    const resetStore = options.reset || queryParams?.page === 1;
    if (resetStore) this.xhrFetchState = 'pending';

    try {
      const json = await this.repo.findBy(queryParams);

      if (resetStore) this.reset();
      this.set(json);
      this.xhrFetchState = 'success';
    } catch (error) {
      this.xhrFetchState = 'failure';
    }
  }

  /**
   * Fetch the next page of items.
   *
   * @param queryParams Parameters to send to the API.
   */
  fetchNextPage(queryParams = {}) {
    return this.fetch({ ...queryParams, page: this.currentPage + 1 });
  }

  abstract create(data);

  abstract set(json);
}
