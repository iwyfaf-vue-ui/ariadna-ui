import type { Ref } from 'vue';

/**
 * Represents the return type of the `useFocusBlur` composable, providing both a delayed reactive value and its
 * immediate counterpart.
 */
export type TUseFocusBlurReturn = {
  /**
   * A Vue ref indicating whether the element is currently focused.
   */
  isFocused: Ref<boolean, boolean>;

  /**
   * Handler function to be called when the element gains focus.
   */
  onFocus: () => void;

  /**
   * Handler function to be called when the element loses focus.
   */
  onBlur: () => void;
};
