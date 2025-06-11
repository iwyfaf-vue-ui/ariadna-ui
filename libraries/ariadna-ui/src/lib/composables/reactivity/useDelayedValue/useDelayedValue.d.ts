import type { MaybeRef } from 'vue';
import type { TUseDelayedValueReturn } from './types/useDelayedValue.types';
import useDelayedValue from './useDelayedValue';

/**
 * Ariadna UI | composables | useDelayedValue
 *
 * useDelayedValue is designed to create a reactive value with a delay in updating it.
 *
 * @description A composable function that returns a reactive value which updates with a specified delay. It accepts
 * an initial value (which can be a ref or a plain value) and returns a delayed reactive value and its immediate
 * counterpart.
 *
 * @param {MaybeRef<Value>} initValue - The initial value or a reactive reference to a value to be delayed.
 * @param {number} delay - The delay duration in milliseconds before the value updates. Defaults to 300ms.
 *
 * @returns {TUseDelayedValueReturn<Value>}
 *
 * @example
 * const searchTerm = ref('');
 * const { delayedValue, immediateValue } = useDelayedValue<Ref<string>>(searchTerm, 500);
 *
 * // delayedValue.value will update 500ms after searchTerm changes
 * // immediateValue.value will update immediately searchTerm changes
 */
declare function useDelayedValue<Value>(
  initValue: MaybeRef<Value>,
  delay: number = 300,
): TUseDelayedValueReturn<Value>;

export default useDelayedValue;
