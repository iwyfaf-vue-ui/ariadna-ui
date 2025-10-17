import { assert, describe, expect, it } from 'vitest';
import { FilterBuilderSelectorTestData } from '../test-data/FilterBuilder.selector.test-data';
import FilterBuilder from '../../FilterBuilder';
import { ELibraryConfig } from '@/types/internal';
import {
  EFilterBuilderErrors,
  EFilterBuilderLogicOperator,
  EFilterBuilderOption,
} from '../../types/FilterBuilder.enum';

const defaultMock = new FilterBuilderSelectorTestData();

describe('FilterBuilder: Public methods', () => {
  describe('select', () => {
    it('Should set the current filter field.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.oneDimensionalArrayData);

      const filter = filterBuilder.select('name');

      expect(filter).toBeInstanceOf(FilterBuilder);
      expect(filterBuilder['currentField']).toEqual(defaultMock.oneDimensionalCurrentOneField);
    });

    it('Should throw an error if no field is selected after setting a logical condition.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.oneDimensionalArrayData);

      assert.throws(
        () =>
          filterBuilder
            .select('name')
            .and()
            .filter(() => true),
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.FIELDS_COUNT_MUST_BE_MORE_THEN_LOGICAL}`,
      );
    });

    it('Should return an empty array with correctly set fields and an empty data array.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.emptyArrayData);

      expect(filterBuilder.select('name').filter(() => true)).toEqual([]);
    });
  });

  describe('configureFields', () => {
    it('Should set the fields for filtering.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.oneDimensionalArrayData);

      const filter = filterBuilder.configureFields(defaultMock.oneDimensionalArrayOneField);

      expect(filter).toBeInstanceOf(FilterBuilder);
      expect(filterBuilder['fields']).toEqual(defaultMock.oneDimensionalArrayOneField);
    });

    it('Should return an empty array with correctly set fields and an empty data array.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.emptyArrayData);

      expect(filterBuilder.configureFields([[{ field: 'name' }]]).filter(() => true)).toEqual([]);
    });
  });

  describe('filter', () => {
    const filterBuilder = new FilterBuilder(defaultMock.emptyArrayData);

    it('Should throw an error if configureFields() or select() is not called.', () => {
      assert.throws(
        () => filterBuilder.filter(() => true),
        `${ELibraryConfig.NAME} ${EFilterBuilderOption.NAME}: ${EFilterBuilderErrors.FIELDS_LENGTH_NOT_EQUAL_ZERO}`,
      );
    });
  });
});

describe('FilterBuilder: Input data.', () => {
  describe('One dimensional array: Testing one-dimensional data array.', () => {
    it('Should return a filtered array by selecting one field.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.oneDimensionalArrayData);

      expect(filterBuilder.select('name').filter((item) => item.includes('Dean'))).toEqual(
        defaultMock.oneDimensionalArrayResult,
      );

      expect(
        filterBuilder
          .configureFields([[{ field: 'name' }]])
          .filter((item) => item.includes('Dean')),
      ).toEqual(defaultMock.oneDimensionalArrayResult);
    });

    it('Should return a filtered array by selecting one field and a logical condition.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.oneDimensionalArrayData);

      expect(
        filterBuilder
          .select('name')
          .or()
          .select('age')
          .filter((item) => String(item).includes('18')),
      ).toEqual(defaultMock.oneDimensionalArrayResult);

      expect(
        filterBuilder
          .configureFields(
            [[{ field: 'name' }], [{ field: 'age' }]],
            EFilterBuilderLogicOperator.OR,
          )
          .filter((item) => String(item).includes('18')),
      ).toEqual(defaultMock.oneDimensionalArrayResult);
    });

    it('Should return a filtered array by selecting one field and different logical conditions.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.oneDimensionalArrayData);

      expect(
        filterBuilder
          .select('name')
          .and()
          .select('age')
          .or()
          .select('number')
          .filter((item) => String(item).includes('1')),
      ).toEqual(defaultMock.oneDimensionalArrayResult);

      expect(
        filterBuilder
          .configureFields(
            [[{ field: 'name' }], [{ field: 'age' }], [{ field: 'number' }]],
            [EFilterBuilderLogicOperator.AND, EFilterBuilderLogicOperator.OR],
          )
          .filter((item) => String(item).includes('1')),
      ).toEqual(defaultMock.oneDimensionalArrayResult);
    });
  });

  describe('One dimensional array: Testing one-dimensional data array with nested fields.', () => {
    it('Should return a filtered array by selecting one field.', () => {
      const filterBuilder = new FilterBuilder(
        defaultMock.oneDimensionalArrayWithNestedPropertiesData,
      );

      const nativeResult = defaultMock.oneDimensionalArrayWithNestedPropertiesData.filter(
        (item) => item.address.house.floor > 10,
      );

      expect(
        filterBuilder
          .select('address')
          .select('house')
          .select('floor')
          .filter<number>((item) => item > 10),
      ).toEqual(nativeResult);

      expect(
        filterBuilder
          .configureFields([[{ field: 'address' }, { field: 'house' }, { field: 'floor' }]])
          .filter<number>((item) => item > 10),
      ).toEqual(nativeResult);
    });

    it('Should return a filtered array by selecting one field and a logical condition.', () => {
      const filterBuilder = new FilterBuilder(
        defaultMock.oneDimensionalArrayWithNestedPropertiesData,
      );

      const nativeResult = defaultMock.oneDimensionalArrayWithNestedPropertiesData.filter(
        (item) => (item.address.house.floor > 20 && item.address.house.number > 20) || item.id > 20,
      );

      expect(
        filterBuilder
          .select('address')
          .select('house')
          .select('floor')
          .and()
          .select('address')
          .select('house')
          .select('number')
          .or()
          .select('id')
          .filter<number>((item) => item > 20),
      ).toEqual(nativeResult);

      expect(
        filterBuilder
          .configureFields(
            [
              [{ field: 'address' }, { field: 'house' }, { field: 'floor' }],
              [{ field: 'address' }, { field: 'house' }, { field: 'number' }],
              [{ field: 'id' }],
            ],
            [EFilterBuilderLogicOperator.AND, EFilterBuilderLogicOperator.OR],
          )
          .filter<number>((item) => item > 20),
      ).toEqual(nativeResult);
    });

    it('Should return a filtered array by selecting one field and different logical conditions.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.oneDimensionalArrayData);

      expect(
        filterBuilder
          .select('name')
          .and()
          .select('age')
          .or()
          .select('number')
          .filter((item) => String(item).includes('1')),
      ).toEqual(defaultMock.oneDimensionalArrayResult);

      expect(
        filterBuilder
          .configureFields(
            [[{ field: 'name' }], [{ field: 'age' }], [{ field: 'number' }]],
            [EFilterBuilderLogicOperator.AND, EFilterBuilderLogicOperator.OR],
          )
          .filter((item) => String(item).includes('1')),
      ).toEqual(defaultMock.oneDimensionalArrayResult);
    });
  });

  describe('Multi dimensional array: Testing multi-dimensional data array.', () => {
    it('Should return a filtered array by selecting one field.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.multiDimensionalArrayData);

      const nativeResult = defaultMock.multiDimensionalArrayData
        .map((item) => ({
          ...item,
          children: item.children.filter((child) => child.name.includes('10')),
        }))
        .filter((item) => item.children.length);

      expect(
        filterBuilder
          .select('children')
          .select('name')
          .filter((item) => item.includes('10')),
      ).toEqual(nativeResult);

      expect(
        filterBuilder
          .configureFields([[{ field: 'children' }, { field: 'name' }]])
          .filter((item) => item.includes('10')),
      ).toEqual(nativeResult);
    });

    it('Should return a filtered array by selecting one field and a logical condition.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.multiDimensionalArrayData);

      const nativeResult = defaultMock.multiDimensionalArrayData
        .map((item) => ({
          ...item,
          children: item.children.filter(
            (child) => child.id.toString().includes('5') && child.name.includes('5'),
          ),
        }))
        .filter((item) => item.children.length);

      expect(
        filterBuilder
          .select('children')
          .select('name')
          .and()
          .select('children')
          .select('id')
          .filter<string | number>((item) => String(item).includes('5')),
      ).toEqual(nativeResult);

      expect(
        filterBuilder
          .configureFields(
            [
              [{ field: 'children' }, { field: 'name' }],
              [{ field: 'children' }, { field: 'id' }],
            ],
            EFilterBuilderLogicOperator.AND,
          )
          .filter<string | number>((item) => String(item).includes('5')),
      ).toEqual(nativeResult);
    });

    it('Should return a filtered array by selecting one field and different logical conditions.', () => {
      const filterBuilder = new FilterBuilder(defaultMock.multiDimensionalArrayData);

      const nativeResult = defaultMock.multiDimensionalArrayData
        .map((item) => ({
          ...item,
          children: item.children.filter(
            (child) => child.id.toString().includes('5') && child.name.includes('5'),
          ),
        }))
        .filter((item) => item.children.length || item.id.toString().includes('5'));

      expect(
        filterBuilder
          .select('children')
          .select('name')
          .and()
          .select('children')
          .select('id')
          .or()
          .select('id')
          .filter<string | number>((item) => String(item).includes('5')),
      ).toEqual(nativeResult);

      expect(
        filterBuilder
          .configureFields(
            [
              [{ field: 'children' }, { field: 'name' }],
              [{ field: 'children' }, { field: 'id' }],
              [{ field: 'id' }],
            ],
            [EFilterBuilderLogicOperator.AND, EFilterBuilderLogicOperator.OR],
          )
          .filter<string | number>((item) => String(item).includes('5')),
      ).toEqual(nativeResult);
    });
  });
});
