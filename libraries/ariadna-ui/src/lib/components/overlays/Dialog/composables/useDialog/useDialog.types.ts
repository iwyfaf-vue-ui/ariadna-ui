import type { ComputedRef, CSSProperties } from 'vue';

/**
 * @description
 * Return type for the `useDialog` composable function.
 * Contains reactive properties and methods for Dialog component functionality.
 */
export type TUseDialogReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Computed CSS properties for the draggable dialog element. Used to dynamically apply styles based on drag state.
   */
  draggableStyles: ComputedRef<CSSProperties>;

  /**
   * Toggles the maximized state of the dialog window.
   * @param {Event} event - The event that triggered the maximize toggle.
   */
  toggleMaximize: (event: Event) => void;

  /**
   * Requests to close the dialog, typically triggered by user interaction.
   *
   * @param {Event} event - The event that initiated the close request.
   */
  requestCloseDialog: (event: Event) => void;

  /**
   * Handles click events on the dialog overlay, often used to close the dialog when clicking outside.
   *
   * @param {Event} e - The click event on the overlay.
   */
  handleOverlayClick: (e: Event) => void;

  /**
   * Callback invoked after the dialog leave transition is completed.
   */
  onAfterLeave: () => void;
};
