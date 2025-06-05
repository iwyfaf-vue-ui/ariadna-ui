import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../../types/component';
import type { VNode } from 'vue';
import type { EAccordionPropsDefault } from './types/Accordion.enums';

/**
 * Component props definition.
 */
export type TAccordionProps = {
  /**
   * Allows you to open no more than 1 AccordionItem, otherwise as many as you want.
   *
   * @type boolean
   * @default false
   * @example :single-mode="true"
   */
  singleMode?: boolean;

  /**
   * All AccordionItem are open by default.
   *
   * @type boolean
   * @default false
   * @example :opened="true"
   */
  opened?: boolean;

  /**
   * Clickable header area for all AccordionItem.
   *
   * @type boolean
   * @default true
   * @example :clickable-header="true"
   */
  clickableHeader?: boolean;

  /**
   * Disabled state. All the elements of the AccordionItem inherit it.
   *
   * @type boolean
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EAccordionPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;

  /**
   * Modifier of the basic CSS class.
   *
   * @type TSharedPropsModifier
   * @default undefined
   * @example modifier="primary"
   */
  modifier?: TSharedPropsModifier;
};

/**
 * Component slots definition.
 */
export type TAccordionSlots = {
  /**
   * The default slot. It should mainly be used to place the components of the AccordionItem.
   *
   * @returns {VNode[]}
   */
  default(): VNode[];
};

/**
 * Component events emitted.
 */
export type TAccordionEmits = {};

/**
 * Component exposes.
 */
export type TAccordionExposes = {
  /**
   * Open all AccordionItem.
   */
  openAll: () => void;

  /**
   * Close all AccordionItem.
   */
  closeAll: () => void;

  /**
   * Update opened state of selected AccordionItem.
   *
   * @param {number} index - Index of AccordionItem item.
   * @param {boolean} value - New state for AccordionItem item.
   */
  updateBy: (index: number, value: boolean) => void;
};

/**
 * Ariadna UI | Components | Accordion
 *
 * Accordion component is a container to group collection of contents in panels.
 */
declare class Accordion
  extends ClassComponent<TAccordionProps, TAccordionSlots, TAccordionEmits, HTMLDivElement>
  implements TAccordionExposes
{
  openAll: () => void;
  closeAll: () => void;
  updateBy: (index: number, value: boolean) => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Accordion: GlobalComponentConstructor<Accordion>;
  }
}

export default Accordion;
