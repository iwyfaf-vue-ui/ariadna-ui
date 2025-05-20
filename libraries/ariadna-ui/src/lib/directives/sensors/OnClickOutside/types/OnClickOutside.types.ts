import type { DirectiveBinding } from 'vue';

/**
 * Represents the value type for the OnClickOutside directive.
 * This is a function that will be called when a click outside the bound element is detected.
 *
 * @param {...any[]} args - Arguments passed to the directive handler.
 * @returns {any} The return value can be of any type, depending on the implementation.
 */
export type TOnClickOutsideDirectiveValue = (...args: any[]) => any;

/**
 * Defines the lifecycle hooks for the OnClickOutside Vue directive.
 */
export type TOnClickOutsideDirective = {
  /**
   * Lifecycle hook called when the directive is first bound to the element. Typically used to set up event listeners
   * or perform initializations.
   *
   * @param el - The target HTML element to which the directive is bound.
   * @param binding - An object containing the directive's value and modifiers.
   */
  mounted(el: HTMLElement, binding: DirectiveBinding<TOnClickOutsideDirectiveValue>): void;

  /**
   * Lifecycle hook called whenever the bound element or directive value is updated. Useful for updating event
   * listeners or reacting to changes in the directive's value.
   *
   * @param el - The target HTML element to which the directive is bound.
   * @param binding - An object containing the updated directive's value and modifiers.
   */
  updated(el: HTMLElement, binding: DirectiveBinding<TOnClickOutsideDirectiveValue>): void;

  /**
   * Lifecycle hook called when the directive is unbound from the element. Used for cleanup, such as removing event
   * listeners.
   *
   * @param el - The target HTML element from which the directive is unbound.
   * @param binding - An object containing the directive's value and modifiers at the time of unbinding.
   */
  unmounted(el: HTMLElement, binding: DirectiveBinding<TOnClickOutsideDirectiveValue>): void;
};
