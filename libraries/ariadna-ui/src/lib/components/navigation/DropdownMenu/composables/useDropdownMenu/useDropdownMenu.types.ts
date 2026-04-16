import type { ComputedRef, Ref } from 'vue';

/**
 * Return type for the `useDropdownMenu` composable.
 */
export type TUseDropdownMenuReturn = {
  /**
   * Whether the dropdown list is currently visible.
   */
  isOpen: Ref<boolean>;

  /**
   * Opens the dropdown menu and recalculates its flip position.
   */
  open: () => void;

  /**
   * Closes the dropdown menu.
   */
  close: () => void;

  /**
   * Toggles the dropdown menu open/closed.
   */
  toggle: () => void;

  /**
   * BEM CSS class string for the root element.
   */
  componentClasses: ComputedRef<string>;

  /**
   * BEM CSS class string for the dropdown list element.
   */
  listClasses: ComputedRef<string>;

  /**
   * Handler for click-outside events — closes the menu when `closeOnClickOutside` is true.
   */
  closeOnClickOutside: () => void;

  /**
   * Handler for keydown events — closes the menu on Escape when `closeOnEscape` is true.
   */
  closeOnEscKey: (event: KeyboardEvent) => void;
};
