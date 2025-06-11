import type { TUseDelayedValueReturn } from './types/useDelayedValue.types';
import type { MaybeRef, UnwrapRef } from 'vue';
import { computed, onScopeDispose, ref, unref } from 'vue';

export default function useDelayedValue<Value>(
  initValue: MaybeRef<Value>,
  delay: number = 300,
): TUseDelayedValueReturn<Value> {
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);
  const immediateValue = ref<Value>(unref(initValue));

  const delayedValue = computed<UnwrapRef<Value>>({
    get() {
      return immediateValue.value;
    },

    set(value: UnwrapRef<Value>) {
      if (timeout.value) {
        clearTimeout(timeout.value);
        timeout.value = null;
      }

      if (delay <= 0) {
        immediateValue.value = value;
        return;
      }

      timeout.value = setTimeout(() => {
        immediateValue.value = value;
        timeout.value = null;
      }, delay);
    },
  });

  onScopeDispose(() => {
    if (timeout.value) {
      clearTimeout(timeout.value);
      timeout.value = null;
    }
  });

  return {
    delayedValue,
    immediateValue,
  };
}
