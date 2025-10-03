import type { VNode } from 'vue';
import type { IInputNumberElement } from '../../types/InputNumber.types';
import InputNumberEventsCore from '../events/input-number.events.core';

/**
 * Interface defining the core methods for managing and interacting with an InputNumber element.
 */
export interface IInputNumberElementCore {
  /**
   * Retrieves the input number element instance from a given HTML element.
   *
   * @param {HTMLElement | HTMLInputElement} el - The HTML element or HTMLInputElement to retrieve the input number
   * element from.
   *
   * @returns {IInputNumberElement} - The corresponding IInputNumberElement instance.
   */
  getInputElement(el: HTMLElement | HTMLInputElement): IInputNumberElement;

  /**
   * Updates the caret (cursor) position within the input element.
   *
   * @param {HTMLInputElement} el - The HTMLInputElement whose caret position should be updated.
   * @param {number} position - The new caret position index.
   */
  updateInputElementCaret(el: HTMLInputElement, position: number): void;

  /**
   * Updates the value of the InputNumber element, optionally emitting events, forcing the update, or cleaning the
   * value.
   *
   * @param {IInputNumberElement} el - The input number element to update.
   * @param {VNode | null} vNode - The associated Vue VNode, or null if not applicable.
   * @param options - Optional settings for the update operation.
   * @param {boolean} options.emit - Whether to emit a value change event.
   * @param {boolean} options.force - Whether to force the update regardless of current state.
   * @param {boolean} options.validate - Whether to validate the value before updating (min & max calculating).
   * @returns {boolean | void}
   */
  updateValue(
    el: IInputNumberElement,
    vNode: VNode | null,
    options?: {
      emit?: boolean;
      force?: boolean;
      validate?: boolean;
    },
  ): boolean | void;

  /**
   * Handles click events for the InputNumber element.
   *
   * @param {InputNumberEventsCore} event - The InputNumberEventsCore event object.
   */
  clickHandler(event: InputNumberEventsCore): void;

  /**
   * Handles input events for the InputNumber element.
   *
   * @param {InputNumberEventsCore} event - The InputNumberEventsCore event object.
   */
  inputHandler(event: InputNumberEventsCore): void;

  /**
   * Handles blur events for the InputNumber element.
   *
   * @param {InputNumberEventsCore} event - The InputNumberEventsCore event object.
   */
  blurHandler(event: InputNumberEventsCore): void;
}
