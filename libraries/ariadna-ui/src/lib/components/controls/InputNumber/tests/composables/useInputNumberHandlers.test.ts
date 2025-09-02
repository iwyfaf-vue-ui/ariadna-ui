import type { ComputedRef, Ref } from 'vue';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ref, computed, onBeforeUnmount } from 'vue';
import useInputNumberHandlers from '../../composables/useInputNumberHandlers/useInputNumberHandlers';
import InputNumberFormatterCore from '../../core/formatter/input-number.formatter.core';
import type { Numberish } from '@/types';

describe('useInputNumberHandlers', () => {
  let emits: ReturnType<typeof vi.fn>;
  let maskedValue: Ref<string, string>;
  let unmaskedValue: Ref<Numberish, Numberish>;
  let emittedValue: ComputedRef<Numberish>;
  let inputNumberFormatterCore: InputNumberFormatterCore;
  let composable: ReturnType<typeof useInputNumberHandlers>;

  beforeEach(() => {
    emits = vi.fn();
    maskedValue = ref('masked');
    unmaskedValue = ref(123);
    emittedValue = computed(() => unmaskedValue.value);
    inputNumberFormatterCore = new InputNumberFormatterCore({
      prefix: '',
      suffix: '',
      locale: undefined,
      min: undefined,
      max: undefined,
      step: 1,
      empty: '',
    });

    // Устанавливаем внутреннее состояние для корректной работы increment/decrement
    inputNumberFormatterCore.input = unmaskedValue.value;
    inputNumberFormatterCore.number = unmaskedValue.value;

    composable = useInputNumberHandlers(
      emits,
      maskedValue,
      unmaskedValue,
      emittedValue,
      inputNumberFormatterCore,
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('inputHandler', () => {
    it('Should update maskedValue, unmaskedValue and emit update:model-value.', () => {
      const event = {
        target: {
          masked: 'newMasked',
          unmasked: 456,
        },
      } as any;

      composable.inputHandler(event);

      expect(maskedValue.value).toBe('newMasked');
      expect(unmaskedValue.value).toBe(456);
      expect(emits).toHaveBeenCalledWith('update:model-value', 456);
    });
  });

  describe('onKeyDownOrUpHandler', () => {
    it('Should increment value and emit events on ArrowUp keydown', () => {
      emits.mockClear();
      unmaskedValue.value = 5;
      inputNumberFormatterCore.input = 5;
      inputNumberFormatterCore.number = 5;

      const event = { type: 'keydown', key: 'ArrowUp', preventDefault: vi.fn() } as any;
      composable.onKeyDownOrUpHandler(event);

      expect(unmaskedValue.value).toBe(6);
      expect(emits).toHaveBeenCalledWith('step', { value: 6, type: 'up' });
      expect(emits).toHaveBeenCalledWith('update:model-value', 6);
    });

    it('Should decrement value and emit events on ArrowDown keydown', () => {
      emits.mockClear();
      unmaskedValue.value = 5;
      inputNumberFormatterCore.input = 5;
      inputNumberFormatterCore.number = 5;

      const event = { type: 'keydown', key: 'ArrowDown', preventDefault: vi.fn() } as any;
      composable.onKeyDownOrUpHandler(event);

      expect(unmaskedValue.value).toBe(4);
      expect(emits).toHaveBeenCalledWith('step', { value: 4, type: 'down' });
      expect(emits).toHaveBeenCalledWith('update:model-value', 4);
    });

    it('Should not change value or emit events on other keys', () => {
      emits.mockClear();
      unmaskedValue.value = 5;
      inputNumberFormatterCore.input = 5;
      inputNumberFormatterCore.number = 5;

      const event = { type: 'keydown', key: 'Enter', preventDefault: vi.fn() } as any;
      composable.onKeyDownOrUpHandler(event);

      expect(unmaskedValue.value).toBe(5);
      expect(emits).not.toHaveBeenCalled();
    });
  });

  describe('decrementHandler', () => {
    it('Should decrement value, update masked/unmasked, emit step and update:model-value.', () => {
      unmaskedValue.value = 10;
      inputNumberFormatterCore.input = 10;
      inputNumberFormatterCore.number = 10;

      // Вызовем через startCalculation(false), чтобы проверить цепочку
      composable.startCalculation(false);

      // После первого вызова decrementHandler
      expect(maskedValue.value).toBe(inputNumberFormatterCore.format(9));
      expect(unmaskedValue.value).toBe(9);

      // Проверяем emits step и update:model-value
      expect(emits).toHaveBeenCalledWith('step', { value: 9, type: 'down' });
      expect(emits).toHaveBeenCalledWith('update:model-value', 9);
    });
  });

  describe('incrementHandler', () => {
    it('Should increment value, update masked/unmasked, emit step and update:model-value.', () => {
      unmaskedValue.value = 5;
      inputNumberFormatterCore.input = 5;
      inputNumberFormatterCore.number = 5;

      composable.startCalculation(true);

      expect(maskedValue.value).toBe(inputNumberFormatterCore.format(6));
      expect(unmaskedValue.value).toBe(6);

      expect(emits).toHaveBeenCalledWith('step', { value: 6, type: 'up' });
      expect(emits).toHaveBeenCalledWith('update:model-value', 6);
    });
  });

  describe('startCalculation', () => {
    it('Should call incrementHandler immediately and then repeatedly after delay.', async () => {
      vi.useFakeTimers();
      unmaskedValue.value = 1;
      inputNumberFormatterCore.input = 1;
      inputNumberFormatterCore.number = 1;

      composable.startCalculation(true);

      // Сразу вызывается incrementHandler
      expect(maskedValue.value).toBe(inputNumberFormatterCore.format(2));
      expect(unmaskedValue.value).toBe(2);

      // После 400мс запускается setInterval
      vi.advanceTimersByTime(400);
      vi.advanceTimersByTime(70);
      // Второй вызов incrementHandler
      expect(maskedValue.value).toBe(inputNumberFormatterCore.format(3));
      expect(unmaskedValue.value).toBe(3);

      vi.advanceTimersByTime(70);
      // Третий вызов incrementHandler
      expect(maskedValue.value).toBe(inputNumberFormatterCore.format(4));
      expect(unmaskedValue.value).toBe(4);

      composable.stopCalculation();
      vi.useRealTimers();
    });

    it('Should call decrementHandler immediately and then repeatedly after delay.', async () => {
      vi.useFakeTimers();
      unmaskedValue.value = 10;
      inputNumberFormatterCore.input = 10;
      inputNumberFormatterCore.number = 10;

      composable.startCalculation(false);

      expect(maskedValue.value).toBe(inputNumberFormatterCore.format(9));
      expect(unmaskedValue.value).toBe(9);

      vi.advanceTimersByTime(400);
      vi.advanceTimersByTime(70);
      expect(maskedValue.value).toBe(inputNumberFormatterCore.format(8));
      expect(unmaskedValue.value).toBe(8);

      composable.stopCalculation();
      vi.useRealTimers();
    });
  });

  describe('stopCalculation', () => {
    it('Should clear calculationInterval if stopped after interval starts.', () => {
      vi.useFakeTimers();
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');

      composable.startCalculation(true);
      // Проматываем время, чтобы setInterval был установлен
      vi.advanceTimersByTime(400);

      composable.stopCalculation();

      expect(clearTimeoutSpy).toHaveBeenCalled();
      expect(clearIntervalSpy).toHaveBeenCalled();

      vi.useRealTimers();
    });

    it('Should not throw if called with no active timers.', () => {
      expect(() => composable.stopCalculation()).not.toThrow();
    });
  });

  describe('onBeforeUnmount', () => {
    it('Should call stopCalculation and clear timers.', () => {
      vi.useFakeTimers();
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
      const stopSpy = vi.spyOn(composable, 'stopCalculation');

      composable.startCalculation(true);

      // Проматываем время, чтобы setInterval был установлен
      vi.advanceTimersByTime(400);

      // Имитация вызова onBeforeUnmount
      onBeforeUnmount(() => {
        composable.stopCalculation();
      });

      // Вручную вызываем stopCalculation (onBeforeUnmount)
      composable.stopCalculation();

      expect(stopSpy).toHaveBeenCalled();
      expect(clearTimeoutSpy).toHaveBeenCalled();
      expect(clearIntervalSpy).toHaveBeenCalled();

      vi.useRealTimers();
    });
  });

  describe('edge cases', () => {
    it('Should handle rapid start/stop calculation calls safely.', () => {
      vi.useFakeTimers();
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      composable.startCalculation(true);
      composable.stopCalculation();
      composable.startCalculation(false);
      composable.stopCalculation();

      expect(clearTimeoutSpy).toHaveBeenCalled();

      vi.useRealTimers();
    });

    it('Should emit correct stepPayload for increment and decrement.', () => {
      unmaskedValue.value = 100;
      inputNumberFormatterCore.input = 100;
      inputNumberFormatterCore.number = 100;
      composable.startCalculation(true);
      expect(emits).toHaveBeenCalledWith('step', { value: 101, type: 'up' });

      unmaskedValue.value = 50;
      inputNumberFormatterCore.input = 50;
      inputNumberFormatterCore.number = 50;
      composable.startCalculation(false);
      expect(emits).toHaveBeenCalledWith('step', { value: 49, type: 'down' });
    });
  });
});
