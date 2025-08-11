/**
 * Ariadna UI | Utilities | Clamp
 *
 * Restricts a given value to be within the specified minimum and maximum bounds.
 *
 * Conditions:
 * - If the value is less than the minimum, the minimum is returned.
 * - If the value is greater than the maximum, the maximum is returned.
 * - Otherwise, the value itself is returned.
 *
 * @param {number} min - The lower bound to clamp the value to.
 * @param {number} middle - The value to be clamped between the minimum and maximum.
 * @param {number} max - The upper bound to clamp the value to.
 *
 * @returns {number} - The clamped value, guaranteed to be between min and max (inclusive).
 *
 * @example
 * clamp(0, 5, 10); // returns 5
 * clamp(0, -2, 10); // returns 0
 * clamp(0, 15, 10); // returns 10
 */
declare function clamp(min: number, middle: number, max: number): number;

export default clamp;
