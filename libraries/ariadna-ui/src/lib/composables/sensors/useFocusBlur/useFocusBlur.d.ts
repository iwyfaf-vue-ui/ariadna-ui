import type { TUseFocusBlurReturn } from './types/useFocusBlur.types';
import useFocusBlur from './useFocusBlur';

/**
 * Ariadna UI | composables | useFocusBlur
 *
 * useFocusBlur is designed to provides reactive utilities to track and handle focus and blur events within a component
 * or element.
 *
 * @description This composable is useful for managing UI state based on focus changes, such as showing or
 * hiding elements, or triggering side effects when focus is gained or lost.
 *
 * @returns {TUseFocusBlurReturn} An object containing reactive properties and methods to manage focus and blur state.
 *
 * @example
 * const { isFocused, onFocus, onBlur } = useFocusBlur();
 *
 * // Use isFocused in your template or logic
 */
declare function useFocusBlur(): TUseFocusBlurReturn;

export default useFocusBlur;
