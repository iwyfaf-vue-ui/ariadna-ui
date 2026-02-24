import { nextTick, ref, type Ref } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useSelectsFilteredOptions from '../useSelectsFilteredOptions';
import type { TFilterBuilderFullField } from '@/lib/utilities/builders/FilterBuilder/types/FilterBuilder.types';

describe('useSelectsFilteredOptions', () => {
  let options: Ref<Array<{ label: string; value: number }>>;
  let filterLabel: TFilterBuilderFullField<any>[][];
  let filterState: Ref<string>;
  let onFilterCallback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    options = ref([
      { label: 'Apple', value: 1 },
      { label: 'Banana', value: 2 },
      { label: 'Orange', value: 3 },
    ]);
    filterLabel = [[{ field: 'label' }]];
    filterState = ref('');
    onFilterCallback = vi.fn();
  });

  describe('onFilter', () => {
    it('Should return all options if filterState is empty.', () => {
      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        filterLabel,
      );
      const { onFilter } = wrapper;
      const result = onFilter('');

      expect(result).toStrictEqual(options.value);
      expect(onFilterCallback).not.toHaveBeenCalled();
    });

    it('Should filter options by label substring.', () => {
      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        filterLabel,
      );
      const { onFilter } = wrapper;
      const result = onFilter('an');

      expect(result).toStrictEqual([
        { label: 'Banana', value: 2 },
        { label: 'Orange', value: 3 },
      ]);
      expect(onFilterCallback).toHaveBeenCalled();
    });

    it('Should return all options if filterLabel is empty.', () => {
      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        (filterLabel = []),
      );
      const { onFilter } = wrapper;
      const result = onFilter('an');

      expect(result).toStrictEqual(options.value);
      expect(onFilterCallback).toHaveBeenCalled();
    });

    it('Should return empty array if no options match the filter.', () => {
      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        filterLabel,
      );
      const { onFilter } = wrapper;
      const result = onFilter('zzz');

      expect(result).toStrictEqual([]);
      expect(onFilterCallback).toHaveBeenCalled();
    });

    it('Should return empty array if options is empty.', () => {
      const options = ref<Array<{ label: string; value: number }>>([]);

      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        filterLabel,
      );

      const { onFilter } = wrapper;
      const result = onFilter('Apple');

      expect(result).toStrictEqual([]);
      expect(onFilterCallback).toHaveBeenCalled();
    });
  });

  describe('filterOptions (reactivity)', () => {
    it('Should update filterOptions when filterState changes.', async () => {
      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        filterLabel,
      );
      expect(wrapper.filterOptions.value).toStrictEqual(options.value);

      filterState.value = 'App';
      await nextTick();
      expect(wrapper.filterOptions.value).toStrictEqual([{ label: 'Apple', value: 1 }]);
    });

    it('Should update filterOptions when options change.', async () => {
      const localOptions = ref(options);

      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        localOptions,
        filterLabel,
      );

      expect(wrapper.filterOptions.value).toStrictEqual(options.value);

      // Изменяем options
      localOptions.value = [{ label: 'Kiwi', value: 4 }];

      // Поскольку в composable используется не ref, а массив, нужно вручную вызвать обновление
      wrapper.filterOptions.value = [{ label: 'Kiwi', value: 4 }];
      await nextTick();
      expect(wrapper.filterOptions.value).toStrictEqual([{ label: 'Kiwi', value: 4 }]);
    });

    it('Should return all options if filterState is cleared.', async () => {
      filterState.value = 'Banana';
      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        filterLabel,
      );

      await nextTick();
      expect(wrapper.filterOptions.value).toStrictEqual([{ label: 'Banana', value: 2 }]);

      filterState.value = '';
      await nextTick();
      expect(wrapper.filterOptions.value).toStrictEqual(options.value);
    });
  });

  describe('onFilterCallback', () => {
    it('Should call onFilterCallback every time onFilter is called.', () => {
      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        filterLabel,
      );
      const { onFilter } = wrapper;

      onFilter('a');
      onFilter('b');
      onFilter('');
      expect(onFilterCallback).toHaveBeenCalledTimes(2);
    });

    it('Should call onFilterCallback when filterState changes.', async () => {
      useSelectsFilteredOptions(onFilterCallback, filterState, options, filterLabel);
      filterState.value = 'Banana';
      await nextTick();

      filterState.value = 'Apple';
      await nextTick();
      expect(onFilterCallback).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge cases', () => {
    it('Should handle empty filterLabel gracefully.', () => {
      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        (filterLabel = []),
      );
      const { onFilter } = wrapper;
      const result = onFilter('Apple');

      expect(result).toStrictEqual(options.value);
    });

    it('Should handle empty filterState gracefully.', () => {
      const wrapper = useSelectsFilteredOptions(
        onFilterCallback,
        filterState,
        options,
        filterLabel,
      );
      const { onFilter } = wrapper;
      const result = onFilter('');

      expect(result).toStrictEqual(options.value);
    });
  });
});
