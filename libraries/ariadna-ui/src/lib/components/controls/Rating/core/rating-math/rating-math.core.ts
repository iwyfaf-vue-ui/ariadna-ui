import { ELibraryConfig } from '@/types/internal';
import { ERatingConfig, ERatingErrors } from '../../types/Rating.enums';

/**
 * Rounds a given number up to the nearest multiple of a specified value.
 *
 * @param {number} n - The number to be rounded.
 * @param {number} m - The multiple to which the number should be rounded up.
 *
 * @returns {number} - The smallest multiple of `m` that is greater than or equal to `n`.
 *
 * @example
 * ratingMathCeilToMultiple(7, 5); // Returns 10
 * ratingMathCeilToMultiple(12, 4); // Returns 12
 * ratingMathCeilToMultiple(3, 2); // Returns 4
 */
export default function ratingMathCeilToMultiple(n: number, m: number) {
  if (m === 0) {
    throw new Error(
      `${ELibraryConfig.NAME}(${ERatingConfig.NAME}): ${ERatingErrors.MUST_NOT_BE_A_ZERO}`,
    );
  }

  return Math.ceil(n / m) * m;
}
