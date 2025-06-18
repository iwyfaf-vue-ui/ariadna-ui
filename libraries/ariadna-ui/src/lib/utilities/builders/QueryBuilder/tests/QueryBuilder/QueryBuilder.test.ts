import { describe, it, expect, beforeEach } from 'vitest';
import QueryBuilder from '../../QueryBuilder';

type TTestQuery = {
  page: string | null;
  ids: string[] | null;
  filter: string | null;
  extra: string | null;
};

describe('QueryBuilder', () => {
  let queryBuilder: QueryBuilder<TTestQuery>;

  beforeEach(() => {
    queryBuilder = new QueryBuilder<TTestQuery>();
  });

  describe('constructor', () => {
    it('Should initialize with empty params if no initial params provided.', () => {
      const qb = new QueryBuilder<TTestQuery>();

      expect(qb.buildQueryObject()).toEqual({});
    });

    it('Should initialize with given single string params.', () => {
      const qb = new QueryBuilder<TTestQuery>({ page: '2', filter: 'active' });

      expect(qb.buildQueryObject()).toEqual({ page: '2', filter: 'active' });
    });

    it('Should initialize with given array params.', () => {
      const qb = new QueryBuilder<TTestQuery>({ ids: ['1', '2', '3'] });
      expect(qb.buildQueryObject()).toEqual({ ids: '1,2,3' });
    });

    it('Should initialize with mixed params.', () => {
      const qb = new QueryBuilder<TTestQuery>({ page: '1', ids: ['5', '6'], filter: null });

      expect(qb.buildQueryObject()).toEqual({ page: '1', ids: '5,6', filter: 'null' });
    });
  });

  describe('setParam', () => {
    it('Should set a single param with string value.', () => {
      queryBuilder.setParam('page', '10');

      expect(queryBuilder.buildQueryObject()).toEqual({ page: '10' });
    });

    it('Should set a single param with null value.', () => {
      queryBuilder.setParam('filter', null);

      expect(queryBuilder.buildQueryObject()).toEqual({ filter: 'null' });
    });

    it('Should set a single param with undefined value.', () => {
      queryBuilder.setParam('filter', undefined);

      expect(queryBuilder.buildQueryObject()).toEqual({ filter: 'undefined' });
    });
  });

  describe('setArrayParam', () => {
    it('Should set an array param with string values.', () => {
      queryBuilder.setArrayParam('ids', ['1', '2', '3']);

      expect(queryBuilder.buildQueryObject()).toEqual({ ids: '1,2,3' });
    });

    it('Should set an array param with null and undefined values filtered.', () => {
      queryBuilder.setArrayParam('ids', ['1', null, undefined, '4']);

      expect(queryBuilder.buildQueryObject()).toEqual({ ids: '1,,,4' });
    });

    it('Should set an array param with empty array.', () => {
      queryBuilder.setArrayParam('ids', []);

      expect(queryBuilder.buildQueryObject()).toEqual({ ids: '' });
    });

    it('Should set an array param with all null/undefined values.', () => {
      queryBuilder.setArrayParam('ids', [null, undefined]);

      expect(queryBuilder.buildQueryObject()).toEqual({ ids: ',' });
    });
  });

  describe('deleteParams', () => {
    it('Should delete specified params.', () => {
      queryBuilder
        .setParam('page', '1')
        .setParam('filter', 'active')
        .setArrayParam('ids', ['1', '2']);
      queryBuilder.deleteParams(['page', 'ids']);

      expect(queryBuilder.buildQueryObject()).toEqual({ filter: 'active' });
    });

    it('Should do nothing if deleting non-existing keys.', () => {
      queryBuilder.setParam('page', '1');
      queryBuilder.deleteParams(['filter']);

      expect(queryBuilder.buildQueryObject()).toEqual({ page: '1' });
    });
  });

  describe('clearQuery', () => {
    it('Should remove params with null, undefined, empty string, or empty array.', () => {
      queryBuilder
        .setParam('page', '')
        .setParam('filter', null)
        .setParam('ids', undefined)
        .setArrayParam('ids', [])
        .setParam('extra', 'value' as any); // extra param to remain

      const cleared = queryBuilder.clearQuery();

      expect(cleared).toBeDefined();
      expect(cleared.buildQueryObject()).toEqual({ extra: 'value' });
    });

    it('Should keep params with non-empty string or non-empty array.', () => {
      queryBuilder
        .setParam('page', '1')
        .setArrayParam('ids', ['1', '2'])
        .setParam('filter', 'active');

      const cleared = queryBuilder.clearQuery();

      expect(cleared.buildQueryObject()).toEqual({
        page: '1',
        ids: '1,2',
        filter: 'active',
      });
    });
  });

  describe('removeQuery', () => {
    it('Should clear all params and return undefined.', () => {
      queryBuilder.setParam('page', '1').setParam('filter', 'active');
      const result = queryBuilder.removeQuery();

      expect(result).toBeUndefined();
      expect(queryBuilder.buildQueryObject()).toEqual({});
    });
  });

  describe('buildQueryString', () => {
    it('Should build correct query string for single params.', () => {
      queryBuilder.setParam('page', '5').setParam('filter', 'active');
      const qs = queryBuilder.buildQueryString();

      expect(qs).toContain('page=5');
      expect(qs).toContain('filter=active');
    });

    it('Should build correct query string for array params.', () => {
      queryBuilder.setArrayParam('ids', ['1', '2', '3']);
      const qs = queryBuilder.buildQueryString();

      expect(qs).toContain('ids=1');
      expect(qs).not.toContain('ids=2');
    });

    it('Should build empty string if no params.', () => {
      const qs = queryBuilder.buildQueryString();

      expect(qs).toBe('');
    });
  });

  describe('buildQueryObject', () => {
    it('Should build correct query object for single params.', () => {
      queryBuilder.setParam('page', '10').setParam('filter', 'active');
      const obj = queryBuilder.buildQueryObject();

      expect(obj).toEqual({ page: '10', filter: 'active' });
    });

    it('Should build correct query object for array params.', () => {
      queryBuilder.setArrayParam('ids', ['1', '2']);
      const obj = queryBuilder.buildQueryObject();

      expect(obj).toEqual({ ids: '1,2' });
    });

    it('Should build empty object if no params.', () => {
      const obj = queryBuilder.buildQueryObject();

      expect(obj).toEqual({});
    });
  });
});
