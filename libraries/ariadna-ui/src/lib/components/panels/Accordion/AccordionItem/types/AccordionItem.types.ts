import type { Ref } from 'vue';

/**
 * Represents a single item within an accordion component. This type defines the structure and behavior of an accordion
 * item.
 */
export type TAccordionItem = {
  /**
   * Unique identifier for the accordion item.
   */
  id: string;

  /**
   * Reactive reference indicating whether the accordion item is opened.
   */
  opened: Ref<boolean>;

  /**
   * Toggles the open state of the accordion item.
   */
  toggle: () => void;

  /**
   * Opens the accordion item.
   */
  open: () => void;

  /**
   * Closes the accordion item.
   */
  close: () => void;

  /**
   * Sets focus on the accordion item.
   */
  focus: () => void;
};

/**
 * Represents a reactive reference to an array of accordion item objects.
 *
 * This type supports two possible underlying array types:
 * - An array of accordion items with explicit method implementations.
 * - A generic `TAccordionItem` array (presumably defined elsewhere).
 */
export type TAccordionItems = Ref<
  {
    id: string;
    opened: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
    focus: () => void;
  }[],
  | TAccordionItem[]
  | {
      id: string;
      opened: boolean;
      toggle: () => void;
      open: () => void;
      close: () => void;
      focus: () => void;
    }[]
>;
