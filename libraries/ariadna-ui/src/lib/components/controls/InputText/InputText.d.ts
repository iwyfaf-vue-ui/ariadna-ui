import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
  TSharedPropsSize,
} from '../../../../types/component';
import type { Nullable, Numberish } from '../../../../types/index';
import type { VNode } from 'vue';
import type { EInputTextPropsDefault } from './types/InputText.enums';
import type { TInputTextPropsType } from './types/InputText.types';

/**
 * Component props definition.
 */
export type TInputTextProps = {
  /**
   * Value of the component.
   *
   * @type Nullable<string>
   * @default null
   * @required
   * @example v-model="inputTextValue"
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
   * Input native type attribute.
   *
   * @type TInputTextPropsType
   * @default {@link EInputTextPropsDefault.TYPE}
   * @example type="text"
   * @example type="email"
   * @example type="tel"
   */
  type?: TInputTextPropsType;

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
   * Input native minlength attribute - defines the minimum string length that the user can enter into an `<input>`.
   *
   * @type Numberish
   * @default undefined
   * @example max-length="10"
   */
  minlength?: Numberish;

  /**
   * Input native maxlength attribute - defines the maximum string length that the user can enter into an `<input>`.
   *
   * @type Numberish
   * @default undefined
   * @example max-length="10"
   */
  maxlength?: Numberish;

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
   * @default {@link EInputTextPropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TSharedPropsSize;

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
   * @default {@link EInputTextPropsDefault.CSS_CLASS}
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
export type TInputTextSlots = {
  /**
   * Custom placeholder. If defined - `props.placeholder` will be ignored.
   * @returns {VNode[]}
   */
  placeholder?(): VNode[];

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
export type TInputTextEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {TInputTextProps["modelValue"]} payload - The new value of the input.
   */
  (e: 'update:model-value', payload: TInputTextProps['modelValue']): void;

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
 * Ariadna UI | Components | Controls
 *
 * InputText is a component of the HTML `<input>` element in the textual form with the possibility of flexible theming.
 */
declare class InputText extends ClassComponent<
  TInputTextProps,
  TInputTextSlots,
  TInputTextEmits,
  HTMLInputElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    InputText: GlobalComponentConstructor<InputText>;
  }
}

export default InputText;
