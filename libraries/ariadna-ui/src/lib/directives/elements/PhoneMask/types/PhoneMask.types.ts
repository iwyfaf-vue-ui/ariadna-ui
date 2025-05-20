import type { DirectiveBinding } from 'vue';

/**
 * Represents the value type for the PhoneMask directive.
 */
export type TPhoneMaskDirectiveValue = {
  /**
   * Flag to determine if the input element should be cloned for masking.
   *
   * @default false
   */
  clone?: boolean;

  /**
   * Separator character for formatting the phone number. Helps the mask logic to use the correct separator character.
   *
   * @default '-'
   */
  separator?: string;
};

/**
 * PhoneMask directive.
 */
export type TPhoneMaskDirective = {
  /**
   * Lifecycle hook called when the directive is mounted to the DOM. This hook is triggered when the directive is
   * attached to the input element.
   *
   * @param el - The HTML input element to which the directive is attached.
   * @param binding - The binding object containing the directive options.
   */
  mounted(el: HTMLInputElement, binding: DirectiveBinding<TPhoneMaskDirectiveValue>): void;
};
