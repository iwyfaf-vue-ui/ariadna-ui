import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
  TSharedPropsSize,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { TCheckboxPropsPosition } from './types/Checkbox.types';
import type { ECheckboxPropsDefault } from './types/Checkbox.enums';

/**
 * Component props definition.
 */
export type TCheckboxProps = {
  /**
   * Value of the component.
   *
   * @type boolean
   * @default false
   * @required
   * @example v-model="checkboxValue"
   */
  modelValue: boolean;

  /**
   * Checkbox native id attribute.
   *
   * @type string
   * @default Random generated string by using Vue 3.5 useId() helper.
   * @see https://vuejs.org/api/composition-api-helpers.html#useid
   * @example id="custom-id"
   */
  id?: string;

  /**
   * Checkbox native name attribute.
   *
   * @type string
   * @default undefined
   * @example name="username"
   */
  name?: string;

  /**
   * Checkbox native disabled attribute.
   *
   * @type boolean
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Predefined size variants for the component.
   *
   * @type TSharedPropsSize
   * @default {@link ECheckboxPropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TSharedPropsSize;

  /**
   * The position of the checkbox relative to its content.
   *
   * @type TCheckboxPropsPosition
   * @default undefined
   * @example position="right"
   */
  position?: TCheckboxPropsPosition;

  /**
   * Custom checkbox implementation.
   *
   * @type boolean
   * @default false
   * @example :custom="true"
   */
  custom?: boolean;

  /**
   * Checkbox valid state.
   *
   * @type boolean
   * @default false
   * @example :valid="true"
   */
  valid?: boolean;

  /**
   * Checkbox invalid state.
   *
   * @type boolean
   * @default false
   * @example :invalid="true"
   */
  invalid?: boolean;

  /**
   * An array of component error messages.
   *
   * @type Array<string>
   * @default []
   * @example :errors="['First error', 'Second error']"
   */
  errors?: Array<string>;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link ECheckboxPropsDefault.CSS_CLASS}
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

  /**
   * aria-label attribute for better accessibility.
   *
   * @type string
   * @default undefined
   * @example aria-label="foo"
   */
  ariaLabel?: string;
};

/**
 * Component slots definition.
 */
export type TCheckboxSlots = {
  /**
   * Default component slot.
   * @returns {VNode[]}
   */
  default?(): VNode[];

  /**
   * Custom checkbox implementation.
   * @returns {VNode[]}
   */
  custom?(): VNode[];

  /**
   * Component error messages.
   *
   * @param {boolean} props.errors - An array of component error messages.
   * @returns {VNode[]}
   */
  errors?(props: { errors: Array<string> }): VNode[];
};

/**
 * Component events emitted.
 */
export type TCheckboxEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {TCheckboxProps["modelValue"]} payload - The new value of the checkbox.
   */
  (e: 'update:model-value', payload: TCheckboxProps['modelValue']): void;

  /**
   * Emitted when component gains focus.
   * @param {"focus"} e - The event name: 'focus'.
   * @param {Event} event - The focus event object.
   */
  (e: 'focus', event: Event): void;

  /**
   * Emitted when component loses focus.
   * @param {"blur"} e - The event name: 'blur'.
   * @param {Event} event - The blur event object.
   */
  (e: 'blur', event: Event): void;

  /**
   * Emitted when component value changes.
   * @param {"change"} e - The event name: 'change'.
   * @param {Event} event - The change event object.
   */
  (e: 'change', event: Event): void;
};

/**
 * Ariadna UI | Components | Checkbox
 *
 * Checkbox component is an extended implementation of the form element `<input type="checkbox">`.
 */
declare class Checkbox extends ClassComponent<
  TCheckboxProps,
  TCheckboxSlots,
  TCheckboxEmits,
  HTMLInputElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Checkbox: GlobalComponentConstructor<Checkbox>;
  }
}

export default Checkbox;
