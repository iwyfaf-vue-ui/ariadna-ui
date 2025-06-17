import type { Ref, ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useMobileMenu` composable function.
 * Contains reactive properties and methods for MobileMenu component functionality.
 */
export type TUseMobileMenuReturn = {
  opened: Ref<boolean>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
  menuClasses: ComputedRef<{ [p: string]: any }>;
  backClasses: ComputedRef<{ [p: string]: any }>;
  open: () => void;
  toggle: () => void;
  close: () => void;
};
