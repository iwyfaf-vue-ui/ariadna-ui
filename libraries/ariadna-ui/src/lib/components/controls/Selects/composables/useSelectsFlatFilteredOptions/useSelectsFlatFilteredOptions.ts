import { type Ref, unref } from 'vue';
import { ref, watch } from 'vue';
import type { TUseSelectsFlatFilteredOptionsReturn } from './useSelectsFlatFilteredOptions.types';

/**
 * Composable function that provides filtering functionality for select options. It filters options based on a filter
 * string and returns reactive filtered options.
 *
 * @param {() => void} onFilterCallback - Callback function that is executed when filtering occurs
 * @param {Ref<string>} filterState - Reactive reference to the current filter string
 * @param {Ref<Options>} options - Reactive array of selectable options to be filtered.
 *
 * @returns {<Options>} - Object containing the filtered options and the filter function
 */
export default function useSelectsFlatFilteredOptionsTypes<Options extends Array<any>>(
  onFilterCallback: () => void,
  filterState: Ref<string>,
  options: Ref<Options>,
): TUseSelectsFlatFilteredOptionsReturn<Options> {
  const getOptionsClone = (): Options => [...unref(options)] as unknown as Options;

  function onFilter(nextFilterState: string): Options {
    const currentOptions = getOptionsClone();

    if (!nextFilterState) {
      return currentOptions;
    }

    onFilterCallback();

    return currentOptions.filter((item) =>
      item.toLowerCase().includes(nextFilterState.toLowerCase()),
    ) as Options;
  }

  const filterOptions = ref(onFilter(filterState.value)) as Ref<Options>;

  watch(filterState, (newFilterState) => {
    filterOptions.value = onFilter(newFilterState);
  });

  watch(
    options,
    () => {
      filterOptions.value = onFilter(filterState.value);
    },
    { deep: true },
  );

  return { filterOptions, onFilter };
}
