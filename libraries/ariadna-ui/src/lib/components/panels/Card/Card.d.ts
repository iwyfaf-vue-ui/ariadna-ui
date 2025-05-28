import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { TCardPropsSymbols, TCardPropsTag } from './types/Card.types';
import type { ECardPropsDefault } from './types/Card.enums';

/**
 * Component props definition.
 */
export type TCardProps = {
  /**
   * Component html root tag.
   *
   * @type TCardPropsTag
   * @default {@link ECardPropsDefault.TAG}
   * @example tag="a"
   * @example tag="article"
   */
  tag?: TCardPropsTag;

  /**
   * Setting up symbols to hide content.
   *
   * @type TCardPropsSymbols
   * @default undefined
   */
  symbols?: TCardPropsSymbols;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link ECardPropsDefault.CSS_CLASS}
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
export type TCardSlots = {
  /**
   * Slot for rendering a picture or image in the Card.
   *
   * @returns {VNode[]}
   */
  picture?(): VNode[];

  /**
   * Slot for rendering custom content in the header content section of the Card.
   *
   * @returns {VNode[]}
   */
  contentHeader?(): VNode[];

  /**
   * Slot for rendering the main content of the Card.
   *
   * @param {string | undefined} props.isCollapsed - Indicates whether the content is collapsed.
   * @param {number} props.toggleCollapsed - Function to toggle the collapsed state.
   * @returns {VNode[]}
   */
  content?(props: { isCollapsed: boolean; toggleCollapsed: () => void }): VNode[];

  /**
   * Slot for rendering content in the footer content section of the Card.
   *
   * @param {string | undefined} props.isCollapsed - Indicates whether the content is collapsed.
   * @param {number} props.toggleCollapsed - Function to toggle the collapsed state.
   * @returns {VNode[]}
   */
  contentFooter?(props: { isCollapsed: boolean; toggleCollapsed: () => void }): VNode[];

  /**
   * Slot for rendering the Card's footer.
   *
   * @returns {VNode[]}
   */
  footer?(): VNode[];
};

/**
 * Component events emitted.
 */
export type TCardEmits = {};

/**
 * Ariadna UI | Components | Card
 *
 * Card is a flexible container component.
 */
declare class Card extends ClassComponent<TCardProps, TCardSlots, TCardEmits, HTMLElement> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Card: GlobalComponentConstructor<Card>;
  }
}

export default Card;
