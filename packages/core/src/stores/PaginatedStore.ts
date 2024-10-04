import Store, { Identifiable } from './Store.js';

export interface IPagination {
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
  currentPage: number;
}

/**
 * A store that keep tracks of pagination as well.
 *
 * @example
 * const store = new PaginatedStore();
 * store.push(model);
 */
export default class PaginatedStore<T extends Identifiable> extends Store<T> {
  total = 0;
  totalPages: number;
  page: number;
  perPage: number;
  currentPage = 1;

  get hasNextPage() {
    return this.currentPage < this.totalPages;
  }

  /**
   * Add a model at the end of the `items` array.
   */
  push(model: T) {
    const added = super.push(model);
    if (added) this.total += 1;

    return added;
  }

  /**
   * Remove a model from the `items` array.
   *
   * If you want to delete a model from the server, use the `delete` method of
   * the model object instead.
   */
  remove(model: T) {
    const removed = super.remove(model);
    if (removed) this.total = Math.max(0, this.total - 1);

    return removed;
  }
}
