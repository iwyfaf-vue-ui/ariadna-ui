import type { ComputedRef } from 'vue';
import type { TSelectSingleFlatProps } from '../../SelectSingleFlat';

/**
 * @description
 * Return type for the `useSelectSingleFlatActions` composable function.
 * Contains reactive properties and methods for SelectSingleFlat component functionality.
 */
export type TUseSelectSingleFlatActionsReturn = {
  /**
   * A computed reference to the label of the currently selected option.
   */
  selectedLabel: ComputedRef<string>;

  /**
   * Determines if a given option is currently selected.
   *
   * @param {TSelectSingleFlatProps['options'][0]} option - The option object to check for selection status.
   * @returns {boolean} - True if the option is selected, otherwise false.
   */
  isSelected(option: TSelectSingleFlatProps['options'][0]): boolean;

  /**
   * Handles the selection of an option.
   *
   * @param {TSelectSingleProps["options"][0]} option - The option(s) to be selected.
   */
  selectOptionHandler: (option: TSelectSingleFlatProps['options'][0]) => void;

  /**
   * Toggles the visibility of the dropdown list.
   */
  toggleDropdownHandler(): void;

  /**
   * Closes the dropdown list.
   */
  closeDropdownHandler(): void;

  /**
   * Clears the currently selected data.
   *
   * @param {Event} event - The DOM event that triggered the clear action.
   */
  cleanSelectedData(event: Event): void;

  /**
   * Handles click events on an item in the dropdown.
   *
   * @param {TSelectSingleFlatProps['options'][0]} item - The item that was clicked.
   */
  onClickItem(item: TSelectSingleFlatProps['options'][0]): void;
};
