import type { IQueryBuilder } from './types/QueryBuilder.types';

export default class QueryBuilder<
  Query extends Record<
    string,
    string | undefined | null | Array<string | undefined | null>
  > = Record<string, string | undefined | null | Array<string | undefined | null>>,
> implements IQueryBuilder<Query>
{
  private params: Partial<
    Record<keyof Query, string | (string | null | undefined)[] | undefined | null>
  >;

  constructor(
    params?: Partial<
      Record<keyof Query, string | (string | null | undefined)[] | undefined | null>
    >,
  ) {
    this.params = params ? { ...params } : {};
    this.fromData();
  }

  private fromData(): void {
    Object.entries(this.params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        this.setArrayParam(key as keyof Query, value);
      } else {
        this.setParam(key as keyof Query, value as string | undefined | null);
      }
    });
  }

  public setParam(name: keyof Query, value: string | undefined | null): IQueryBuilder<Query> {
    this.params[name] = value;

    return this;
  }

  public setArrayParam(
    name: keyof Query,
    values: Array<string | undefined | null>,
  ): IQueryBuilder<Query> {
    this.params[name] = values as unknown as Query[keyof Query];

    return this;
  }

  public deleteParams(keys: Array<keyof Query>): IQueryBuilder<Query> {
    keys.forEach((key) => {
      delete this.params[key];
    });

    return this;
  }

  public clearQuery(): IQueryBuilder<Query> {
    this.params = Object.entries(this.params).reduce(
      (acc, [key, value]) => {
        if (value === null || value === undefined) {
          return acc;
        }

        if (typeof value === 'string') {
          if (value !== '') {
            acc[key as keyof Query] = value;
          }

          return acc;
        }

        if (Array.isArray(value)) {
          const filtered = value.filter(
            (v): v is string => v !== null && v !== undefined && v !== '',
          );

          if (filtered.length > 0) {
            acc[key as keyof Query] = filtered;
          }

          return acc;
        }

        return acc;
      },
      {} as Partial<Record<keyof Query, string | string[] | undefined>>,
    );

    return this;
  }

  public removeQuery(): undefined {
    this.params = {};

    return undefined;
  }

  public buildQueryString(): string {
    return new URLSearchParams(this.params as Record<string, string>).toString();
  }

  public buildQueryObject(): Query {
    const entries = new URLSearchParams(this.buildQueryString()).entries();
    const result: Partial<Query> = {};

    for (const [key, value] of entries) {
      result[key as keyof Query] = value as Query[keyof Query];
    }

    return result as Query;
  }
}
