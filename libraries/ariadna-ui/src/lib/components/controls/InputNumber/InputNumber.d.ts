import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
  TSharedPropsSize,
} from '../../../../types/component';
import type { Nullable, Numberish } from '../../../../types/index';
import type { VNode } from 'vue';
import type { EInputNumberPropsDefault } from './types/InputNumber.enums';
import type { TBcpLanguageTags } from '../../../../types/locales/bcp-language-tags.types';
export type { TInputNumberEmitStepPayload } from './types/InputNumber.types';

/**
 * Component props definition.
 */
export type TInputNumberProps = {
  /**
   * Value of the component.
   *
   * @type Nullable<number>
   * @required
   * @example v-model="inputNumberValue"
   */
  modelValue: Nullable<number>;

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
   * Displays controls for managing increment & decrement value operations.
   *
   * @type boolean
   * @default false
   * @example :controls="true"
   */
  controls?: boolean;

  /**
   * Predefined size variants for the component.
   *
   * @type TSharedPropsSize
   * @default {@link EInputNumberPropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TSharedPropsSize;

  /**
   * Input min value.
   *
   * @type number
   * @default undefined
   * @example :min="0"
   */
  min?: number;

  /**
   * Input max value.
   *
   * @type number
   * @default undefined
   * @example :max="10"
   */
  max?: number;

  /**
   * Step factor to increased or decreased the value. Can be an integer or decimal.
   *
   * @type Numberish
   * @default {@link EInputNumberPropsDefault.STEP}
   * @example step="5"
   */
  step?: Numberish;

  /**
   * Default value of `<input>` element when no value present.
   *
   * @type string
   * @default {@link EInputNumberPropsDefault.EMPTY}
   * @example empty="No value"
   */
  empty?: string;

  /**
   * Text to display before the value.
   *
   * @type string
   * @default undefined
   * @example prefix="₽"
   */
  prefix?: string;

  /**
   * Text to display after the value.
   *
   * @type string
   * @default undefined
   * @example suffix="$"
   */
  suffix?: string;

  /**
   * Locale to be used in formatting.
   *
   * @type TBcpLanguageTags | null
   * @default undefined
   * locale="ru-RU"
   */
  locale?: TBcpLanguageTags | undefined;

  /**
   * Model will be masked (with contain separation characters).
   *
   * @type boolean
   * @default false
   * @example :masked="true"
   */
  masked?: boolean;

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
   * @default {@link EInputNumberPropsDefault.CSS_CLASS}
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
export type TInputNumberSlots = {
  /**
   * Custom placeholder. If defined - `props.placeholder` will be ignored.
   *
   * @returns {VNode[]}
   */
  placeholder?(): VNode[];

  /**
   * @description Decrement control.
   *
   * @returns {VNode[]}
   */
  decrementControl?(): VNode[];

  /**
   * @description Increment control.
   *
   * @returns {VNode[]}
   */
  incrementControl?(): VNode[];

  /**
   * Content displayed before the input field.
   *
   * @returns {VNode[]}
   */
  addonBefore?(): VNode[];

  /**
   * Content displayed after the input field.
   *
   * @returns {VNode[]}
   */
  addonAfter?(): VNode[];

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
export type TInputNumberEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {Numberish | undefined} payload - The new value of the InputNumber component.
   */
  (e: 'update:model-value', payload: Numberish | undefined): void;

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

  /**
   * Emitted when component value changed via step controls.
   *
   * @param {"step"} e - The event name: 'step'.
   * @param {TInputNumberEmitStepPayload} payload - Step event payload object.
   */
  (e: 'step', payload: TInputNumberEmitStepPayload): void;
};

/**
 * Ariadna UI | Components | Controls
 *
 * InputNumber is an input component to provide numerical input.
 */
declare class InputNumber extends ClassComponent<
  TInputNumberProps,
  TInputNumberSlots,
  TInputNumberEmits,
  HTMLInputElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    InputNumber: GlobalComponentConstructor<InputNumber>;
  }
}

export default InputNumber;
