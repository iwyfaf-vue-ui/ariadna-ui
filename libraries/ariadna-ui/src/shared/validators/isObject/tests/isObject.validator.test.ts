import { describe, it, expect } from 'vitest';
import isObjectValidator from '../isObject.validator';

describe('isObjectValidator', () => {
  describe('Plain objects', () => {
    it('Should return true for a simple object.', () => {
      expect(isObjectValidator({})).toBe(true);
      expect(isObjectValidator({ key: 'value' })).toBe(true);
    });

    it('Should return true for an object created with Object.create(null).', () => {
      const obj = Object.create(null);

      expect(isObjectValidator(obj)).toBe(true);
    });
  });

  describe('Class instances', () => {
    it('Should return true for a Date instance.', () => {
      expect(isObjectValidator(new Date())).toBe(true);
    });

    it('Should return true for a Map instance.', () => {
      expect(isObjectValidator(new Map())).toBe(true);
    });

    it('Should return true for an Error instance.', () => {
      expect(isObjectValidator(new Error('test'))).toBe(true);
    });

    it('Should return true for a custom class instance.', () => {
      class Custom {}

      expect(isObjectValidator(new Custom())).toBe(true);
    });
  });

  describe('Non-object values', () => {
    it('Should return false for null.', () => {
      expect(isObjectValidator(null as any)).toBe(false);
    });

    it('Should return false for arrays.', () => {
      expect(isObjectValidator([])).toBe(false);
      expect(isObjectValidator([1, 2, 3])).toBe(false);
    });

    it('Should return false for functions.', () => {
      expect(isObjectValidator(function () {})).toBe(false);
      expect(isObjectValidator(() => {})).toBe(false);
    });

    it('Should return false for strings.', () => {
      expect(isObjectValidator('string' as any)).toBe(false);
    });

    it('Should return false for numbers.', () => {
      expect(isObjectValidator(42 as any)).toBe(false);
    });

    it('Should return false for booleans.', () => {
      expect(isObjectValidator(true as any)).toBe(false);
      expect(isObjectValidator(false as any)).toBe(false);
    });

    it('Should return false for undefined.', () => {
      expect(isObjectValidator(undefined as any)).toBe(false);
    });

    it('Should return false for symbols.', () => {
      expect(isObjectValidator(Symbol('sym') as any)).toBe(false);
    });

    it('Should return false for bigint.', () => {
      expect(isObjectValidator(BigInt(10) as any)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('Should return false if called with no arguments.', () => {
      expect(isObjectValidator(undefined as any)).toBe(false);
    });
  });
});
