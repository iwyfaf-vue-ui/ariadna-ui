import { describe, it, expect } from 'vitest';
import clamp from '../Clamp';

describe('Clamp', () => {
  describe('Basic functionality', () => {
    it('Should return the value itself when it is within the range.', () => {
      expect(clamp(0, 5, 10)).toEqual(5);
      expect(clamp(-10, 0, 10)).toEqual(0);
      expect(clamp(-10, -5, 10)).toEqual(-5);
    });

    it('Should return the minimum when the value is less than the minimum.', () => {
      expect(clamp(0, -2, 10)).toEqual(0);
      expect(clamp(-5, -10, 10)).toEqual(-5);
      expect(clamp(5, 0, 10)).toEqual(5);
    });

    it('Should return the maximum when the value is greater than the maximum.', () => {
      expect(clamp(0, 15, 10)).toEqual(10);
      expect(clamp(-10, 20, 10)).toEqual(10);
      expect(clamp(5, 100, 10)).toEqual(10);
    });
  });

  describe('Edge cases', () => {
    it('Should return the minimum when the value is exactly the minimum.', () => {
      expect(clamp(0, 0, 10)).toEqual(0);
      expect(clamp(-5, -5, 10)).toEqual(-5);
    });

    it('Should return the maximum when the value is exactly the maximum.', () => {
      expect(clamp(0, 10, 10)).toEqual(10);
      expect(clamp(-5, 10, 10)).toEqual(10);
    });

    it('Should return the only value when min, middle, and max are equal.', () => {
      expect(clamp(5, 5, 5)).toEqual(5);
      expect(clamp(-3, -3, -3)).toEqual(-3);
    });

    it('Should handle the case when min equals max.', () => {
      expect(clamp(7, 10, 7)).toEqual(7);
      expect(clamp(7, 7, 7)).toEqual(7);
      expect(clamp(7, 5, 7)).toEqual(7);
    });

    it('Should handle the case when min is greater than max.', () => {
      // Math.max(min, Math.min(middle, max)) with min > max
      expect(clamp(10, 5, 0)).toEqual(10);
      expect(clamp(10, 15, 0)).toEqual(10);
      expect(clamp(10, -5, 0)).toEqual(10);
    });
  });

  describe('Negative values', () => {
    it('Should work correctly with negative numbers.', () => {
      expect(clamp(-10, -20, -5)).toEqual(-10);
      expect(clamp(-10, -7, -5)).toEqual(-7);
      expect(clamp(-10, 0, -5)).toEqual(-5);
    });
  });

  describe('Fractional values', () => {
    it('Should work correctly with floating point numbers.', () => {
      expect(clamp(0.1, 0.5, 1.0)).toEqual(0.5);
      expect(clamp(0.1, 0.05, 1.0)).toEqual(0.1);
      expect(clamp(0.1, 1.5, 1.0)).toEqual(1.0);
      expect(clamp(-1.5, -1.0, -0.5)).toEqual(-1.0);
    });
  });

  describe('Very large and very small numbers', () => {
    it('Should work correctly with very large and very small numbers.', () => {
      expect(clamp(Number.MIN_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER)).toEqual(0);
      expect(
        clamp(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
      ).toEqual(Number.MAX_SAFE_INTEGER);
      expect(
        clamp(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
      ).toEqual(Number.MIN_SAFE_INTEGER);
    });
  });

  describe('Performance', () => {
    it('Should execute clamp function efficiently for a large number of calls.', () => {
      const iterations = 1_000_000;
      const min = -1000;
      const max = 1000;
      let sum = 0;
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        sum += clamp(min, (i % (max * 2)) - max, max);
      }
      const end = performance.now();

      // Проверяем, что выполнение не заняло слишком много времени (например, менее 500 мс)
      expect(end - start).toBeLessThan(500);
      // Проверяем, что сумма определена (чтобы избежать оптимизации компилятором)
      expect(sum).toBeDefined();
    });
  });
});
