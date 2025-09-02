import type { IInputNumberElement } from '../../types/InputNumber.types';

/**
 * @description
 * Represents a custom event specifically designed for InputNumber components.
 * Extends the native CustomEvent to provide additional properties and static factory methods for creating standardized
 * InputNumber events.
 *
 * @template Event - The type of the event detail payload.
 * @extends CustomEvent<T>
 *
 * @example
 * const event = InputNumberEvent.createBase('input-number-change');
 * inputElement.dispatchEvent(event);
 */
export default class InputNumberEventsCore<Event = any> extends CustomEvent<Event> {
  /**
   * Reference to the InputNumber element that triggered the event.
   *
   * @type {IInputNumberElement}
   */
  target!: IInputNumberElement;

  /**
   * Specifies the type of input action that triggered the event (e.g., 'insertText', 'deleteContentBackward').
   *
   * @type {string}
   */
  inputType!: string;

  /**
   * Creates a base InputNumberEvent with a default detail payload.
   *
   * @param {string} event - The name of the event to be dispatched.
   *
   * @returns {CustomEvent<{facade: boolean}>} - An instance of CustomEvent with a default detail containing
   * `{ facade: true }`.
   *
   * @example
   * const event = InputNumberEvent.createBase('input-number-focus');
   */
  static createBase(event: string): CustomEvent<{ facade: boolean }> {
    return new CustomEvent(event, {
      bubbles: true,
      cancelable: true,
      detail: { facade: true },
    });
  }

  /**
   * Creates a custom InputNumberEvent with a specified detail payload and optional event options.
   *
   * @param {string} event - The name of the event to be dispatched.
   * @param {Detail} detail - The detail payload to include with the event.
   * @param {CustomEventInit<T>} options  - Optional CustomEventInit options to further configure the event.
   *
   * @returns {CustomEvent<T>} - An instance of CustomEvent with the provided detail and options.
   *
   * @example
   * const event = InputNumberEvent.createCustom('input-number-update', { value: 42 });
   */
  static createCustom<Detail = any>(
    event: string,
    detail: Detail,
    options?: CustomEventInit<Detail>,
  ): CustomEvent<Detail> {
    return new CustomEvent(event, {
      bubbles: true,
      cancelable: true,
      ...options,
      detail,
    });
  }
}
