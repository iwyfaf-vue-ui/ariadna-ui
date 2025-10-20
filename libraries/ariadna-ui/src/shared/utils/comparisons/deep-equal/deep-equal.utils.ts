/**
 * Performs a deep equality check between two values, supporting primitives, arrays, and plain objects.
 *
 * @param a - The first value to compare. Can be of any type.
 * @param b - The second value to compare. Can be of any type.
 * @returns {boolean} - `true` if both values are deeply equal, otherwise `false`.
 *
 * @example
 * deepEqual({ x: 1, y: [2, 3] }, { x: 1, y: [2, 3] }); // true
 * deepEqual([1, 2], [1, 2]); // true
 * deepEqual({ a: 1 }, { a: 2 }); // false
 * deepEqual(null, null); // true
 * deepEqual(undefined, null); // false
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  // Handle nulls
  if (a === null || b === null) {
    return a === b;
  }

  // Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  // Objects (but not arrays)
  if (typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }

      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  // Fallback for other types (functions, symbols, etc.)
  return false;
}

/**
 * Checks deep equality between two arrays.
 *
 * @param {any[]} a - The first array to compare.
 * @param {any[]} b - The second array to compare.
 * @returns {boolean} - `true` if both arrays are deeply equal, otherwise `false`.
 *
 * @example
 * deepEqualArrays([1, 2], [1, 2]); // true
 * deepEqualArrays([1, { x: 2 }], [1, { x: 2 }]); // true
 * deepEqualArrays([1, 2], [2, 1]); // false
 */
export function deepEqualArrays(a: any[], b: any[]) {
  return deepEqual(a, b);
}

/**
 * Checks deep equality between two plain objects.
 *
 * @param {Record<string, any>} a - The first object to compare.
 * @param {Record<string, any>} b - The second object to compare.
 * @returns {boolean} - `true` if both objects are deeply equal, otherwise `false`.
 *
 * @example
 * deepEqualObjects({ a: 1 }, { a: 1 }); // true
 * deepEqualObjects({ a: 1 }, { a: 2 }); // false
 * deepEqualObjects({ a: { b: 2 } }, { a: { b: 2 } }); // true
 */
export function deepEqualObjects(a: Record<string, any>, b: Record<string, any>) {
  return deepEqual(a, b);
}
