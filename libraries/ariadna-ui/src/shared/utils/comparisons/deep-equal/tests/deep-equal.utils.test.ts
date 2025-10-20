import { describe, it, expect } from 'vitest';
import { deepEqual, deepEqualArrays, deepEqualObjects } from '../deep-equal.utils';

describe('deepEqual', () => {
  describe('Primitive comparison', () => {
    it('Should return true for equal primitives.', () => {
      expect(deepEqual(1, 1)).toBe(true);
      expect(deepEqual('a', 'a')).toBe(true);
      expect(deepEqual(null, null)).toBe(true);
      expect(deepEqual(undefined, undefined)).toBe(true);
      expect(deepEqual(true, true)).toBe(true);
    });

    it('Should return false for different primitives.', () => {
      expect(deepEqual(1, 2)).toBe(false);
      expect(deepEqual('a', 'b')).toBe(false);
      expect(deepEqual(null, undefined)).toBe(false);
      expect(deepEqual(true, false)).toBe(false);
    });
  });

  describe('Object and array comparison', () => {
    it('Should return true for deeply equal objects.', () => {
      expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    });

    it('Should return false for different objects.', () => {
      expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('Should return true for deeply equal arrays.', () => {
      expect(deepEqual([1, 2, [3]], [1, 2, [3]])).toBe(true);
    });

    it('Should return false for different arrays.', () => {
      expect(deepEqual([1, 2], [2, 1])).toBe(false);
    });

    it('Should return false for mismatched types (object vs array).', () => {
      expect(deepEqual({ a: 1 }, [1])).toBe(false);
      expect(deepEqual([1], { a: 1 })).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('Should return false for different types.', () => {
      expect(deepEqual(1, '1')).toBe(false);
      expect(deepEqual({}, [])).toBe(false);
      expect(deepEqual([], {})).toBe(false);
    });

    it('Should return false for NaN compared to NaN.', () => {
      expect(deepEqual(NaN, NaN)).toBe(false); // JS: NaN !== NaN
    });
  });
});

describe('compareArrays', () => {
  describe('Basic comparison', () => {
    it('Should return true for two empty arrays.', () => {
      expect(deepEqualArrays([], [])).toBe(true);
    });

    it('Should return false for arrays of different lengths.', () => {
      expect(deepEqualArrays([1], [1, 2])).toBe(false);
    });

    it('Should return true for arrays with equal primitive values.', () => {
      expect(deepEqualArrays([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it('Should return false for arrays with different primitive values.', () => {
      expect(deepEqualArrays([1, 2, 3], [1, 2, 4])).toBe(false);
    });
  });

  describe('Nested objects and arrays', () => {
    it('Should return true for arrays with deeply equal objects.', () => {
      expect(deepEqualArrays([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
    });

    it('Should return false for arrays with different nested objects.', () => {
      expect(deepEqualArrays([{ a: 1 }], [{ a: 2 }])).toBe(false);
    });

    it('Should return true for arrays with deeply equal arrays.', () => {
      expect(deepEqualArrays([[1, 2], [3]], [[1, 2], [3]])).toBe(true);
    });

    it('Should return false for arrays with different nested arrays.', () => {
      expect(deepEqualArrays([[1, 2]], [[2, 1]])).toBe(false);
    });

    it('Should return true for mixed nested objects and arrays.', () => {
      expect(deepEqualArrays([{ a: [1, 2] }], [{ a: [1, 2] }])).toBe(true);
    });

    it('Should return false for mixed nested objects and arrays with differences.', () => {
      expect(deepEqualArrays([{ a: [1, 2] }], [{ a: [2, 1] }])).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('Should handle null and undefined correctly.', () => {
      expect(deepEqualArrays([null], [null])).toBe(true);
      expect(deepEqualArrays([undefined], [undefined])).toBe(true);
      expect(deepEqualArrays([null], [undefined])).toBe(false);
    });

    it('Should return false for mismatched types at same index.', () => {
      expect(deepEqualArrays([1], ['1'])).toBe(false);
      expect(deepEqualArrays([{ a: 1 }], [1])).toBe(false);
      expect(deepEqualArrays([[1]], [{ a: 1 }])).toBe(false);
    });

    it('Should return true for arrays with NaN in the same position.', () => {
      expect(deepEqualArrays([NaN], [NaN])).toBe(false); // JS: NaN !== NaN
    });
  });
});

describe('compareObjects', () => {
  describe('Key and value comparison', () => {
    it('Should return true for two empty objects.', () => {
      expect(deepEqualObjects({}, {})).toBe(true);
    });

    it('Should return false for objects with different number of keys.', () => {
      expect(deepEqualObjects({ a: 1 }, {})).toBe(false);
    });

    it('Should return false for objects with different keys.', () => {
      expect(deepEqualObjects({ a: 1 }, { b: 1 })).toBe(false);
    });

    it('Should return true for objects with same keys and primitive values.', () => {
      expect(deepEqualObjects({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });

    it('Should return false for objects with same keys but different primitive values.', () => {
      expect(deepEqualObjects({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });
  });

  describe('Nested objects and arrays', () => {
    it('Should return true for objects with deeply equal objects as values.', () => {
      expect(deepEqualObjects({ a: { x: 1 } }, { a: { x: 1 } })).toBe(true);
    });

    it('Should return false for objects with different nested objects.', () => {
      expect(deepEqualObjects({ a: { x: 1 } }, { a: { x: 2 } })).toBe(false);
    });

    it('Should return true for objects with deeply equal arrays as values.', () => {
      expect(deepEqualObjects({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
    });

    it('Should return false for objects with different nested arrays.', () => {
      expect(deepEqualObjects({ a: [1, 2] }, { a: [2, 1] })).toBe(false);
    });

    it('Should return true for mixed nested objects and arrays.', () => {
      expect(deepEqualObjects({ a: { b: [1, 2] } }, { a: { b: [1, 2] } })).toBe(true);
    });

    it('Should return false for mixed nested objects and arrays with differences.', () => {
      expect(deepEqualObjects({ a: { b: [1, 2] } }, { a: { b: [2, 1] } })).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('Should handle null and undefined values.', () => {
      expect(deepEqualObjects({ a: null }, { a: null })).toBe(true);
      expect(deepEqualObjects({ a: undefined }, { a: undefined })).toBe(true);
      expect(deepEqualObjects({ a: null }, { a: undefined })).toBe(false);
    });

    it('Should return false for mismatched types in values.', () => {
      expect(deepEqualObjects({ a: 1 }, { a: '1' })).toBe(false);
      expect(deepEqualObjects({ a: [1] }, { a: { x: 1 } })).toBe(false);
    });

    it('Should return true for objects with same keys in different order.', () => {
      expect(deepEqualObjects({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });
  });
});
