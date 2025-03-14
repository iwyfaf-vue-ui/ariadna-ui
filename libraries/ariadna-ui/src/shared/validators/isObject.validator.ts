/**
 * @description Checks if the provided value is a plain object.
 * @param {Record<string, any>} object - The value to check.
 * @returns {boolean} - Returns `true` if the value is a non-null, non-array object; otherwise, returns `false`.
 *
 * @example
 * // Returns true
 * isObject({ key: 'value' });
 *
 * @example
 * // Returns false
 * isObject(null);
 *
 * @example
 * // Returns false
 * isObject([1, 2, 3]);
 *
 * @example
 * // Returns false
 * isObject('string');
 */
export default function isObjectValidator(object: Record<string, any>): boolean {
  return object !== null && !Array.isArray(object) && typeof object === 'object';
}
