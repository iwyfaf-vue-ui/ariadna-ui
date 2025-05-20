import type { DirectiveBinding } from 'vue';

/**
 * Represents the value type for the RenderAttributeOnce directive.
 */
export type TRenderAttributeOnceDirectiveValue = {};

/**
 * @description
 * RenderAttributeOnce Vue directive sets HTML attributes on an element only if they are not already present.
 * Provides SSR (Server-Side Rendering) support by returning the attributes for server rendering.
 */
export type TRenderAttributeOnceDirective = {
  /**
   * Lifecycle hook called when the directive is attached to the element. Iterates over the binding value and sets
   * each attribute on the element if it does not already exist.
   *
   * @param el - The target HTML element to which the directive is bound.
   * @param binding - The binding object containing the value with attributes to set.
   */
  created(el: HTMLElement, binding: DirectiveBinding<TRenderAttributeOnceDirectiveValue>): void;

  /**
   * Provides SSR (Server-Side Rendering) support by returning the attributes to be rendered on the server.
   *
   * @param binding - The binding object containing the value with attributes to set.
   * @returns The attributes object to be rendered on the server.
   */
  getSSRProps(
    binding: DirectiveBinding<TRenderAttributeOnceDirectiveValue>,
  ): TRenderAttributeOnceDirectiveValue;
};
