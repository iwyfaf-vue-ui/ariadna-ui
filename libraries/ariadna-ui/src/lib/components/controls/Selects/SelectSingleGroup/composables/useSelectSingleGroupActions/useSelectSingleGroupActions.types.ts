import type { ComputedRef } from 'vue';
import type { TSelectSingleGroupProps } from '../../SelectSingleGroup';

/**
 * @description
 * Return type for the `useSelectSingleGroupActions` composable function.
 * Contains reactive properties and methods for SelectSingleGroup component functionality.
 */
export type TUseSelectSingleGroupActionsReturn = {
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
   * Handles the selection of an option in group.
   *
   * @param {TSelectSingleGroupProps["options"][0]} option - The option(s) to be selected.
   */
  selectGroupOptionHandler: (option: TSelectSingleGroupProps['options'][0]) => void;

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
