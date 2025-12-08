import type { ComputedRef } from 'vue';
import type { TSelectMultipleFlatProps } from '../../SelectMultipleFlat';
import type { Primitive } from '@/types';

/**
 * @description
 * Return type for the `useSelectMultipleFlatActions` composable function.
 * Contains reactive properties and methods for SelectMultipleFlat component functionality.
 */
export type TUseSelectMultipleFlatActionsReturn = {
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
   * @param {Primitive} option - The option object to remove from selection.
   */
  removeLabel: (option: Primitive) => void;

  /**
   * Handles the selection or deselection of an option.
   *
   * @param {TSelectMultipleFlatProps["options"][0]} option - The option object to select or deselect.
   */
  selectOptionHandler: (option: TSelectMultipleFlatProps['options'][0]) => void;

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
   * @param {Primitive} item - The item object that was clicked.
   */
  onClickItem: (item: Primitive) => void;

  /**
   * A computed reference to a function that checks if a given option is currently selected.
   */
  isSelected: ComputedRef<(option: Primitive) => boolean>;
};
