import type {
  TSharedPropsModifier,
  ClassComponent,
  GlobalComponentConstructor,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { ESpinnerPropsDefault } from './types/Spinner.enums';

export type TSpinnerPropsSize = 'small' | 'medium' | 'large';

/**
 * @description Component props definition.
 */
export type TSpinnerProps = {
  /**
   * @description Predefined size variants for the spinner component.
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   * @default 'medium'
   */
  size?: TSpinnerPropsSize;

  /**
   * @description Redefines the CSS class of the root element and its descendants.
   * @example css-class="example"
   * @default {@link ESpinnerPropsDefault.CSS_CLASS}
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
export type TSpinnerSlots = {
  /**
   * @description Default component slot.
   * @returns {VNode[]}
   */
  default?(): VNode[];
};

/**
 * @description Component events emitted.
 */
export type TSpinnerEmits = {};

/**
 * Ariadna UI | Components | Indicators
 *
 * @description Spinner is a UI component that indicates an ongoing process, such as fetching data from a server or
 * performing complex computations.
 */
declare class Spinner extends ClassComponent<
  TSpinnerProps,
  TSpinnerSlots,
  TSpinnerEmits,
  HTMLButtonElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Spinner: GlobalComponentConstructor<Spinner>;
  }
}

export default Spinner;
