import type { ComputedRef } from 'vue';
import type { TSelectSingleProps } from '../../SelectSingle';

/**
 * @description
 * Return type for the `useSelectSingleActions` composable function.
 * Contains reactive properties and methods for SelectSingle component functionality.
 */
export type TUseSelectSingleActionsReturn = {
  /**
   * A computed reference to the label of the currently selected option.
   */
  selectedLabel: ComputedRef<string>;

  /**
   * Determines if a given option is currently selected.
   *
   * @param {Record<string, any>} option - The option object to check for selection status.
   * @returns {boolean} - True if the option is selected, otherwise false.
   */
  isSelected(option: Record<string, any>): boolean;

  /**
   * Handles the selection of an option.
   *
   * @param {TSelectSingleProps["options"]} option - The option(s) to be selected.
   */
  selectOptionHandler: (option: TSelectSingleProps['options']) => void;

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
   * @param item - The item that was clicked.
   */
  onClickItem(item: any): void;
};
