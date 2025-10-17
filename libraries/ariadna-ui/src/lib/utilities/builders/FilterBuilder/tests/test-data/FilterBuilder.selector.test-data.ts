import { DataSelector } from '@/shared/tests/DataSelector';
import type { TFilterBuilderFullField } from '@/lib/utilities/builders/FilterBuilder/types/FilterBuilder.types';

export class FilterBuilderSelectorTestData extends DataSelector {
  public readonly emptyArrayData: Array<Record<string, never>>;
  public readonly oneDimensionalArrayData;
  public readonly oneDimensionalArrayWithNestedPropertiesData;
  public readonly multiDimensionalArrayData;
  public readonly oneDimensionalArrayOneField: TFilterBuilderFullField<any>[][];
  public readonly oneDimensionalCurrentOneField: TFilterBuilderFullField<any>;
  public readonly oneDimensionalArrayResult;

  constructor() {
    super();

    this.emptyArrayData = [];

    this.oneDimensionalArrayData = [
      { name: 'Dean', age: 18, number: 1 },
      { name: 'Sam', age: 24, number: 2 },
    ];

    this.oneDimensionalArrayWithNestedPropertiesData = Array.from({ length: 5 }, (_, index) => ({
      id: index,
      name: `Item ${index + 1}`,
      address: {
        house: {
          floor: index ** 2 + 1,
          number: index ** 4 + 1,
        },
      },
    }));

    this.multiDimensionalArrayData = Array.from({ length: 5 }, (_, index) => ({
      id: index,
      name: `Item ${index + 1}`,
      children: Array.from({ length: 10 }, (_, index2) => ({
        id: index2,
        name: `Child ${index2 + 1}`,
      })),
    }));

    this.oneDimensionalArrayOneField = [[{ field: 'name' }]];

    this.oneDimensionalCurrentOneField = { field: 'name' };

    this.oneDimensionalArrayResult = [{ name: 'Dean', age: 18, number: 1 }];
  }
}
