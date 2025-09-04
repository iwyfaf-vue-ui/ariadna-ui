import { describe, it, expect, beforeEach } from 'vitest';
import InputNumberFormat from '../../core/formatter/input-number.formatter.core';

describe('InputNumberFormat', () => {
  let formatter: InputNumberFormat;

  const baseOptions = {
    prefix: undefined,
    suffix: undefined,
    locale: undefined,
    min: undefined,
    max: undefined,
    step: 1,
    empty: '',
  };

  beforeEach(() => {
    formatter = new InputNumberFormat({ ...baseOptions });
  });

  describe('constructor', () => {
    it('Should initialize with default options.', () => {
      expect(formatter.options).toBeDefined();
      expect(formatter.input).toEqual(0);
      expect(formatter.number).toEqual(0);
      expect(formatter.isClean).toBe(false);
      expect(formatter.isInputNegative).toBe(false);
      expect(formatter.sanitizeRegExp).toBeInstanceOf(RegExp);
      expect(formatter.numberRegExp).toBeInstanceOf(RegExp);
      expect(formatter.negativeRegExp).toBeInstanceOf(RegExp);
    });

    it('Should escape special characters in prefix and suffix.', () => {
      const options = {
        ...baseOptions,
        prefix: '$[₽].',
        suffix: '%^()',
      };
      const fmt = new InputNumberFormat(options);

      // Sanitize prefix
      expect(fmt.sanitizeRegExp.source).toContain('\\$\\[₽\\]\\.');

      // Sanitize suffix
      expect(fmt.sanitizeRegExp.source).toContain('%\\^\\(\\)');
    });
  });

  describe('clean', () => {
    it('Should set isClean flag and return this.', () => {
      const result = formatter.clean(true);

      expect(formatter.isClean).toBe(true);
      expect(result).toBe(formatter);
    });
  });

  describe('increment', () => {
    it('Should increment value by step.', () => {
      formatter.input = 5;
      formatter.options.step = 2;

      expect(formatter.increment()).toBe(7);
    });

    it('Should not increment above max.', () => {
      formatter.input = 9;
      formatter.options.step = 2;
      formatter.options.max = 10;

      expect(formatter.increment()).toBe(10);
    });

    it('Should increment negative value.', () => {
      formatter.input = -3;
      formatter.options.step = 2;

      expect(formatter.increment()).toBe(-1);
    });

    it('Should increment with decimal step.', () => {
      formatter.input = 1.5;
      formatter.options.step = 0.2;

      expect(formatter.increment()).toBeCloseTo(1.7, 5);
    });

    it('Should respect min boundary.', () => {
      formatter.input = 0;
      formatter.options.step = -2;
      formatter.options.min = -5;

      expect(formatter.increment()).toBe(-2);
    });
  });

  describe('decrement', () => {
    it('Should decrement value by step.', () => {
      formatter.input = 5;
      formatter.options.step = 2;

      expect(formatter.decrement()).toBe(3);
    });

    it('Should not decrement below min.', () => {
      formatter.input = 2;
      formatter.options.step = 3;
      formatter.options.min = 0;

      expect(formatter.decrement()).toBe(0);
    });

    it('Should decrement negative value.', () => {
      formatter.input = -3;
      formatter.options.step = 2;

      expect(formatter.decrement()).toBe(-5);
    });

    it('Should decrement with decimal step.', () => {
      formatter.input = 1.5;
      formatter.options.step = 0.2;

      expect(formatter.decrement()).toBeCloseTo(1.3, 5);
    });
  });

  describe('format', () => {
    it('Should format number without prefix/suffix/locale.', () => {
      expect(formatter.format(1234)).toBe('1234');
    });

    it('Should format number with prefix and suffix.', () => {
      formatter.options.prefix = '$';
      formatter.options.suffix = '₽';

      expect(formatter.format(1234)).toBe('$1234₽');
    });

    it('Should format negative number with prefix/suffix.', () => {
      formatter.options.prefix = '!';
      formatter.options.suffix = '?';

      expect(formatter.format(-42)).toBe('!-42?');
    });

    it('Should format number with RU locale.', () => {
      formatter.options.locale = 'ru-RU';

      expect(formatter.format(1234567)).toBe('1 234 567');
    });

    it('Should format number with USA locale.', () => {
      formatter.options.locale = 'en-US';

      expect(formatter.format(1234567)).toBe('1,234,567');
    });

    it('Should format number with locale, prefix, and suffix.', () => {
      formatter.options.locale = 'ru-RU';
      formatter.options.prefix = '₽';
      formatter.options.suffix = 'руб';

      expect(formatter.format(1234567)).toContain('₽');
      expect(formatter.format(1234567)).toContain('руб');
    });

    it('Should return empty if input is empty string.', () => {
      formatter.options.empty = 'EMPTY';

      expect(formatter.format('')).toBe('EMPTY');
    });

    it('Should return empty if input is undefined.', () => {
      formatter.options.empty = 'EMPTY';

      expect(formatter.format(undefined as any)).toBe('EMPTY');
    });

    it('Should format zero.', () => {
      expect(formatter.format(0)).toBe('0');
    });

    it('Should format with first minus sign.', () => {
      expect(formatter.format('-')).toBe('-');
    });

    it('Should format with prefix/suffix containing special characters.', () => {
      formatter.options.prefix = '$[₽].';
      formatter.options.suffix = '%^()';

      expect(formatter.format(123)).toBe('$[₽].123%^()');
    });
  });

  describe('unFormat', () => {
    it('Should unformat string with prefix and suffix.', () => {
      formatter.options.prefix = '$';
      formatter.options.suffix = '₽';

      expect(formatter.unFormat('$123₽')).toBe(123);
    });

    it('Should unformat string with RU locale formatting.', () => {
      formatter.options.locale = 'ru-RU';

      expect(formatter.unFormat('1 234')).toBe(1234);
    });

    it('Should unformat string with USA locale formatting.', () => {
      formatter.options.locale = 'en-US';

      expect(formatter.unFormat('1,234')).toBe(1234);
    });

    it('Should unformat negative number with prefix/suffix.', () => {
      formatter.options.prefix = '!';
      formatter.options.suffix = '?';

      expect(formatter.unFormat('!-42?')).toBe(-42);
    });

    it('Should return empty if input is empty string.', () => {
      formatter.options.empty = 'EMPTY';

      expect(formatter.unFormat('')).toBe('EMPTY');
    });

    it('Should return empty if input is undefined.', () => {
      formatter.options.empty = 'EMPTY';

      expect(formatter.unFormat(undefined as any)).toBe('EMPTY');
    });

    it('Should unformat zero.', () => {
      expect(formatter.unFormat('0')).toBe(0);
    });

    it('Should unformat with first minus sign.', () => {
      expect(formatter.unFormat('-')).toBe('-');
    });

    it('Should unformat with prefix/suffix containing special characters.', () => {
      formatter.options.prefix = '$[₽].';
      formatter.options.suffix = '%^()';

      expect(formatter.unFormat('$[₽].123%^()')).toBe(123);
    });
  });

  describe('edge cases', () => {
    it('Should handle large numbers.', () => {
      expect(formatter.format(123456789012345)).toBe('123456789012345');
      expect(formatter.unFormat('123456789012345')).toBe(123456789012345);
    });

    it('Should handle decimal numbers.', () => {
      expect(formatter.format(1234.56)).toBe('1234.56');
      expect(formatter.unFormat('1234.56')).toBe(1234.56);
    });

    it('Should handle negative decimal numbers.', () => {
      expect(formatter.format(-1234.56)).toBe('-1234.56');
      expect(formatter.unFormat('-1234.56')).toBe(-1234.56);
    });

    it('Should handle input as string.', () => {
      expect(formatter.format('789')).toBe('789');
      expect(formatter.unFormat('789')).toBe(789);
    });

    it('Should handle input with spaces and commas.', () => {
      formatter.options.prefix = '$';
      formatter.options.suffix = '₽';

      expect(formatter.unFormat('$ 1,234 ₽')).toBe(1234);
    });
  });
});
