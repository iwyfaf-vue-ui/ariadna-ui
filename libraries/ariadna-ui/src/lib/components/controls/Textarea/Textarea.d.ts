import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../types/component';
import type { Nullable, Numberish } from '../../../../types/index';
import type { VNode } from 'vue';
import type { ETextareaPropsDefault } from './types/Textarea.enums';

/**
 * Component props definition.
 */
export type TTextareaProps = {
  /**
   * Value of the component.
   *
   * @type Nullable<string>
   * @default null
   * @required
   * @example v-model="textareaValue"
   */
  modelValue: Nullable<string>;

  /**
   * Textarea label text.
   *
   * @type string
   * @default undefined
   * @example label="Associated label"
   */
  label?: string;

  /**
   * Textarea native id attribute.
   *
   * @type string
   * @default Random generated string by using Vue 3.5 useId() helper.
   * @see https://vuejs.org/api/composition-api-helpers.html#useid
   * @example id="custom-id"
   */
  id?: string;

  /**
   * Textarea placeholder. Will be ignored if placeholder slot is defined.
   *
   * @type string
   * @default undefined
   * @example placeholder="Placeholder from props"
   */
  placeholder?: string;

  /**
   * Textarea native name attribute.
   *
   * @type string
   * @default undefined
   * @example name="message"
   */
  name?: string;

  /**
   * The number of visible text lines for the control. If it is specified, it must be a positive integer.
   * If it is not specified, the default value is `2`.
   *
   * @type Numberish
   * @default '2'
   * @example rows="10"
   */
  rows?: Numberish;

  /**
   * The visible width of the text control, in average character widths. If it is specified, it must be a positive
   * integer. If it is not specified, the default value is `20`.
   *
   * @type Numberish
   * @default '20'
   * @example cols="50"
   */
  cols?: Numberish;

  /**
   * Textarea native autocomplete attribute.
   *
   * @type boolean
   * @default false
   * @example :autocomplete="true"
   */
  autocomplete?: boolean;

  /**
   * Textarea native spellcheck attribute.
   *
   * @type boolean
   * @default true
   * @example :autocomplete="true"
   */
  spellcheck?: boolean;

  /**
   * Textarea native disabled attribute.
   *
   * @type boolean
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Textarea native readonly attribute.
   *
   * @type boolean
   * @default false
   * @example :readonly="true"
   */
  readonly?: boolean;

  /**
   * Textarea valid state.
   *
   * @type boolean
   * @default false
   * @example :valid="true"
   */
  valid?: boolean;

  /**
   * Textarea invalid state.
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
   * @default {@link ETextareaPropsDefault.CSS_CLASS}
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
export type TTextareaSlots = {
  /**
   * Custom placeholder. If defined - `props.placeholder` will be ignored.
   * @returns {VNode[]}
   */
  placeholder?(): VNode[];

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
export type TTextareaEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {TTextareaProps["modelValue"]} payload - The new value of the textarea.
   */
  (e: 'update:model-value', payload: TTextareaProps['modelValue']): void;

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
 * Ariadna UI | Components | Textarea
 *
 * Textarea is a component of the HTML `<textarea>` element in the textual form with the possibility of flexible
 * theming.
 */
declare class Textarea extends ClassComponent<
  TTextareaProps,
  TTextareaSlots,
  TTextareaEmits,
  HTMLTextAreaElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Textarea: GlobalComponentConstructor<Textarea>;
  }
}

export default Textarea;
