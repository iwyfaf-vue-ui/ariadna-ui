/**
 * Interface for building query strings and query objects with typed string parameters.
 *
 * @template Query - The type of the query parameters object, values are string, undefined or null.
 */
export interface IQueryBuilder<
  Query extends Record<
    string,
    string | undefined | null | Array<string | undefined | null>
  > = Record<string, string | undefined | null | Array<string | undefined | null>>,
> {
  /**
   * Sets a single query parameter.
   *
   * @param {keyof Query} name - The name of the parameter to set.
   * @param {string | undefined | null} value - The value of the parameter.
   *
   * @returns {IQueryBuilder<Query>} The instance of the query builder for chaining.
   *
   * @example
   * queryBuilder.setParam('page', 2);
   */
  setParam(name: keyof Query, value: string | undefined | null): IQueryBuilder<Query>;

  /**
   * Sets a query parameter with an array of values.
   *
   * @param {keyof Query} name - The name of the parameter to set.
   * @param {Array<string | undefined | null>} values - The array of string values for the parameter.
   *
   * @returns {IQueryBuilder<Query>} The instance of the query builder for chaining.
   *
   * @example
   * queryBuilder.setArrayParam('ids', [1, 2, 3]);
   */
  setArrayParam(name: keyof Query, values: Array<string | undefined | null>): IQueryBuilder<Query>;

  /**
   * Removes specified keys from the query parameters.
   *
   * @param {Array<keyof Query>} keys - An array of keys from the query object that should be deleted. Each key
   * corresponds to a property in the Query type.
   *
   * @returns {IQueryBuilder<Query>} A new instance of IQueryBuilder with the specified keys removed from the query.
   */
  deleteParams(keys: Array<keyof Query>): IQueryBuilder<Query>;

  /**
   * Clears all the current query parameters. Clearing means that all parameters with an empty string, an empty array,
   * null or undefined will be deleted from the query construction.
   *
   * @returns {IQueryBuilder<Query>} The instance of the query builder for chaining.
   *
   * @example
   * queryBuilder.clearQuery();
   */
  clearQuery(): IQueryBuilder<Query>;

  /**
   * Removes all the current query parameters.
   *
   * @returns {undefined}
   *
   * @example
   * queryBuilder.removeQuery();
   */
  removeQuery(): undefined;

  /**
   * Builds and returns the query string representation of the current parameters.
   *
   * @returns {string}
   *
   * @example
   * const queryString = queryBuilder.setParam('id', 123).buildQueryString();
   * // queryString might be '?id=123'
   */
  buildQueryString(): string;

  /**
   * Builds and returns the query parameters as an object.
   *
   * @returns {Query} The constructed query object.
   *
   * @example
   * const queryObject = queryBuilder.setParam('name', 'John').buildQueryObject();
   * // queryObject might be { name: 'John' }
   */
  buildQueryObject(): Query;
}
