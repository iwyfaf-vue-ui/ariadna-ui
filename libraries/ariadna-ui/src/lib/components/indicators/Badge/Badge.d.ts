import type {
  TSharedPropsModifier,
  ClassComponent,
  GlobalComponentConstructor,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { EBadgePropsDefault } from './types/Badge.enums';
import type { TBadgePropsSize } from './types/Badge.types';

/**
 * Component props definition.
 */
export type TBadgeProps = {
  /**
   * Predefined size variants for the badge component.
   *
   * @type TBadgePropsSize
   * @default {@link EBadgePropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TBadgePropsSize;

  /**
   * The badge displayed with the largest radius of curvature.
   *
   * @default false
   * @example :text="true"
   */
  rounded?: boolean;

  /**
   * Whether the badge should move to the upper right side relative to the parent element or not.
   *
   * @default false
   * @example :floating="true"
   */
  floating?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EBadgePropsDefault.CSS_CLASS}
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
export type TBadgeSlots = {
  /**
   * Default component slot.
   *
   * @returns {VNode[]}
   */
  default?(): VNode[];
};

/**
 * Component events emitted.
 */
export type TBadgeEmits = {};

/**
 * Ariadna UI | Components | Indicators
 *
 * Badge is a small status indicator for another element.
 */
declare class Badge extends ClassComponent<TBadgeProps, TBadgeSlots, TBadgeEmits, HTMLElement> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Badge: GlobalComponentConstructor<Badge>;
  }
}

export default Badge;
