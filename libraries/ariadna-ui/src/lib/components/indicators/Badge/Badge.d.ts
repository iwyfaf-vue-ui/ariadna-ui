import type {
  TSharedPropsModifier,
  ClassComponent,
  GlobalComponentConstructor,
} from '../../../../types/component';
import type { VNode } from 'vue';

export type TBadgePropsSize = 'small' | 'medium' | 'large';

/**
 * @description Component props definition.
 */
export type TBadgeProps = {
  /**
   * @description Predefined size variants for the badge component.
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   * @default 'medium'
   */
  size?: TBadgePropsSize;

  /**
   * @description The badge are displayed with the largest radius of curvature.
   * @example :text="true"
   * @default false
   */
  rounded?: boolean;

  /**
   * @description Whether the badge should move to the upper right side relative to the parent element or not.
   * @example :floating="true"
   * @default false
   */
  floating?: boolean;

  /**
   * @description Redefines the CSS class of the root element and its descendants.
   * @example css-class="example"
   * @default 'ar-button'
   */
  cssClass?: string;

  /**
   * @description Modifier of the basic CSS class.
   * @example modifier="primary"
   * @default undefined
   */
  modifier?: TSharedPropsModifier;
};

/**
 * @description Component slots definition.
 */
export type TBadgeSlots = {
  /**
   * @description Default component slot.
   * @returns {VNode[]}
   */
  default?(): VNode[];
};

/**
 * @description Component events emitted.
 */
export type TBadgeEmits = {};

/**
 * Ariadna UI | Components | Indicators
 *
 * @description Badge is a small status indicator for another element.
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
