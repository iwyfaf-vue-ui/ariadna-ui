import type { ComputedRef } from 'vue';
import type { TSelectMultipleProps } from '../../SelectMultiple';

/**
 * @description
 * Return type for the `useSelectMultipleActions` composable function.
 * Contains reactive properties and methods for SelectMultiple component functionality.
 */
export type TUseSelectMultipleActionsReturn = {
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
   * @param {TSelectMultipleProps["options"][0]} option - The option object to remove from selection.
   */
  removeLabel: (option: TSelectMultipleProps['options'][0]) => void;

  /**
   * Handles the selection or deselection of an option.
   *
   * @param {TSelectMultipleProps["options"][0]} option - The option object to select or deselect.
   */
  selectOptionHandler: (option: TSelectMultipleProps['options'][0]) => void;

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
   * @param {TSelectMultipleProps["options"][0]} item - The item object that was clicked.
   */
  onClickItem: (item: TSelectMultipleProps['options'][0]) => void;

  /**
   * A computed reference to a function that checks if a given option is currently selected.
   */
  isSelected: ComputedRef<(option: Record<string, any>) => boolean>;
};
