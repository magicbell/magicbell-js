export default interface IWriter<T> {
  /**
   * Create an element.
   */
  create(item: T): Promise<T>;

  /**
   * Update an element by ID.
   */
  update(id: string | number, item: T): Promise<T>;

  /**
   * Delete an element by ID.
   */
  delete(id: string | number): Promise<boolean>;
}
