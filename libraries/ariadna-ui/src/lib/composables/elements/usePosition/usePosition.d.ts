import type { Ref } from 'vue';
import type { TUsePositionOptions, TUsePositionReturn } from './types/usePosition.types';
export { usePositionDefaultOptions } from './usePosition';

/**
 * Ariadna UI | composables | usePosition
 *
 * usePosition provides reactive positioning logic for a contexts elements relative to a button element.
 *
 * @description This composable is typically used to manage the dynamic placement of dropdowns, tooltips, or
 * popovers in Vue components.
 *
 * @param button - A Vue Ref pointing to the button HTMLElement or null. This element acts as the anchor for
 * positioning.
 * @param dropbox - A Vue Ref pointing to the dropbox HTMLElement or null. This element will be positioned relative to
 * the button.
 * @param options - (Optional) Configuration options for positioning behavior. Defaults to `usePositionDefaultOptions`.
 *
 * @returns {Function} - Returns an object containing reactive properties and methods to control and update the
 * position of the dropbox element.
 *
 * @example
 * const buttonRef = ref<HTMLElement | null>(null);
 * const dropboxRef = ref<HTMLElement | null>(null);
 * const { calculate } = usePosition(buttonRef, dropboxRef);
 *
 * // Call calculate when needed, e.g., when context element must be opened.
 */
declare function usePosition(
  button: Ref<HTMLElement | null>,
  dropbox: Ref<HTMLElement | null>,
  options: TUsePositionOptions = usePositionDefaultOptions,
): TUsePositionReturn;

export default usePosition;
