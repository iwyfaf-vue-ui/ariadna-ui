import type { ComputedRef } from 'vue';
import type { TSelectMultipleGroupProps } from '../../SelectMultipleGroup';

/**
 * @description
 * Return type for the `useSelectMultipleGroupActions` composable function.
 * Contains reactive properties and methods for SelectMultipleGroup component functionality.
 */
export type TUseSelectMultipleGroupActionsReturn = {
  /**
   * A computed reference to the currently selected options array.
   */
  selectedOptions: ComputedRef<any[]>;

  /**
   * A computed reference to the generated label string representing the selected options.
   */
  generatedLabel: ComputedRef<string>;

  /**
   * A computed reference indicating whether the generated label should be displayed.
   */
  showGeneratedLabel: ComputedRef<boolean>;

  /**
   * A computed reference indicating whether the clean (reset) button should be hidden.
   */
  hideCleanButton: ComputedRef<boolean>;

  /**
   * Removes the provided option from the selected options list.
   *
   * @param {TSelectMultipleGroupProps["options"][0]} option - The option object to remove from selection.
   */
  removeLabel: (option: TSelectMultipleGroupProps['options'][0]) => void;

  /**
   * Handles the selection or deselection of an option.
   *
   * @param {TSelectMultipleGroupProps["options"][0]} option - The option object to select or deselect.
   */
  selectGroupOptionHandler: (option: TSelectMultipleGroupProps['options'][0]) => void;

  /**
   * Clears all selected options in response to a user event.
   *
   * @param {Event} event - The DOM event that triggered the clean action.
   */
  cleanSelectedData: (event: Event) => void;

  /**
   * Toggles the visibility of the dropdown menu.
   */
  toggleDropdownHandler: () => void;

  /**
   * Closes the dropdown menu.
   */
  closeDropdownHandler: () => void;

  /**
   * Handles the click event on a dropdown item.
   *
   * @param {TSelectMultipleGroupProps["options"][0]} item - The item object that was clicked.
   */
  onClickItem: (item: TSelectMultipleGroupProps['options'][0]) => void;

  /**
   * A computed Map containing pre-calculated selection states for all options.
   * Key: option object, Value: boolean indicating if the option is selected.
   */
  selectedOptionsMap: ComputedRef<Map<any, boolean>>;
};
