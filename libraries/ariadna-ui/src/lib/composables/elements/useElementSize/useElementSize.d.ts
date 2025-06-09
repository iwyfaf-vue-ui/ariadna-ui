import type { ComputedRef, Ref } from 'vue';
export type { TUseElementSizeReturn } from './types/useElementSize.types';

/**
 * Ariadna UI | composables | useElementSize
 *
 * useElementSize tracks the size of a given HTML element.
 *
 * @description It accepts a reactive reference to an element and optionally a handler callback that is invoked
 * whenever the element's size changes.
 *
 * @param {Ref<HTMLElement | null> | ComputedRef<HTMLElement | null>} element  - A Vue Ref or ComputedRef pointing to
 * an HTMLElement or null.
 * @param {number} timeout - The throttled timeout in milliseconds. Default 200.
 * @param {(values: TUseElementSizeReturn) => void} handler - Optional callback function that receives the current size
 * values.
 *
 * @returns {TUseElementSizeReturn} - An object containing reactive size properties of the element.
 *
 * @example
 * const elementRef = ref<HTMLElement | null>(null);
 * const { width, height } = useElementSize(elementRef, ({ width, height }) => {
 * console.log(Element size changed: ${width}x${height});
 * });
 */
declare function useElementSize(
  element: Ref<HTMLElement | null> | ComputedRef<HTMLElement | null>,
  timeout: number,
  handler?: (values: TUseElementSizeReturn) => void,
): TUseElementSizeReturn;

export default useElementSize;
