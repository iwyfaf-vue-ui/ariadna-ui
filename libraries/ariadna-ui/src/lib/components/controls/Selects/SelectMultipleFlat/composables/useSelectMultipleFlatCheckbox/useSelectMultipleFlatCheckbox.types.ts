import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useSelectMultipleFlatCheckbox` composable function.
 * Contains reactive properties and methods for SelectMultipleFlat component functionality.
 */
export type TUseSelectMultipleFlatCheckboxReturn = {
  /**
   * A computed ref that reflects the checked state of the multiselect checkbox.
   */
  multiselectCheckboxChecked: ComputedRef<boolean>;

  /**
   * Handler function to be called when the multiselect checkbox state changes.
   */
  onChangeMultiselectCheckbox: () => void;
};
