import type { DirectiveBinding } from 'vue';

/**
 * Represents a textarea element extended with a throttled resize handler for auto-height adjustment.
 *
 * @extends HTMLTextAreaElement
 */
export interface ITextareaAutoHeightDirectiveElement extends HTMLTextAreaElement {
  /**
   * A throttled function that handles resizing the textarea to fit its content.
   */
  throttledResizeTextareaHandler: () => void;
}

/**
 * Represents the value object for the `v-textarea-auto-height` directive, allowing customization of the auto-height
 * behavior.
 */
export type TTextareaAutoHeightDirectiveValue = {
  /**
   * The throttled timeout in milliseconds for the textarea's auto-resize handler.
   *
   * @default 400
   */
  timeout: number;
};

/**
 * Defines the contract for a Vue directive that automatically adjusts the height of a textarea element.
 */
export type TTextareaAutoHeightDirective = {
  /**
   * Called when the directive is mounted on the textarea element.
   *
   * @param el - The textarea element with the auto-height directive applied.
   * @param binding - An object containing the directive's value and modifiers.
   *
   * @returns void
   */
  mounted(
    el: ITextareaAutoHeightDirectiveElement,
    binding: DirectiveBinding<TTextareaAutoHeightDirectiveValue>,
  ): void;

  /**
   * Called when the directive is unmounted from the textarea element.
   *
   * @param el - The textarea element with the auto-height directive applied.
   *
   * @returns void
   */
  unmounted(el: ITextareaAutoHeightDirectiveElement): void;
};
