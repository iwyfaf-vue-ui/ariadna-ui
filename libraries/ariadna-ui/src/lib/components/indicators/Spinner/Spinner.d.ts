import type {
  TSharedPropsModifier,
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsSize,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { ESpinnerPropsDefault } from './types/Spinner.enums';

/**
 * Component props definition.
 */
export type TSpinnerProps = {
  /**
   * Predefined size variants for the spinner component.
   *
   * @type TSharedPropsSize
   * @default {@link ESpinnerPropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TSharedPropsSize;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link ESpinnerPropsDefault.CSS_CLASS}
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
export type TSpinnerSlots = {
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
export type TSpinnerEmits = {};

/**
 * Ariadna UI | Components | Indicators
 *
 * Spinner is a UI component that indicates an ongoing process, such as fetching data from a server or performing
 * complex computations.
 */
declare class Spinner extends ClassComponent<
  TSpinnerProps,
  TSpinnerSlots,
  TSpinnerEmits,
  HTMLElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Spinner: GlobalComponentConstructor<Spinner>;
  }
}

export default Spinner;
