import type {
  TSharedPropsModifier,
  ClassComponent,
  GlobalComponentConstructor,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { EButtonPropsDefault } from './types/Button.enums';

export type TButtonPropsTag = 'button' | 'span' | 'a';
export type TButtonPropsType = 'button' | 'submit' | 'reset';
export type TButtonPropsIconPosition = 'left' | 'right' | 'top' | 'bottom';
export type TButtonPropsSize = 'small' | 'medium' | 'large';

/**
 * Component props definition.
 */
export type TButtonProps = {
  /**
   * The HTML tag to be rendered as the button component.
   *
   * @example tag="button"
   * @example tag="span"
   * @example tag="a"
   * @default 'button'
   */
  tag?: TButtonPropsTag;

  /**
   * Specifies the type of button when rendered as a `<button>` element. Determines the default behavior of the button
   * in forms and interactions.
   *
   * @example type="button"
   * @example type="submit"
   * @example type="reset"
   * @default 'button'
   */
  type?: TButtonPropsType;

  /**
   * Position of the icon relative to the button text.
   *
   * @example icon-position="left"
   * @example icon-position="right"
   * @example icon-position="top"
   * @example icon-position="bottom"
   * @default 'left'
   */
  iconPosition?: TButtonPropsIconPosition;

  /**
   * Predefined size variants for the button component.
   *
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   * @default 'medium'
   */
  size?: TButtonPropsSize;

  /**
   * The buttons are displayed with the largest radius of curvature.
   *
   * @example :text="true"
   * @default false
   */
  rounded?: boolean;

  /**
   * The buttons are displayed as textual elements.
   *
   * @example :text="true"
   * @default false
   */
  textual?: boolean;

  /**
   * Outlined buttons display a border with a transparent background.
   *
   * @example :text="true"
   * @default false
   */
  outlined?: boolean;

  /**
   * Selected / active state.
   *
   * @example :selected="true"
   * @default false
   */
  selected?: boolean;

  /**
   * Disabled state.
   *
   * @example :disabled="true"
   * @default false
   */
  disabled?: boolean;

  /**
   * Loading state.
   *
   * @example :disabled="true"
   * @default false
   */
  loading?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @example css-class="example"
   * @default {@link EButtonPropsDefault.CSS_CLASS}
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
export type TButtonSlots = {
  /**
   * Default component slot.
   *
   * @returns {VNode[]}
   */
  default?(): VNode[];

  /**
   * Custom button icon.
   *
   * @returns {VNode[]}
   */
  icon?(): VNode[];

  /**
   * Custom button label
   *
   * @returns {VNode[]}
   */
  loading?(): VNode[];
};

/**
 * Component events emitted.
 */
export type TButtonEmits = {
  /**
   * Native mouse click event.
   *
   * @param {"click"} e - Event emitted when button is clicked
   * @param {MouseEvent} event - The native mouse event associated with the click.
   */
  (e: 'click', event: MouseEvent): void;
};

/**
 * Ariadna UI | Components | Buttons
 *
 * A highly configurable UI button component.
 */
declare class Button extends ClassComponent<
  TButtonProps,
  TButtonSlots,
  TButtonEmits,
  HTMLButtonElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Button: GlobalComponentConstructor<Button>;
  }
}

export default Button;
