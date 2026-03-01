/**
 * Represents the payload of a Panel toggle event.
 */
export type TPanelToggleEvent = {
  /**
   * The original DOM event that triggered the panel toggle action.
   */
  originalEvent: Event;

  /**
   * Collapsed state as a boolean
   */
  value: boolean;
};
