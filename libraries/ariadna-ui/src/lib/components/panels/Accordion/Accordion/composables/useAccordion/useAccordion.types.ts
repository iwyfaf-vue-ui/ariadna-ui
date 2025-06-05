import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useAccordion` composable function.
 * Contains reactive properties and methods for Accordion component functionality.
 */
export type TUseAccordionReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Updates the open/closed state of a specific accordion item by its identifier.
   *
   * @param {string} id - The unique identifier of the accordion item to update.
   * @param {boolean} value - The new state of the accordion item; true for open, false for closed.
   */
  updateAccordion: (id: string, value: boolean) => void;

  /**
   * Opens all accordion items.
   */
  openAll: () => void;

  /**
   * Closes all accordion items.
   */
  closeAll: () => void;

  /**
   * Updates the open/closed state of an accordion item by its index.
   *
   * @param {number} index - The zero-based index of the accordion item to update.
   * @param {boolean} value - Optional new state; if omitted, toggles the current state.
   */
  updateBy: (index: number, value?: boolean) => void;
};
