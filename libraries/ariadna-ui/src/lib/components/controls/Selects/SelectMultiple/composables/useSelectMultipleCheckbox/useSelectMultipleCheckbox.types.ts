import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useSelectMultipleCheckbox` composable function.
 * Contains reactive properties and methods for SelectMultiple component functionality.
 */
export type TUseSelectMultipleCheckboxReturn = {
  /**
   * A computed ref that reflects the checked state of the multiselect checkbox.
   */
  multiselectCheckboxChecked: ComputedRef<boolean>;

  /**
   * Handler function to be called when the multiselect checkbox state changes.
   */
  onChangeMultiselectCheckbox: () => void;
};
