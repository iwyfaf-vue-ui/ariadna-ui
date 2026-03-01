import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `usePanel` composable function.
 * Contains reactive properties and methods for Panel component functionality.
 */
export type TUsePanelReturn = {
  /**
   * Computed object containing event listeners for some events. Each listener is a function that receives the
   * corresponding DOM event.
   */
  listeners: ComputedRef<{
    /**
     * Handler for the mouseover event.
     */
    mouseover: () => void;

    /**
     * Handler for the mouseleave event.
     */
    mouseleave: () => void;
  }>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
