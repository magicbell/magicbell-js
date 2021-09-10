export default interface IReader<T> {
  /**
   * Get an element by its ID.
   */
  get(id: string | number): Promise<T>;

  /**
   * Get items that match the params.
   */
  findBy(queryParams): Promise<T[]>;
}
