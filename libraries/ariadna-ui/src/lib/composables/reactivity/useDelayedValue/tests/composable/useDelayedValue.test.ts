import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ref } from 'vue';
import useDelayedValue from '../../useDelayedValue';

describe('useDelayedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Basic functionality', () => {
    it('Should initialize immediateValue and delayedValue with initial value.', () => {
      const { immediateValue, delayedValue } = useDelayedValue('test', 300);

      expect(immediateValue.value).toBe('test');
      expect(delayedValue.value).toBe('test');
    });

    it('Should update immediateValue after delay when delayedValue is set.', () => {
      const { immediateValue, delayedValue } = useDelayedValue('init', 300);

      delayedValue.value = 'changed';

      expect(immediateValue.value).toBe('init');

      vi.advanceTimersByTime(300);
      expect(immediateValue.value).toBe('changed');
    });

    it('Should clear previous timeout if delayedValue is set multiple times quickly.', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const { delayedValue } = useDelayedValue('init', 300);

      delayedValue.value = 'first';
      delayedValue.value = 'second';

      expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(300);
      clearTimeoutSpy.mockRestore();
    });

    it('Should update immediateValue immediately if delay is 0.', () => {
      const { immediateValue, delayedValue } = useDelayedValue('init', 0);

      delayedValue.value = 'changed';

      expect(immediateValue.value).toBe('changed');
    });
  });

  describe('Reactivity and initValue changes', () => {
    it('Should accept initial value as a ref and initialize correctly.', () => {
      const initial = ref('refValue');
      const { immediateValue, delayedValue } = useDelayedValue(initial, 300);

      expect(immediateValue.value).toBe('refValue');
      expect(delayedValue.value).toBe('refValue');
    });

    it('Should not automatically update immediateValue if initValue ref changes after initialization.', () => {
      const initial = ref('start');
      const { immediateValue, delayedValue } = useDelayedValue(initial, 300);

      expect(immediateValue.value).toBe('start');
      initial.value = 'changedExternally';

      expect(immediateValue.value).toBe('start');
      expect(delayedValue.value).toBe('start');
    });

    it('Should update immediateValue correctly when delayedValue is set multiple times.', () => {
      const { immediateValue, delayedValue } = useDelayedValue('start', 100);

      delayedValue.value = 'first';
      vi.advanceTimersByTime(100);
      expect(immediateValue.value).toBe('first');

      delayedValue.value = 'second';
      vi.advanceTimersByTime(100);
      expect(immediateValue.value).toBe('second');
    });
  });

  describe('Edge cases', () => {
    it('Should handle negative delay as zero delay (immediate update).', () => {
      const { immediateValue, delayedValue } = useDelayedValue('init', -100);

      delayedValue.value = 'changed';

      expect(immediateValue.value).toBe('changed');
    });

    it('Should handle non-numeric delay by using default delay.', () => {
      // @ts-expect-error проверяем поведение при неправильном типе
      const { immediateValue, delayedValue } = useDelayedValue('init', 'invalid');

      delayedValue.value = 'changed';
      vi.advanceTimersByTime(300);

      expect(immediateValue.value).toBe('changed');
    });
  });
});
