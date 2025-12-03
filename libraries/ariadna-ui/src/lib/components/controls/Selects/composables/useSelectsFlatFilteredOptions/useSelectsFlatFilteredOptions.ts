import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import type { TUseSelectsFlatFilteredOptionsReturn } from './useSelectsFlatFilteredOptions.types';

/**
 * Composable function that provides filtering functionality for select options. It filters options based on a filter
 * string and returns reactive filtered options.
 *
 * @param {() => void} onFilterCallback - Callback function that is executed when filtering occurs
 * @param {Ref<string>} filterState - Reactive reference to the current filter string
 * @param {Options} options - Array of options to be filtered
 *
 * @returns {<Options>} - Object containing the filtered options and the filter function
 */
export default function useSelectsFlatFilteredOptionsTypes<Options extends Array<any>>(
  onFilterCallback: () => void,
  filterState: Ref<string>,
  options: Options,
): TUseSelectsFlatFilteredOptionsReturn<Options> {
  function onFilter(filterState: string): Options {
    if (!filterState) {
      return options;
    }

    onFilterCallback();

    return options.filter((item) =>
      item.toLowerCase().includes(filterState.toLowerCase()),
    ) as Options;
  }

  const filterOptions = ref(onFilter(filterState.value)) as Ref<Options>;

  watch(filterState, (newFilterState) => {
    filterOptions.value = onFilter(newFilterState);
  });

  watch(
    () => options,
    () => {
      filterOptions.value = onFilter(filterState.value);
    },
  );

  return { filterOptions, onFilter };
}
