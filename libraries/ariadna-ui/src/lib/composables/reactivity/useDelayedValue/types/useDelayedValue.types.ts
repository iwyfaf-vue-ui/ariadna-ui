import type { Ref, UnwrapRef } from 'vue';

/**
 * Represents the return type of the `useDelayedValue` composable, providing both a delayed reactive value and its
 * immediate counterpart.
 *
 * @template Value - The type of the value being tracked and delayed.
 */
export type TUseDelayedValueReturn<Value> = {
  /**
   * A reactive ref holding the delayed version of the value. This value updates after a delay.
   */
  delayedValue: Ref<UnwrapRef<Value>>;

  /**
   * A reactive ref holding the immediate version of the value. This value updates instantly.
   */
  immediateValue: Ref<UnwrapRef<Value>, Value | UnwrapRef<Value>> | Ref<any, any>;
};
