import type {
  TSharedPropsModifier,
  ClassComponent,
  GlobalComponentConstructor,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { EBadgePropsDefault } from './types/Badge.enums';

export type TBadgePropsSize = 'small' | 'medium' | 'large';

/**
 * Component props definition.
 */
export type TBadgeProps = {
  /**
   * Predefined size variants for the badge component.
   *
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   * @default 'medium'
   */
  size?: TBadgePropsSize;

  /**
   * The badge displayed with the largest radius of curvature.
   *
   * @example :text="true"
   * @default false
   */
  rounded?: boolean;

  /**
   * Whether the badge should move to the upper right side relative to the parent element or not.
   *
   * @example :floating="true"
   * @default false
   */
  floating?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @example css-class="example"
   * @default {@link EBadgePropsDefault.CSS_CLASS}
   */
  cssClass?: string;

  /**
   * Modifier of the basic CSS class.
   *
   * @example modifier="primary"
   * @default undefined
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
declare class Badge extends ClassComponent<
  TBadgeProps,
  TBadgeSlots,
  TBadgeEmits,
  HTMLButtonElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Badge: GlobalComponentConstructor<Badge>;
  }
}

export default Badge;
