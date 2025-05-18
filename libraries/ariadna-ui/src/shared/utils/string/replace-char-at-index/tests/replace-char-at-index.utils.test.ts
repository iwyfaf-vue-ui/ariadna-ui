import { describe, it, expect } from 'vitest';
import replaceByIndex from '../replace-char-at-index.utils';

describe('replaceByIndex', () => {
  describe('Valid indices', () => {
    it('Should replace character at the beginning of the string.', () => {
      const result = replaceByIndex('hello', 0, 'H');

      expect(result).toEqual('Hello');
    });

    it('Should replace character in the middle of the string.', () => {
      const result = replaceByIndex('world', 2, 'R');

      expect(result).toEqual('woRld');
    });

    it('Should replace character at the end of the string.', () => {
      const result = replaceByIndex('test', 3, 'X');

      expect(result).toEqual('tesX');
    });

    it('Should handle replacement with multiple characters.', () => {
      const result = replaceByIndex('abc', 1, 'XYZ');

      expect(result).toEqual('aXYZc');
    });
  });

  describe('Invalid indices', () => {
    it('Should return original string when index is negative.', () => {
      const original = 'hello';
      const result = replaceByIndex(original, -1, 'x');

      expect(result).toBe(original);
    });

    it('Should return original string when index equals string length.', () => {
      const original = 'world';
      const result = replaceByIndex(original, original.length, 'x');

      expect(result).toBe(original);
    });

    it('Should return original string when index exceeds string length.', () => {
      const original = 'test';
      const result = replaceByIndex(original, 10, 'x');

      expect(result).toBe(original);
    });
  });

  describe('Edge cases', () => {
    it('Should handle empty string correctly.', () => {
      const original = '';
      const result = replaceByIndex(original, 0, 'x');

      expect(result).toBe(original);
    });

    it('Should handle empty replacement string.', () => {
      const result = replaceByIndex('hello', 1, '');

      expect(result).toEqual('hllo');
    });

    it('Should return original string when replacement is same as original character.', () => {
      const original = 'hello';
      const result = replaceByIndex(original, 1, 'e');

      // Хотя технически это новая строка, семантически она идентична
      expect(result).toEqual(original);
    });
  });
});
