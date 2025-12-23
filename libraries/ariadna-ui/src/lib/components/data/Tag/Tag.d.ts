import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
  TSharedPropsSize,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { ETagPropsDefault } from './types/Tag.enums';

/**
 * Component props definition.
 */
export type TTagProps = {
  /**
   * Defines which html element will be used as the root element.
   *
   * @type 'div' | 'span' | 'button' | 'a'
   * @default {@link ETagPropsDefault.TAG}
   * @example tag="a"
   */
  tag?: 'div' | 'span' | 'button' | 'a';

  /**
   * Predefined size variants for the component.
   *
   * @type TSharedPropsSize
   * @default {@link ETagPropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TSharedPropsSize;

  /**
   * The tag displayed with the largest radius of curvature.
   *
   * @default false
   * @example :text="true"
   */
  rounded?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link ETagPropsDefault.CSS_CLASS}
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
export type TTagSlots = {
  /**
   * Slot for rendering default component content.
   *
   * @returns {VNode[]}
   */
  default?(): VNode[];

  /**
   * Slot for rendering component icon.
   *
   * @returns {VNode[]}
   */
  icon?(): VNode[];
};

/**
 * Component events emitted.
 */
export type TTagEmits = {};

/**
 * Ariadna UI | Components | Tag
 *
 * Tag component is used to categorize content.
 */
declare class Tag extends ClassComponent<TTagProps, TTagSlots, TTagEmits, HTMLDivElement> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Tag: GlobalComponentConstructor<Tag>;
  }
}

export default Tag;
