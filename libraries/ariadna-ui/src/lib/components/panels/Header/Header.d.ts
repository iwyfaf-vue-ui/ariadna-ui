import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { THeaderPropsTag } from './types/Header.types';
import type { EHeaderPropsDefault } from './types/Header.enums';

/**
 * Component props definition.
 */
export type THeaderProps = {
  /**
   * The HTML tag to be rendered as the Header component.
   *
   * @type THeaderPropsTag
   * @default {@link EHeaderPropsDefault.TAG}
   * @example tag="button"
   * @example tag="span"
   * @example tag="a"
   */
  tag?: THeaderPropsTag;

  /**
   * The threshold in pixels for scrolling, below which the `--scroll` modifier is added to the component.
   *
   * @type number
   * @default undefined
   * @required
   * @example :scroll-threshold="150"
   */
  scrollThreshold?: number;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EHeaderPropsDefault.CSS_CLASS}
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
export type THeaderSlots = {
  /**
   * Slot for rendering the logo.
   *
   * @returns {VNode[]}
   */
  logo?(): VNode[];

  /**
   * Slot for rendering the component title.
   *
   * @returns {VNode[]}
   */
  title?(): VNode[];

  /**
   * Slot for rendering the component subtitle.
   *
   * @returns {VNode[]}
   */
  subtitle?(): VNode[];

  /**
   * Slot for rendering the main part of the component.
   *
   * @returns {VNode[]}
   */
  default?(): VNode[];

  /**
   * Slot for rendering the right side of the component.
   *
   * @returns {VNode[]}
   */
  right?(): VNode[];
};

/**
 * Component events emitted.
 */
export type THeaderEmits = {
  /**
   * Emitted when scrolling above or below the set threshold in props scrollThreshold
   *
   * @param {"scrolled"} e - The event name: 'scrolled'.
   * @param {boolean} payload - Indicates whether the current scroll position has crossed the scrollThreshold (true) or is within/returned below it (false).
   */
  (e: 'scrolled', payload: boolean): void;
};

/**
 * Ariadna UI | Components | Header
 *
 * Header component is used to design the upper area of the interface.
 */
declare class Header extends ClassComponent<
  THeaderProps,
  THeaderSlots,
  THeaderEmits,
  HTMLDivElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Header: GlobalComponentConstructor<Header>;
  }
}

export default Header;
