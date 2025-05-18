import { describe, it, expect, beforeEach } from 'vitest';
import PhoneFormatter from '../../core/phone-formatter/phone-formatter.core';

describe('PhoneFormatter', () => {
  let formatter: PhoneFormatter;

  beforeEach(() => {
    formatter = new PhoneFormatter();
  });

  describe('constructor', () => {
    const customSeparator = '_';

    it('Should initialize with default separator correctly.', () => {
      expect(formatter).toBeDefined();

      expect(formatter['separator']).toEqual('-');
    });

    it('Should initialize with custom separator correctly.', () => {
      const formatter = new PhoneFormatter(customSeparator);

      expect(formatter).toBeDefined();
      expect(formatter['separator']).toEqual(customSeparator);
    });
  });

  describe('constants', () => {
    it('Should have correct PLUS_SIGN constant.', () => {
      expect(PhoneFormatter['PLUS_SIGN']).toEqual('+');
    });

    it('Should have correct DEFAULT_COUNTRY_CODE constant.', () => {
      expect(PhoneFormatter['DEFAULT_COUNTRY_CODE']).toEqual('7');
    });

    it('Should have correct RUSSIAN_FORMAT_REGEX constant.', () => {
      const regex = PhoneFormatter['RUSSIAN_FORMAT_REGEX'];

      expect('1234567890'.match(regex)).toBeTruthy();
      expect('123'.match(regex)).toBeTruthy();
    });

    it('Should have correct INVALID_FIRST_DIGITS constant.', () => {
      expect(PhoneFormatter['INVALID_FIRST_DIGITS']).toEqual(['1', '2', '3', '4', '5', '6', '9']);
    });
  });

  describe('protected method digitsOnly', () => {
    const testProtectedMethod = (value: string) => {
      return (formatter as any).digitsOnly(value);
    };

    it('Should return empty string when input contains no digits.', () => {
      expect(testProtectedMethod('abc-+ ()')).toEqual('');
    });

    it('Should return only digits from mixed input.', () => {
      expect(testProtectedMethod('a1b2c3-+ ()4')).toEqual('1234');
    });

    it('Should return all digits when input contains only digits.', () => {
      expect(testProtectedMethod('1234567890')).toEqual('1234567890');
    });

    it('Should handle input with plus sign correctly.', () => {
      expect(testProtectedMethod('+7 (123) 456-78-90')).toEqual('71234567890');
    });
  });

  describe('protected method normalizePhoneNumber', () => {
    const testProtectedMethod = (value: string) => {
      return (formatter as any).normalizePhoneNumber(value);
    };

    it('Should add default country code when first digit is invalid.', () => {
      PhoneFormatter['INVALID_FIRST_DIGITS'].forEach((digit) => {
        expect(testProtectedMethod(digit + '234567890')).toEqual('7' + digit + '234567890');
      });
    });

    it('Should replace first digit with default country code when it is valid (7 or 8).', () => {
      expect(testProtectedMethod('71234567890')).toEqual('71234567890');
      expect(testProtectedMethod('81234567890')).toEqual('71234567890');
    });

    it('Should handle empty string.', () => {
      expect(testProtectedMethod('')).toEqual('7');
    });
  });

  describe('protected method formatCountryCode', () => {
    const testProtectedMethod = (value: string) => {
      return (formatter as any).formatCountryCode(value);
    };

    it('Should format default country code with plus sign and opening bracket.', () => {
      expect(testProtectedMethod('7')).toEqual('+7 (');
      expect(testProtectedMethod('+')).toEqual('+7 (');
      expect(testProtectedMethod('8')).toEqual('+7 (');
    });

    it('Should format non-default country code with plus sign and opening bracket.', () => {
      expect(testProtectedMethod('1')).toEqual('+7 (1');
    });
  });

  describe('protected method formatShortNumber', () => {
    const testProtectedMethod = (groups: RegExpMatchArray) => {
      return (formatter as any).formatShortNumber(groups);
    };

    it('Should format short numbers with country code and opening bracket.', () => {
      const groups = ['', '7', '12', '', '', ''];
      expect(testProtectedMethod(groups as RegExpMatchArray)).toEqual('+7 (12');
    });
  });

  describe('protected method formatMediumNumber', () => {
    const testProtectedMethod = (groups: RegExpMatchArray) => {
      return (formatter as any).formatMediumNumber(groups);
    };

    it('Should format medium numbers with country code, area code and separator.', () => {
      const groups1 = ['', '7', '123', '456', '78', ''];
      expect(testProtectedMethod(groups1 as RegExpMatchArray)).toEqual('+7 (123) 456-78-');

      const groups2 = ['', '7', '123', '456', '', ''];
      expect(testProtectedMethod(groups2 as RegExpMatchArray)).toEqual('+7 (123) 456-');
    });
  });

  describe('protected method formatLongNumber', () => {
    const testProtectedMethod = (groups: RegExpMatchArray) => {
      return (formatter as any).formatLongNumber(groups);
    };

    it('Should format long numbers with all parts and separators.', () => {
      const groups1 = ['', '7', '123', '456', '78', '90'];
      expect(testProtectedMethod(groups1 as RegExpMatchArray)).toEqual('+7 (123) 456-78-90');

      const groups2 = ['', '7', '123', '456', '78', ''];
      expect(testProtectedMethod(groups2 as RegExpMatchArray)).toEqual('+7 (123) 456-78');
    });
  });

  describe('protected method formatPhoneNumber', () => {
    const testProtectedMethod = (groups: RegExpMatchArray) => {
      return (formatter as any).formatPhoneNumber(groups);
    };

    it('Should select short number format for numbers with area code length less than 3.', () => {
      const groups = ['', '7', '12', '', '', ''];
      expect(testProtectedMethod(groups as RegExpMatchArray)).toEqual('+7 (12');
    });

    it('Should select medium number format for numbers with exchange code.', () => {
      const groups = ['', '7', '123', '456', '78', ''];
      expect(testProtectedMethod(groups as RegExpMatchArray)).toEqual('+7 (123) 456-78-');
    });

    it('Should select long number format for complete numbers.', () => {
      const groups = ['', '7', '123', '456', '78', '90'];
      expect(testProtectedMethod(groups as RegExpMatchArray)).toEqual('+7 (123) 456-78-90');
    });
  });

  describe('formatInput', () => {
    it('Should return empty string for empty input.', () => {
      expect(new PhoneFormatter().format('')).toEqual('');
    });

    it('Should format partial phone number correctly.', () => {
      expect(new PhoneFormatter().format('123')).toEqual('+7 (123) ');
    });

    it('Should format complete phone number correctly.', () => {
      expect(new PhoneFormatter().format('1234567890')).toEqual('+7 (123) 456-78-90');
    });

    it('Should preserve non-digit characters during formatting.', () => {
      expect(new PhoneFormatter().format('1a2b3c')).toEqual('+7 (123) ');
    });

    it('Should use custom separator when provided.', () => {
      expect(new PhoneFormatter('_').format('71234567890')).toEqual('+7 (123) 456_78_90');
    });

    it('Should return "+7 (" for just "+" input.', () => {
      expect(new PhoneFormatter().format('+')).toEqual('+7 (');
    });

    it('Should return empty string for empty input.', () => {
      expect(new PhoneFormatter().format('')).toEqual('');
    });

    it('Should normalize number starting with 8.', () => {
      expect(new PhoneFormatter().format('89123456789')).toEqual('+7 (912) 345-67-89');
    });

    it('Should add country code for numbers starting with invalid digit.', () => {
      expect(new PhoneFormatter().format('1234567890')).toEqual('+7 (123) 456-78-90');
    });

    it('Should not add country code for numbers starting with 7.', () => {
      expect(new PhoneFormatter().format('71234567890')).toEqual('+7 (123) 456-78-90');
    });

    it('Should handle numbers with non-digit characters.', () => {
      expect(new PhoneFormatter().format('8 (912) 345-67-89')).toEqual('+7 (912) 345-67-89');
    });
  });

  describe('formatInput - various phone number formats', () => {
    const testCases = [
      {
        input: '1234567890',
        expected: '+7 (123) 456-78-90',
        description: 'Simple 10-digit number',
      },
      {
        input: '+1234567890',
        expected: '+7 (123) 456-78-90',
        description: 'International format with +7',
      },
      {
        input: '+7 123 456 78 90',
        expected: '+7 (123) 456-78-90',
        description: 'Spaced international format',
      },
      {
        input: '71234567890',
        expected: '+7 (123) 456-78-90',
        description: 'International format without +',
      },
      {
        input: '81234567890',
        expected: '+7 (123) 456-78-90',
        description: 'National format with 8',
      },
      {
        input: '8(123)456-78-90',
        expected: '+7 (123) 456-78-90',
        description: 'National format with parentheses and dashes',
      },
      {
        input: '8-123-456-78-90',
        expected: '+7 (123) 456-78-90',
        description: 'National format with dashes',
      },
      {
        input: '8 123 4567 890',
        expected: '+7 (123) 456-78-90',
        description: 'National format with unusual spacing',
      },
      {
        input: '8 123 45 67 890',
        expected: '+7 (123) 456-78-90',
        description: 'National format with digit grouping',
      },
      {
        input: '8 123 45 678 90',
        expected: '+7 (123) 456-78-90',
        description: 'Alternative digit grouping',
      },
      {
        input: '8 123 456 78 90',
        expected: '+7 (123) 456-78-90',
        description: 'Another digit grouping variant',
      },
      {
        input: '+7(123)4567890',
        expected: '+7 (123) 456-78-90',
        description: 'Moscow city format with +7',
      },
      {
        input: '7(123)4567890',
        expected: '+7 (123) 456-78-90',
        description: 'Moscow city format without +',
      },
      {
        input: '(123)4567890',
        expected: '+7 (123) 456-78-90',
        description: 'Moscow city format without country code',
      },
      {
        input: '+7(123) 456 78 90',
        expected: '+7 (123) 456-78-90',
        description: 'Moscow city format with spaces',
      },
      {
        input: '7(123) 456 78 90',
        expected: '+7 (123) 456-78-90',
        description: 'Moscow city format with spaces without +',
      },
      {
        input: '+71234567890',
        expected: '+7 (123) 456-78-90',
        description: 'Other region with +7',
      },
      {
        input: '+71234567890',
        expected: '+7 (123) 456-78-90',
        description: 'Other region with +7',
      },
      {
        input: '+72261234567',
        expected: '+7 (226) 123-45-67',
        description: 'Other region with +7',
      },
      {
        input: '4261234567',
        expected: '+7 (426) 123-45-67',
        description: 'Other region without country code',
      },
      {
        input: '4961234567',
        expected: '+7 (496) 123-45-67',
        description: 'Other region without country code',
      },
      {
        input: '4761234567',
        expected: '+7 (476) 123-45-67',
        description: 'Other region without country code',
      },
    ];

    testCases.forEach(({ input, expected, description }) => {
      it(`Should format "${input}" as "${expected}". ${description}`, () => {
        expect(new PhoneFormatter().format(input)).toEqual(expected);
      });
    });
  });

  describe('Edge cases', () => {
    it('Should not handle input with only non-digit characters.', () => {
      expect(new PhoneFormatter().format('abc')).toEqual('');
    });

    it('Should handle very long input.', () => {
      const longNumber = '123456789012345678901234567890';

      expect(new PhoneFormatter().format(longNumber)).toEqual('+7 (123) 456-78-90');
    });

    it('Should handle special characters in input.', () => {
      expect(new PhoneFormatter().format('!@#$%^&*()')).toEqual('');
    });

    it('Should handle mixed content in pasted value.', () => {
      expect(new PhoneFormatter().format('8 (912) abc 345 def 67 ghi 89')).toEqual(
        '+7 (912) 345-67-89',
      );
    });

    it('Should handle numbers starting with multiple invalid digits.', () => {
      expect(new PhoneFormatter().format('112233')).toEqual('+7 (112) 233-');
    });
  });

  describe('Special cases', () => {
    it('Should handle incomplete city code format', () => {
      expect(new PhoneFormatter().format('8(926)123')).toEqual('+7 (926) 123-');
    });

    it('Should handle partial input with mixed formatting', () => {
      expect(new PhoneFormatter().format('8 926 12')).toEqual('+7 (926) 12');
    });

    it('Should handle input with many non-digit characters', () => {
      expect(new PhoneFormatter().format('+7 -- (9 2 6) abc 123 def 45 ghi 67')).toEqual(
        '+7 (926) 123-45-67',
      );
    });
  });
});
