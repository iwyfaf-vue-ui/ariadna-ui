import type { Mock } from 'vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ELibraryConfig } from '@/types/internal';
import debounce from '../../Debounce';
import { EDebounceConfig, EDebounceErrors } from '../../types/Debounce.enum';

describe('debounce', () => {
  let mockCallback: Mock;
  const defaultTimeout = 300;

  beforeEach(() => {
    mockCallback = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('Input validation', () => {
    it('Should throw TypeError when callback is not a function.', () => {
      const invalidCallbacks = [null, undefined, 42, 'string', {}, []];

      invalidCallbacks.forEach((invalidCallback) => {
        expect(() => debounce(invalidCallback as any)).toThrowError(
          new TypeError(
            `${ELibraryConfig.NAME}(${EDebounceConfig.NAME}): ${EDebounceErrors.EXPECTED_FUNCTION}`,
          ),
        );
      });
    });

    it('Should not throw when callback is a function.', () => {
      const validCallback = vi.fn();

      expect(() => debounce(validCallback)).not.toThrow();
    });
  });

  describe('Trailing edge (default)', () => {
    it('Should call the callback only after the timeout when called once.', () => {
      const debounced = debounce(mockCallback, defaultTimeout);

      debounced();
      expect(mockCallback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(defaultTimeout);
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('Should call the callback only once when called multiple times within timeout.', () => {
      const debounced = debounce(mockCallback, defaultTimeout);

      debounced();
      debounced();
      debounced();

      vi.advanceTimersByTime(defaultTimeout);
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('Should reset the timeout when called again within timeout.', () => {
      const debounced = debounce(mockCallback, defaultTimeout);

      debounced();
      vi.advanceTimersByTime(defaultTimeout - 100);

      debounced();
      vi.advanceTimersByTime(100);

      expect(mockCallback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(defaultTimeout);

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('Should pass the correct arguments and context to the callback.', () => {
      const context = { value: 42 };
      const args = [1, 'test', true];

      const debounced = debounce(function (this: any, ...args: any[]) {
        mockCallback.apply(this, args);
      }, defaultTimeout);

      debounced.apply(context, args);
      vi.advanceTimersByTime(defaultTimeout);

      expect(mockCallback).toHaveBeenCalledWith(...args);
      expect(mockCallback.mock.instances[0]).toBe(context);
    });
  });

  describe('Immediate', () => {
    it('Should call the callback immediately on first call when immediate is true.', () => {
      const debounced = debounce(mockCallback, defaultTimeout, true);

      debounced();
      expect(mockCallback).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(defaultTimeout);

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('Should not call the callback again until timeout passes when immediate is true.', () => {
      const debounced = debounce(mockCallback, defaultTimeout, true);

      debounced();
      expect(mockCallback).toHaveBeenCalledTimes(1);

      debounced();
      debounced();

      expect(mockCallback).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(defaultTimeout);
      debounced();

      expect(mockCallback).toHaveBeenCalledTimes(2);
    });

    it('Should reset the immediate call after timeout passes.', () => {
      const debounced = debounce(mockCallback, defaultTimeout, true);

      debounced();

      expect(mockCallback).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(defaultTimeout);
      debounced();

      expect(mockCallback).toHaveBeenCalledTimes(2);
    });

    it('Should pass the correct arguments and context in immediate mode.', () => {
      const context = { value: 42 };
      const args = [1, 'test', true];

      const debounced = debounce(
        function (this: any, ...args: any[]) {
          mockCallback.apply(this, args);
        },
        defaultTimeout,
        true,
      );

      debounced.apply(context, args);

      expect(mockCallback).toHaveBeenCalledWith(...args);
      expect(mockCallback.mock.instances[0]).toBe(context);
    });
  });

  describe('Edge cases', () => {
    it('Should handle zero timeout correctly.', () => {
      const debounced = debounce(mockCallback, 0);

      debounced();
      expect(mockCallback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(0);

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('Should handle very large timeout correctly.', () => {
      const largeTimeout = 2 ** 31 - 1; // Max 32-bit signed integer
      const debounced = debounce(mockCallback, largeTimeout);

      debounced();
      vi.advanceTimersByTime(largeTimeout - 1);

      expect(mockCallback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('Should not throw when called after timeout with immediate=false.', () => {
      const debounced = debounce(mockCallback, defaultTimeout);

      debounced();
      vi.advanceTimersByTime(defaultTimeout);

      expect(() => debounced()).not.toThrow();
    });

    it('Should not throw when called after timeout with immediate=true.', () => {
      const debounced = debounce(mockCallback, defaultTimeout, true);

      debounced();
      vi.advanceTimersByTime(defaultTimeout);

      expect(() => debounced()).not.toThrow();
    });
  });
});
