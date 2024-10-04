import filter from 'lodash/filter.js';
import find from 'lodash/find.js';
import map from 'lodash/map.js';

export interface Identifiable {
  id?: string | number | null;
}

/**
 * A representation of collection of models.
 *
 * @example
 * const store = new Store();
 * store.at(0);
 */
export default class Store<T extends Identifiable> {
  items: T[] = [];

  /**
   * Number of models in the `items` array.
   *
   * If you want to get the total number of models in the server use `total`
   * instead.
   */
  get length() {
    return this.items.length;
  }

  /**
   * Returns true if the store has no models.
   */
  get isEmpty() {
    return this.length === 0;
  }

  /**
   * Get a model from the `items` array, specified by index.
   */
  at(index: number) {
    return this.length > index ? this.items[index] : null;
  }

  /**
   * Get a model from the `items` array by id.
   */
  get(id: string | number) {
    const model = this.items.find((item) => item.id === id);

    if (model) return model;
    return null;
  }

  /**
   * Creates an array of values by running each model in `items` array thru
   * iteratee.
   *
   * The iteratee is invoked with three arguments: `(model, index, itemsArray)`.
   *
   * @param fn The function invoked per iteration.
   */
  map = (fn: (value: T, index?: number, collection?: T[]) => any) => {
    return map(this.items, fn);
  };

  /**
   * Iterates over items of the store, returning an array of all elements
   * `predicate` returns truthy for.
   *
   * @param predicate The function invoked per iteration.
   */
  filter = (predicate) => {
    return filter(this.items, predicate);
  };

  /**
   * Iterates over items of the store, returning the first element `predicate`
   * returns truthy for.
   *
   * @param predicate The function invoked per iteration.
   */
  find = (predicate) => {
    const models = find(this.items, predicate);

    if (models) return models;
    return null;
  };

  /**
   * Append an item to the store.
   */
  push(model: T) {
    if (!this.items.includes(model)) {
      this.items.push(model);
      return true;
    }

    return false;
  }

  /**
   * Remove a model from the store.
   *
   * If you want to delete a model from the server, use the `delete` method of
   * the model object instead.
   */
  remove(model: T) {
    const index = this.items.indexOf(model);

    if (index >= 0) {
      this.items.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * Set the list of items.
   *
   * @param items
   */
  setItems(items: T[]) {
    this.items = items;
  }

  /**
   * Reset the store.
   */
  reset() {
    this.items = [];
  }
}
