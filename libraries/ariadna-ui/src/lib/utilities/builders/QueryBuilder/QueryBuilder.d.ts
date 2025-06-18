import type { IQueryBuilder } from './types/QueryBuilder.types';

/**
 * Ariadna UI | Utilities | QueryBuilder
 *
 * A generic QueryBuilder class for constructing and manipulating query parameters.
 *
 * @template Query - The shape of the query object, where each property can be a string, undefined, null, or an array
 * of these.
 *
 * @example
 * const query = new QueryBuilder({
 *   page: '1',
 *   search: undefined,
 *   filter: null,
 *   sort: 'name',
 *   categories: ['books', 'electronics'],
 *   limit: '10',
 *   ids: ['1', '2', undefined, '4'],
 *   counts: ['1', '2', null, '4'],
 *   books: [],
 * });
 *
 * const result = query.clearQuery().buildQueryObject();
 */
declare class QueryBuilder<
  Query extends Record<
    string,
    string | undefined | null | Array<string | undefined | null>
  > = Record<string, string | undefined | null | Array<string | undefined | null>>,
> implements IQueryBuilder<Query>
{
  /**
   * Creates a new instance of QueryBuilder optionally initialized with partial query parameters.
   *
   * @param {Partial<Record<keyof Query, string | (string | null | undefined)[] | undefined | null>>} params - Partial
   * initial query parameters to set.
   */
  constructor(
    params?: Partial<
      Record<keyof Query, string | (string | null | undefined)[] | undefined | null>
    >,
  );

  setParam(name: keyof Query, value: string | undefined | null): IQueryBuilder<Query>;
  setArrayParam(name: keyof Query, values: Array<string | undefined | null>): IQueryBuilder<Query>;
  deleteParams(keys: Array<keyof Query>): IQueryBuilder<Query>;
  clearQuery(): IQueryBuilder<Query>;
  removeQuery(): undefined;
  buildQueryString(): string;
  buildQueryObject(): Query;
}

export default QueryBuilder;
