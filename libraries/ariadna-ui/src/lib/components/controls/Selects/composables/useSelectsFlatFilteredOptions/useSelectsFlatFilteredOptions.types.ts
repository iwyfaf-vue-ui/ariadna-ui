import type { Ref } from 'vue';

/**
 * @description
 * Return type for the `useSelectsFlatFilteredOptions` composable function.
 * Contains reactive properties and methods for SelectsFlat components functionality.
 */
export type TUseSelectsFlatFilteredOptionsReturn<Options> = {
  /**
   * A Vue ref containing the current array of filtered options.
   */
  filterOptions: Ref<Options>;

  /**
   * Filters the available options based on the provided filter state (e.g., search string).
   *
   * @param {string} filterState - The string used to filter the options.
   * @returns {Array<Options>} - An array of options that match the filter criteria.
   */
  onFilter: (filterState: string) => Options[];
};
