import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useInputPasswordMeterPanel` composable function.
 * Contains reactive properties and methods for InputPassword component functionality.
 */
export type TUseInputPasswordMeterPanelReturn = {
  /**
   * Opens the password meter panel, making it visible to the user (e.g., on input focus).
   */
  openMeterPanel: () => void;

  /**
   * Closes the password meter panel, hiding it from the user (e.g., on input blur).
   */
  closeMeterPanel: () => void;

  /**
   * Reactive class map for the meter panel container. Use it with :class binding to toggle CSS classes depending on
   * the panel state.
   */
  meterPanelClasses: ComputedRef<{
    [p: string]: boolean;
  }>;
};
