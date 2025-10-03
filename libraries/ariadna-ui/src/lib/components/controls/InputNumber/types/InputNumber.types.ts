import type { TInputNumberProps } from '../InputNumber';
import type { Numberish } from '../../../../../types/index';
import type InputNumberElementCore from '../core/element/input-number.element.core';

/**
 * Represents the configuration options for the InputNumber component.
 */
export type TInputNumberOptions = {
  /**
   * String to display before the numeric value (e.g., currency symbol).
   */
  prefix: TInputNumberProps['prefix'];

  /**
   * String to display after the numeric value (e.g., unit or currency).
   */
  suffix: TInputNumberProps['suffix'];

  /**
   * Locale identifier used for number formatting, or null to use default formatting.
   */
  locale: TInputNumberProps['locale'];

  /**
   * Minimum allowed value for the input, or null if there is no minimum.
   */
  min: TInputNumberProps['min'];

  /**
   * Maximum allowed value for the input, or null if there is no maximum.
   */
  max: TInputNumberProps['max'];

  /**
   * Step size for incrementing or decrementing the value.
   */
  step: TInputNumberProps['step'];

  /**
   * String to display when the input is empty.
   */
  empty: TInputNumberProps['empty'];
};

/**
 * Represents the payload emitted when the step action is triggered in the InputNumber component.
 */
export type TInputNumberEmitStepPayload = {
  /**
   * The current numeric value of the input after the step action.
   */
  value: Numberish;

  /**
   * The direction of the step action: 'up' for increment, 'down' for decrement.
   */
  type: 'up' | 'down';
};

/**
 * Extends the standard HTMLInputElement to provide additional properties and methods for the InputNumber component.
 *
 * @extends HTMLInputElement
 */
export interface IInputNumberElement extends HTMLInputElement {
  /**
   * The configuration options for the InputNumber element.
   */
  options: TInputNumberOptions;

  /**
   * A function to clean up resources or event listeners associated with the element.
   *
   * @returns void
   */
  cleanup: () => void;

  /**
   * The formatted string representation of the input value.
   */
  masked: string;

  /**
   * The raw numeric value (unformatted).
   */
  unmasked: Numberish;

  /**
   * Holds a reference to the internal core logic instance responsible for managing the InputNumber element's behavior
   * and state. This property is used internally and should not be accessed or modified directly outside the
   * component's implementation.
   */
  __inputNumberCore__?: InputNumberElementCore;
}

/**
 * Represents a custom event emitted by the InputNumber component, extending the standard CustomEvent interface.
 *
 * @template Type - The type of the event's detail payload.
 */
export interface IInputNumberEvent<Type = any> extends CustomEvent<Type> {
  /**
   * The InputNumber element that is the target of the event.
   */
  target: IInputNumberElement;

  /**
   * The type of input action that triggered the event (e.g., 'insertText', 'deleteContentBackward').
   */
  inputType: string;
}
