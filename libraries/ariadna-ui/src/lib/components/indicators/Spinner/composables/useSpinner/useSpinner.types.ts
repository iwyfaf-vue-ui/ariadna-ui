import type { ComputedRef } from 'vue';

/**
 * @description Return type for the `useSpinner` composable function.
 * Contains reactive properties.
 */
export type TUseSpinnerReturn = {
  /**
   * @description Reactive computed property generating CSS class string based on component props (modifier, size,
   * states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
