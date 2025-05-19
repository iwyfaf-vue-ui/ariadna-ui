import { describe, it, expect, vi, beforeEach } from 'vitest';
import throttle from '../Throttle';
import { ELibraryConfig } from '@/types/internal';
import { EThrottleConfig, EThrottleErrors } from '../types/Throttle.enum';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  describe('Input validation', () => {
    it('Should throw TypeError when callback is not a function.', () => {
      const invalidCallbacks = [null, undefined, 42, 'string', {}, []];

      invalidCallbacks.forEach((invalidCallback) => {
        expect(() => throttle(invalidCallback as any)).toThrowError(
          new TypeError(
            `${ELibraryConfig.NAME}(${EThrottleConfig.NAME}): ${EThrottleErrors.EXPECTED_FUNCTION}`,
          ),
        );
      });
    });

    it('Should not throw when callback is a function.', () => {
      const validCallback = vi.fn();

      expect(() => throttle(validCallback)).not.toThrow();
    });
  });

  describe('Throttling behavior', () => {
    it('Should call the callback immediately on first call.', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled('test');
      vi.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith('test');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Should throttle multiple calls within timeout period.', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled('first');
      throttled('second');
      throttled('third');
      vi.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith('first');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Should allow new call after timeout period.', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled('first');
      vi.advanceTimersByTime(100);

      throttled('second');
      vi.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith('first');
      expect(callback).toHaveBeenCalledWith('second');
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('Should pass all arguments to callback.', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled(1, 'a', true);
      vi.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith(1, 'a', true);
    });
  });

  describe('Timeout handling', () => {
    it('Should use default timeout when not provided.', () => {
      const callback = vi.fn();
      const throttled = throttle(callback);

      throttled();
      vi.advanceTimersByTime(300);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Should respect custom timeout value.', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 500);

      throttled();
      vi.advanceTimersByTime(300);

      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(200);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Should handle timeout of 0 correctly.', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 0);

      throttled();
      vi.advanceTimersByTime(0);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Timer cleanup', () => {
    it('Should not accumulate pending timers.', () => {
      const callback = vi.fn();
      const throttled = throttle(callback, 100);

      throttled();
      vi.advanceTimersByTime(100);

      throttled();
      vi.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });
});
