import type { ClassComponent, GlobalComponentConstructor } from '../../../../../types/component';
import type { VNode } from 'vue';
import type { EAccordionItemPropsDefault } from './types/AccordionItem.enums';

/**
 * Component props definition.
 */
export type TAccordionItemProps = {
  /**
   * Opened state of AccordionItem.
   *
   * @type boolean
   * @default false
   * @example :opened="true"
   */
  opened?: boolean;

  /**
   * Disabled state of AccordionItem.
   *
   * @type boolean
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Aria-label for header.
   *
   * @type string
   * @default {@link EAccordionItemPropsDefault.ARIA_LABEL}
   * @example :opened="true"
   */
  ariaLabel?: string;
};

/**
 * Component slots definition.
 */
export type TAccordionItemSlots = {
  /**+
   * The default slot for rendering the main content of the AccordionItem.
   *
   * @returns {VNode[]}
   */
  default(): VNode[];

  /**
   * Slot for rendering the header content of the AccordionItem.
   *
   * @param {boolean} props.opened - A boolean that is true if the accordion item is expanded.
   * @returns {VNode[]}
   */
  header(props: { opened: boolean }): VNode[];

  /**
   * Slot for rendering the activator control of the AccordionItem.
   *
   * @param {boolean} props.opened - A boolean indicating if the accordion item is expanded.
   * @param {() => void} props.open - A function to open the accordion item.
   * @param {() => void} props.close - A function to close the accordion item.
   * @param {() => void} props.toggle - A function to toggle the accordion item's open state.
   * @returns {VNode[]}
   */
  activator(props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }): VNode[];
};

/**
 * Component events emitted.
 */
export type TAccordionItemEmits = {
  /**
   * Emitted when component value changes.
   * @param {"change"} e - The event name: 'change'.
   * @param {boolean} value - AccordionItem value.
   */
  (e: 'change', value: boolean): void;

  /**
   * Emitted when component gains focus.
   * @param {"focus"} e - The event name: 'focus'.
   * @param {Event} event - The focus event object.
   */
  (e: 'focus', event: Event): void;

  /**
   * Emitted when component loses focus.
   * @param {"blur"} e - The event name: 'blur'.
   * @param {Event} event - The blur event object.
   */
  (e: 'blur', event: Event): void;
};

/**
 * Component exposes.
 */
export type TAccordionItemExposes = {
  /**
   * Toggles the open/closed state of the AccordionItem.
   */
  toggle: () => void;

  /**
   * Opens the AccordionItem.
   */
  open: () => void;

  /**
   * Closes the AccordionItem.
   */
  close: () => void;
};

/**
 * Ariadna UI | Components | AccordionItem
 *
 * AccordionItem component is a child element of the Accordion component.
 */
declare class AccordionItem
  extends ClassComponent<
    TAccordionItemProps,
    TAccordionItemSlots,
    TAccordionItemEmits,
    HTMLDivElement
  >
  implements TAccordionItemExposes
{
  toggle: () => void;
  open: () => void;
  close: () => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    AccordionItem: GlobalComponentConstructor<AccordionItem>;
  }
}

export default AccordionItem;
