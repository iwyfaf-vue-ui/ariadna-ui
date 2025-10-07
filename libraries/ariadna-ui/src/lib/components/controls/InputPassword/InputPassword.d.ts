import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
  TSharedPropsSize,
} from '../../../../types/component';
import type { Nullable } from '../../../../types/index';
import type { VNode } from 'vue';
import type { EInputPasswordPropsDefault } from './types/InputPassword.enums';
export type { TInputPasswordRuleItem } from './types/InputPassword.types';

/**
 * Component props definition.
 */
export type TInputPasswordProps = {
  /**
   * Value of the component.
   *
   * @type Nullable<string>
   * @default null
   * @required
   * @example v-model="inputPasswordValue"
   */
  modelValue: Nullable<string>;

  /**
   * Input label text.
   *
   * @type string
   * @default undefined
   * @example label="Associated label"
   */
  label?: string;

  /**
   * Input native id attribute.
   *
   * @type string
   * @default Random generated string by using Vue 3.5 useId() helper.
   * @see https://vuejs.org/api/composition-api-helpers.html#useid
   * @example id="custom-id"
   */
  id?: string;

  /**
   * Input placeholder. Will be ignored if placeholder slot is defined.
   *
   * @type string
   * @default undefined
   * @example placeholder="Placeholder from props"
   */
  placeholder?: string;

  /**
   * Input native name attribute.
   *
   * @type string
   * @default undefined
   * @example name="username"
   */
  name?: string;

  /**
   * Input native autocomplete attribute.
   *
   * @type boolean
   * @default false
   * @example :autocomplete="true"
   */
  autocomplete?: boolean;

  /**
   * Input native disabled attribute.
   *
   * @type boolean
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Input native readonly attribute.
   *
   * @type boolean
   * @default false
   * @example :readonly="true"
   */
  readonly?: boolean;

  /**
   * Predefined size variants for the component.
   *
   * @type TSharedPropsSize
   * @default {@link EInputPasswordPropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TSharedPropsSize;

  /**
   * Displays the password without masking.
   *
   * @type boolean
   * @default false
   * @example :show-password="true"
   */
  showPassword?: boolean;

  /**
   * Whether to show the password visibility toggle button or not.
   *
   * @type boolean
   * @default false
   * @example :show-password-toggle="true"
   */
  showPasswordToggle?: boolean;

  /**
   * An array of objects with rules for password verification (for example, minimum length, presence of special
   * characters, numbers, etc.). The format of objects depends on the implementation. It often contains the fields
   * `test` (RegExp or validation function) and message.
   *
   * @type {Array<TInputPasswordRuleItem>}
   * @default []
   */
  rules?: Array<TInputPasswordRuleItem>;

  /**
   * Input valid state.
   *
   * @type boolean
   * @default false
   * @example :valid="true"
   */
  valid?: boolean;

  /**
   * Input invalid state.
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
   * @default {@link EInputPasswordPropsDefault.CSS_CLASS}
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
export type TInputPasswordSlots = {
  /**
   * Custom placeholder. If defined - `props.placeholder` will be ignored.
   *
   * @returns {VNode[]}
   */
  placeholder?(): VNode[];

  /**
   * Used to customize the password visibility toggle button.
   *
   * @param {hidden: boolean} props.visible - State of toggle button.
   * @returns {VNode[]}
   */
  toggleButton?(props: { visible: boolean }): VNode[];

  /**
   * Used to fully control the output of password complexity meter for the user.
   *
   * @param {number} props.percentage - The calculated percentage of difficulty (0-100), calculated either inside the
   * component or based on the rules' logic.
   * @param {string} props.cssClass - Current main CSS class of the component.
   * @returns {VNode[]}
   */
  meter?(props: { percentage: number; cssClass: string }): VNode[];

  /**
   * Used to fully control only the text of the password complexity meter for the user.
   *
   * @param {number} props.percentage - The calculated percentage of difficulty (0-100), calculated either inside the
   * component or based on the rules' logic.
   * @returns {VNode[]}
   */
  meterLabel?(props: { percentage: number }): VNode[];

  /**
   * Used for custom display of messages of unfulfilled conditions.
   *
   * @param {number} props.percentage - The calculated percentage of difficulty (0-100), calculated either inside the
   * component or based on the rules' logic.
   * @param {Array<TInputPasswordRuleItem>} props.conditionsNotComplete - List of not completed rules.
   * @returns {VNode[]}
   */
  conditionsNotMet?(props: {
    percentage: number;
    conditionsNotComplete: Array<TInputPasswordRuleItem>;
  }): VNode[];

  /**
   * Component error messages.
   *
   * @param {Array<string>} props.errors - An array of component error messages.
   * @returns {VNode[]}
   */
  errors?(props: { errors: Array<string> }): VNode[];
};

/**
 * Component events emitted.
 */
export type TInputPasswordEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {TInputPasswordProps['modelValue']} payload - The new value of the InputPassword component.
   */
  (e: 'update:model-value', payload: TInputPasswordProps['modelValue']): void;

  /**
   * Emitted when component gains focus.
   *
   * @param {"focus"} e - The event name: 'focus'.
   * @param {Event} event - The focus event object.
   */
  (e: 'focus', event: Event): void;

  /**
   * Emitted when component is blur.
   *
   * @param {"blur"} e - The event name: 'blur'.
   * @param {Event} event - The blur event object.
   */
  (e: 'blur', event: Event): void;

  /**
   * Emitted when component value changes.
   *
   * @param {"change"} e - The event name: 'change'.
   * @param {Event} event - The change event object.
   */
  (e: 'change', event: Event): void;
};

/**
 * Ariadna UI | Components | Controls
 *
 * InputPassword is an input component to provide password input with password strength indicator.
 */
declare class InputPassword extends ClassComponent<
  TInputPasswordProps,
  TInputPasswordSlots,
  TInputPasswordEmits,
  HTMLInputElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    InputPassword: GlobalComponentConstructor<InputPassword>;
  }
}

export default InputPassword;
