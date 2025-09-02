/**
 * Checks if the current JavaScript environment supports the `BigInt` type.
 *
 * @returns {boolean} - Returns `true` if `BigInt` is supported, otherwise `false`.
 *
 * @example
 * ```ts
 * if (supportBigInt()) {
 *   const big = BigInt(12345678901234567890);
 *   // Use BigInt safely
 * } else {
 *   // Fallback for environments without BigInt support
 * }
 * ```
 */
export default function isSupportBigIntValidator() {
  return typeof BigInt === 'function';
}
