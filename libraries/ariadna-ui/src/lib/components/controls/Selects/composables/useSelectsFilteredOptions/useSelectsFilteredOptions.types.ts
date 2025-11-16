import type { Ref } from 'vue';

/**
 * @description
 * Return type for the `useSelectsFilteredOptions` composable function.
 * Contains reactive properties and methods for Selects components functionality.
 */
export type TUseSelectsFilteredOptionsReturn<Options> = {
  /**
   * A Vue ref containing the current array of filtered options.
   */
  filterOptions: Ref<Array<Options>>;

  /**
   * Filters the available options based on the provided filter state (e.g., search string).
   *
   * @param {string} filterState - The string used to filter the options.
   * @returns {Array<Options>} - An array of options that match the filter criteria.
   */
  onFilter: (filterState: string) => Array<Options>;
};
