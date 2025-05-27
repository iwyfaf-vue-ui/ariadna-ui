import { describe, it, expect } from 'vitest';
import { ELibraryConfig } from '@/types/internal';
import { ERatingConfig, ERatingErrors } from '../../types/Rating.enums';
import ratingMathCeilToMultiple from '../../core/rating-math/rating-math.core';

describe('rating-math.core', () => {
  describe('ratingMathCeilToMultiple', () => {
    it('Should round up to the nearest multiple when n is not a multiple of m.', () => {
      expect(ratingMathCeilToMultiple(7, 5)).toEqual(10);
      expect(ratingMathCeilToMultiple(3, 2)).toEqual(4);
      expect(ratingMathCeilToMultiple(13, 4)).toEqual(16);
      expect(ratingMathCeilToMultiple(1, 10)).toEqual(10);
    });

    it('Should return n when n is already a multiple of m.', () => {
      expect(ratingMathCeilToMultiple(12, 4)).toEqual(12);
      expect(ratingMathCeilToMultiple(20, 5)).toEqual(20);
      expect(ratingMathCeilToMultiple(0, 3)).toEqual(0);
    });

    it('Should throw an exception when m is 0.', () => {
      expect(() => ratingMathCeilToMultiple(7, 0)).toThrow(
        `${ELibraryConfig.NAME}(${ERatingConfig.NAME}): ${ERatingErrors.MUST_NOT_BE_A_ZERO}`,
      );
      expect(() => ratingMathCeilToMultiple(0, 0)).toThrow(
        `${ELibraryConfig.NAME}(${ERatingConfig.NAME}): ${ERatingErrors.MUST_NOT_BE_A_ZERO}`,
      );
    });

    it('Should handle the case when n is 0 and m is positive.', () => {
      expect(ratingMathCeilToMultiple(0, 5)).toEqual(0);
      expect(ratingMathCeilToMultiple(0, 1)).toEqual(0);
    });
  });
});
