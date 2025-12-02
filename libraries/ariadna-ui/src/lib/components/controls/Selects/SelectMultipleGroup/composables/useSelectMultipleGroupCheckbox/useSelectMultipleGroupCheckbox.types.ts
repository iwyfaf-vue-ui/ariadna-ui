import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useSelectMultipleGroupCheckbox` composable function.
 * Contains reactive properties and methods for SelectMultipleGroup component functionality.
 */
export type TUseSelectMultipleGroupCheckboxReturn = {
  /**
   * A computed ref that reflects the checked state of the multiselect checkbox.
   */
  multiselectCheckboxChecked: ComputedRef<boolean>;

  /**
   * Handler function to be called when the multiselect checkbox state changes.
   */
  onChangeMultiselectCheckbox: () => void;
};
