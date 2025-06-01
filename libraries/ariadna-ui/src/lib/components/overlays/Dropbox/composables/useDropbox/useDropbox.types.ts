import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useDropbox` composable function.
 * Contains reactive properties and methods for Dropbox component functionality.
 */
export type TUseDropboxReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Reactive computed reference to an object mapping CSS class names to boolean values, used to dynamically apply
   * classes to the Dropbox content.
   */
  contentClasses: ComputedRef<{ [p: string]: boolean }>;

  /**
   * Opens the Dropbox.
   */
  open: () => Promise<void>;

  /**
   * Closes the Dropbox.
   */
  close: () => void;

  /**
   * Toggles the Dropbox's open/closed state.
   */
  toggle: () => Promise<void>;

  /**
   * Calculate Dropbox's position.
   */
  calculate: () => void;

  /**
   * Closes the Dropbox when click was outside.
   */
  closeOnClickOutside: () => void;

  /**
   * Closes the Dropbox when the Escape key is pressed.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered by the user's key press.
   */
  closeOnEscKey: (event: KeyboardEvent) => void;
};
