import { describe, it, expect } from 'vitest';
import mergeStrings from '../merge-strings.utils';

describe('mergeStrings', () => {
  describe('Basic functionality', () => {
    it('Should return original string when new string is empty.', () => {
      const original = 'hello';
      const newStr = '';

      expect(mergeStrings(original, newStr)).toEqual(original);
    });

    it('Should return new string when both strings have same length.', () => {
      const original = 'hello';
      const newStr = 'world';

      expect(mergeStrings(original, newStr)).toEqual(newStr);
    });

    it('Should merge strings correctly when new string is shorter.', () => {
      const original = 'hello';
      const newStr = 'hi';

      expect(mergeStrings(original, newStr)).toEqual('hillo');
    });
  });

  describe('Edge cases', () => {
    it('Should return empty string when original string is empty.', () => {
      expect(mergeStrings('', 'test')).toEqual('');
    });

    it('Should handle strings with different character types.', () => {
      const original = 'abc123';
      const newStr = 'xyz';
      expect(mergeStrings(original, newStr)).toEqual('xyz123');
    });

    it('Should handle unicode characters correctly.', () => {
      const original = 'héllo';
      const newStr = 'hî';
      expect(mergeStrings(original, newStr)).toEqual('hîllo');
    });
  });

  describe('Type safety', () => {
    it('Should throw error when originalStr is null.', () => {
      // @ts-expect-error - testing invalid input
      expect(() => mergeStrings(null, 'test')).toThrow();
    });

    it('Should return empty string when originalStr is number.', () => {
      // @ts-expect-error - testing invalid input
      expect(mergeStrings(123, 'test')).toEqual('');
    });

    it('Should return empty string when originalStr is boolean.', () => {
      // @ts-expect-error - testing invalid input
      expect(mergeStrings(false, 'test')).toEqual('');

      // @ts-expect-error - testing invalid input
      expect(mergeStrings(true, 'test')).toEqual('');
    });

    it('Should return empty string when originalStr is object.', () => {
      // @ts-expect-error - testing invalid input
      expect(mergeStrings({}, 'test')).toEqual('');
    });

    it('Should return empty string when originalStr is array.', () => {
      // @ts-expect-error - testing invalid input
      expect(mergeStrings([], 'test')).toEqual('');
    });

    it('Should throw error when newStr is not a string.', () => {
      // @ts-expect-error - testing invalid input
      expect(() => mergeStrings('test', null)).toThrow();
      // @ts-expect-error - testing invalid input
      expect(() => mergeStrings('test', 123)).toThrow();
      // @ts-expect-error - testing invalid input
      expect(() => mergeStrings('test', false)).toThrow();
      // @ts-expect-error - testing invalid input
      expect(() => mergeStrings('test', true)).toThrow();
      // @ts-expect-error - testing invalid input
      expect(() => mergeStrings('test', {})).toThrow();
      // @ts-expect-error - testing invalid input
      expect(() => mergeStrings('test', [])).toThrow();
    });
  });
});
