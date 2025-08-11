import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useVideo` composable function.
 * Contains reactive properties and methods for Video component functionality.
 */
export type TUseVideoReturn = {
  /**
   * Computed unique identifier for the component instance.
   */
  uniqueID: ComputedRef<string>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
