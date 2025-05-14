import type {
  TSharedPropsModifier,
  ClassComponent,
  GlobalComponentConstructor,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { EButtonPropsDefault } from './types/Button.enums';
import type {
  TButtonPropsIconPosition,
  TButtonPropsSize,
  TButtonPropsTag,
  TButtonPropsType,
} from './types/Button.types';

/**
 * Component props definition.
 */
export type TButtonProps = {
  /**
   * The HTML tag to be rendered as the button component.
   *
   * @type TButtonPropsTag
   * @default {@link EButtonPropsDefault.TAG}
   * @example tag="button"
   * @example tag="span"
   * @example tag="a"
   */
  tag?: TButtonPropsTag;

  /**
   * Specifies the type of button when rendered as a `<button>` element. Determines the default behavior of the button
   * in forms and interactions.
   *
   * @type TButtonPropsType
   * @default {@link EButtonPropsDefault.TYPE}
   * @example type="button"
   * @example type="submit"
   * @example type="reset"
   */
  type?: TButtonPropsType;

  /**
   * Position of the icon relative to the button text.
   *
   * @type TButtonPropsIconPosition
   * @default {@link EButtonPropsDefault.ICON_POSITION}
   * @example icon-position="left"
   * @example icon-position="right"
   * @example icon-position="top"
   * @example icon-position="bottom"
   */
  iconPosition?: TButtonPropsIconPosition;

  /**
   * Predefined size variants for the button component.
   *
   * @type TButtonPropsSize
   * @default {@link EButtonPropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TButtonPropsSize;

  /**
   * The buttons are displayed with the largest radius of curvature.
   *
   * @default false
   * @example :text="true"
   */
  rounded?: boolean;

  /**
   * The buttons are displayed as textual elements.
   *
   * @default false
   * @example :text="true"
   */
  textual?: boolean;

  /**
   * Outlined buttons display a border with a transparent background.
   *
   * @default false
   * @example :text="true"
   */
  outlined?: boolean;

  /**
   * Selected / active state.
   *
   * @default false
   * @example :selected="true"
   */
  selected?: boolean;

  /**
   * Disabled state.
   *
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Loading state.
   *
   * @default false
   * @example :disabled="true"
   */
  loading?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EButtonPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;

  /**
   * Modifier of the basic CSS class.
   *
   * @default undefined
   * @example modifier="primary"
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
