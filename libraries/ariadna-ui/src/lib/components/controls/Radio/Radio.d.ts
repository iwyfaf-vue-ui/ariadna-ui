import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
  TSharedPropsSize,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { TRadioPropsPosition } from './types/Radio.types';

/**
 * Component props definition.
 */
export type TRadioProps = {
  /**
   * Value of the component.
   *
   * @type any
   * @default null
   * @required
   * @example v-model="radioValue"
   */
  modelValue: any;

  /**
   * The native value of the <input type="radio"> element.
   *
   * @type any
   * @default null
   * @required
   * @example value="Cheese"
   */
  value: any;

  /**
   * Radio native id attribute.
   *
   * @type string
   * @default Random generated string by using Vue 3.5 useId() helper.
   * @see https://vuejs.org/api/composition-api-helpers.html#useid
   * @example id="custom-id"
   */
  id?: string;

  /**
   * Radio native name attribute.
   *
   * @type string
   * @default undefined
   * @example name="username"
   */
  name?: string;

  /**
   * Radio native disabled attribute.
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
   * @default {@link ERadioPropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TSharedPropsSize;

  /**
   * The position of the radio relative to its content.
   *
   * @type TRadioPropsPosition
   * @default undefined
   * @example position="right"
   */
  position?: TRadioPropsPosition;

  /**
   * Custom radio implementation.
   *
   * @type boolean
   * @default false
   * @example :custom="true"
   */
  custom?: boolean;

  /**
   * Radio valid state.
   *
   * @type boolean
   * @default false
   * @example :valid="true"
   */
  valid?: boolean;

  /**
   * Radio invalid state.
   *
   * @type boolean
   * @default false
   * @example :invalid="true"
   */
  invalid?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link ERadioPropsDefault.CSS_CLASS}
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
export type TRadioSlots = {
  /**
   * Default component slot.
   * @returns {VNode[]}
   */
  default?(): VNode[];

  /**
   * Custom radio implementation.
   * @returns {VNode[]}
   */
  custom?(): VNode[];
};

/**
 * Component events emitted.
 */
export type TRadioEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {TRadioProps["modelValue"]} payload - The new value of the radio.
   */
  (e: 'update:model-value', payload: TRadioProps['modelValue']): void;

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
 * Ariadna UI | Components | Radio
 *
 * Radio component is an extended implementation of the form element `<input type="radio">`.
 */
declare class Radio extends ClassComponent<
  TRadioProps,
  TRadioSlots,
  TRadioEmits,
  HTMLInputElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Radio: GlobalComponentConstructor<Radio>;
  }
}

export default Radio;
