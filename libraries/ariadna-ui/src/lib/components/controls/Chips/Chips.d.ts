import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
  TSharedPropsSize,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { EChipsPropsDefault } from './types/Chips.enums';
export type { TChipsEmitAddPayload, TChipsEmitRemovePayload } from './types/Chips.types';

/**
 * Component props definition.
 */
export type TChipsProps = {
  /**
   * Value of the component.
   *
   * @type Array<any>
   * @default []
   * @required
   * @example v-model="selectMultipleValue"
   */
  modelValue: Array<any>;

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
   * Chips writable state.
   *
   * @type boolean
   * @default false
   * @example :writable="true"
   */
  writable?: boolean;

  /**
   * Enable chip, with the action of clearing the value of the component.
   *
   * @type boolean
   * @default false
   * @example :clearing="true"
   */
  clearable?: boolean;

  /**
   * Input native disabled attribute.
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
   * @default {@link EChipsPropsDefault.SIZE}
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
   * @default {@link EChipsPropsDefault.CSS_CLASS}
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
export type TChipsSlots = {
  /**
   * Chip template.
   *
   * @param {string} props.value - Value of chip.
   * @returns {VNode[]}
   */
  chip?(props: { value: string }): VNode[];

  /**
   * Element for removing chip.
   *
   * @returns {VNode[]}
   */
  remove?(): VNode[];

  /**
   * Element for clearing chips value.
   *
   * @returns {VNode[]}
   */
  clear?(): VNode[];

  /**
   * Input element template.
   *
   * @param {string} props.id - Value for input id attribute.
   * @param {string | undefined} props.inputValue - Value of input element.
   * @returns {VNode[]}
   */
  input?(props: { id: string; inputValue: string | undefined }): VNode[];

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
export type TChipsEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {TChipsProps['modelValue']} payload - The new value of the Chips component.
   */
  (e: 'update:model-value', payload: TChipsProps['modelValue']): void;

  /**
   * Emitted when a single value is added.
   *
   * @param {"add"} e - The event name: 'add'.
   * @param {TChipsEmitAddPayload} payload - The event payload.
   */
  (e: 'add', payload: TChipsEmitAddPayload): void;

  /**
   * Emitted when one value is deleted.
   *
   * @param {"remove"} e - The event name: 'remove'.
   * @param {TChipsEmitRemovePayload} payload - The event payload.
   */
  (e: 'remove', payload: TChipsEmitRemovePayload): void;

  /**
   * Emitted when all values are cleared.
   *
   * @param {"clear"} e - The event name: 'clear'.
   * @param {Event} event - The clear event object.
   */
  (e: 'clear', event: Event): void;

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
};

/**
 * Ariadna UI | Components | Chips
 *
 * Chips component  is used to enter multiple values on an input field.
 */
declare class Chips extends ClassComponent<TChipsProps, TChipsSlots, TChipsEmits, HTMLDivElement> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Chips: GlobalComponentConstructor<Chips>;
  }
}

export default Chips;
