import type { ComputedRef, Ref } from 'vue';
import type { TUseElementsSizes, TUseElementsSizesReturn } from './types/useElementsSizes.types';

/**
 * Ariadna UI | composables | useElementsSizes
 *
 * A composable function that observes and provides the sizes of multiple HTML elements.
 *
 * @description useElementsSizes can optionally invoke a handler whenever the sizes change.
 *
 * @param {Ref<Array<HTMLElement> | null> | ComputedRef<Array<HTMLElement> | null>} elementsRef - A Vue ref or computed
 * ref containing an array of HTML elements to observe.
 * @param {(sizes: Array<TUseElementsSizes>) => void} handler - (Optional) A callback function that receives an array
 * of element size objects whenever the sizes are updated.
 *
 * @returns {TUseElementsSizesReturn} - Returns an object containing the current sizes of the
 * observed elements and any additional utilities defined by {@link TUseElementsSizesReturn}.
 *
 * @example
 * const elementsRef = ref<HTMLElement[]>([]);
 *
 * const { sizes } = useElementsSizes(elementsRef, (sizes) => {
 *   console.log('Updated sizes:', sizes);
 * });
 */
declare function useElementsSizes(
  elementsRef: Ref<Array<HTMLElement> | null> | ComputedRef<Array<HTMLElement> | null>,
  handler?: (sizes: Array<TUseElementsSizes>) => void,
): TUseElementsSizesReturn;

export default useElementsSizes;
