import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import type { TFilterBuilderFullField } from '@/lib/utilities/builders/FilterBuilder/types/FilterBuilder.types';
import FilterBuilder from '@/lib/utilities/builders/FilterBuilder/FilterBuilder';
import { EFilterBuilderLogicOperator } from '@/lib/utilities/builders/FilterBuilder/types/FilterBuilder.enum';
import type { TUseSelectsFilteredOptionsReturn } from './useSelectsFilteredOptions.types';

/**
 * Composable for filtering options in Selects components based on a filter state and configurable fields.
 *
 * @template <Options extends Array<any>> - The type of the options array elements.
 *
 * @param {() => void} onFilterCallback - Callback function invoked each time filtering occurs.
 * @param {Ref<string>} filterState - Reactive reference to the current filter string.
 * @param {Options} options - Array of selectable options to be filtered.
 * @param {TFilterBuilderFullField<Options>[][]} filterLabel - Two-dimensional array specifying which fields of the
 * option objects should be used for filtering.
 *
 * @returns {TUseSelectsFilteredOptionsReturn<Options>}
 */
export default function useSelectsFilteredOptions<Options extends Array<any>>(
  onFilterCallback: () => void,
  filterState: Ref<string>,
  options: Options,
  filterLabel: TFilterBuilderFullField<Options>[][],
): TUseSelectsFilteredOptionsReturn<Options> {
  let filterBuilder = ref(new FilterBuilder(options));

  function onFilter(filterState: string): Array<Options> {
    if (!filterState) {
      return options;
    }

    onFilterCallback();

    return filterLabel.length
      ? filterBuilder.value
          .configureFields(filterLabel, EFilterBuilderLogicOperator.OR)
          .filter((item) => item.toLowerCase().includes(filterState.toLowerCase()))
      : options;
  }

  const filterOptions = ref(onFilter(filterState.value)) as Ref<Array<Options>>;

  watch(filterState, (newFilterState) => {
    filterOptions.value = onFilter(newFilterState);
  });

  watch(
    () => options,
    (newOptions) => {
      filterBuilder.value = new FilterBuilder<Options>(newOptions);
      filterOptions.value = onFilter(filterState.value);
    },
  );

  return { filterOptions, onFilter };
}
