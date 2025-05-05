import type { ComputedRef, Ref } from 'vue';

/**
 * @description Return type for the `usePreviewer` composable function.
 * Contains reactive properties.
 */
export type TUsePreviewerReturn = {
  /**
   * Reactive reference indicating whether the code has been copied to the clipboard.
   */
  isCopied: Ref<boolean, boolean>;

  /**
   * Reactive computed property controlling the visibility of the code preview.
   */
  showCode: ComputedRef<boolean>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Toggles the visibility of the code preview.
   */
  toggleCode: () => void;

  /**
   * Handles the copy-to-clipboard action for the code preview.
   * @returns {Promise<void>}
   */
  handleCopy: () => Promise<void>;

  /**
   * Handler for the start of the expand transition.
   * @param el Element being expanded
   */
  onExpandEnter: (el: Element) => void;

  /**
   * Handler for after the expand transition has completed.
   * @param el Element that finished expanding
   */
  onExpandAfterEnter: (el: Element) => void;

  /**
   * Handler for before the collapse transition starts.
   * @param el Element being collapsed
   */
  onExpandBeforeLeave: (el: Element) => void;
};
