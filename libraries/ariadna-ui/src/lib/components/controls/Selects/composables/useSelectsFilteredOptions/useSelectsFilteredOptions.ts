import type { Ref } from 'vue';
import { ref, unref, watch } from 'vue';
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
 * @param {Ref<Options>} options - Reactive array of selectable options to be filtered.
 * @param {TFilterBuilderFullField<Options>[][]} filterLabel - Two-dimensional array specifying which fields of the
 * option objects should be used for filtering.
 *
 * @returns {TUseSelectsFilteredOptionsReturn<Options>}
 */
export default function useSelectsFilteredOptions<Options extends Array<any>>(
  onFilterCallback: () => void,
  filterState: Ref<string>,
  options: Ref<Options>,
  filterLabel: TFilterBuilderFullField<Options>[][],
): TUseSelectsFilteredOptionsReturn<Options> {
  const getOptionsClone = (): Options => [...unref(options)] as unknown as Options;

  const filterBuilder = ref(new FilterBuilder(getOptionsClone()));

  function onFilter(nextFilterState: string): Options {
    const currentOptions = getOptionsClone();

    if (!nextFilterState) {
      return currentOptions;
    }

    onFilterCallback();

    return filterLabel.length
      ? (filterBuilder.value
          .configureFields(filterLabel, EFilterBuilderLogicOperator.OR)
          .filter((item) =>
            item.toLowerCase().includes(nextFilterState.toLowerCase()),
          ) as unknown as Options)
      : currentOptions;
  }

  const filterOptions = ref(onFilter(filterState.value)) as Ref<Options>;

  watch(filterState, (newFilterState) => {
    filterOptions.value = onFilter(newFilterState);
  });

  watch(
    options,
    () => {
      filterBuilder.value = new FilterBuilder<Options>(getOptionsClone());
      filterOptions.value = onFilter(filterState.value);
    },
    { deep: true },
  );

  return { filterOptions, onFilter };
}
