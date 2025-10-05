import type { Ref, ComputedRef } from 'vue';
import type { Numberish } from '@/types';
import { ref, onBeforeUnmount } from 'vue';
import type { TUseInputNumberHandlersReturn } from './useInputNumberHandlers.types';
import type { TInputNumberEmits } from '../../InputNumber';
import InputNumberEventsCore from '../../core/events/input-number.events.core';
import type InputNumberFormatterCore from '../../core/formatter/input-number.formatter.core';
import type { TInputNumberEmitStepPayload } from '../../types/InputNumber.types';

export default function useInputNumberHandlers(
  emits: TInputNumberEmits,
  maskedValue: Ref<string | null, string | null>,
  unmaskedValue: Ref<Numberish, Numberish>,
  emittedValue: ComputedRef<Numberish | null>,
  inputNumberFormatterCore: InputNumberFormatterCore,
): TUseInputNumberHandlersReturn {
  const calculationInterval = ref<ReturnType<typeof setInterval> | null>(null);
  const calculationDelayTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
  const stepPayload = ref<TInputNumberEmitStepPayload>({
    value: emittedValue.value,
    type: 'up',
  });

  function inputHandler(event: Event) {
    const { target } = event as InputNumberEventsCore;

    maskedValue.value = target.masked;
    unmaskedValue.value = target.unmasked;

    emits('update:model-value', emittedValue.value);
  }

  function decrementHandler() {
    const decrementedValue = inputNumberFormatterCore.decrement();

    maskedValue.value = inputNumberFormatterCore.format(decrementedValue);
    unmaskedValue.value = decrementedValue;

    stepPayload.value.value = emittedValue.value;
    stepPayload.value.type = 'down';

    emits('step', stepPayload.value);

    emits('update:model-value', emittedValue.value);
  }

  function incrementHandler() {
    const incrementedValue = inputNumberFormatterCore.increment();

    maskedValue.value = inputNumberFormatterCore.format(incrementedValue);
    unmaskedValue.value = incrementedValue;

    stepPayload.value.value = emittedValue.value;
    stepPayload.value.type = 'up';

    emits('step', stepPayload.value);
    emits('update:model-value', emittedValue.value);
  }

  function onKeyDownOrUpHandler(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        incrementHandler();
        break;
      case 'ArrowDown':
        decrementHandler();
        break;
      default:
        break;
    }
  }

  function startCalculation(increment: boolean) {
    increment ? incrementHandler() : decrementHandler();

    calculationDelayTimeout.value = setTimeout(() => {
      calculationInterval.value = setInterval(() => {
        increment ? incrementHandler() : decrementHandler();
      }, 70);
    }, 400);
  }

  function stopCalculation() {
    if (calculationDelayTimeout.value) {
      clearTimeout(calculationDelayTimeout.value);
      calculationDelayTimeout.value = null;
    }

    if (calculationInterval.value) {
      clearInterval(calculationInterval.value);
      calculationInterval.value = null;
    }
  }

  onBeforeUnmount(() => {
    stopCalculation();
  });

  return {
    inputHandler,
    onKeyDownOrUpHandler,
    startCalculation,
    stopCalculation,
  };
}
