import PhoneFormatterAbstractCore from './phone-formatter.abstract.core';

/**
 * A class for formatting phone numbers according to Russian standards.
 * @extends PhoneFormatterAbstractCore
 */
export default class PhoneFormatter extends PhoneFormatterAbstractCore {
  private static readonly PLUS_SIGN = '+';
  private static readonly DEFAULT_COUNTRY_CODE = '7';
  private static readonly RUSSIAN_FORMAT_REGEX = /(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/;
  private static readonly INVALID_FIRST_DIGITS = ['1', '2', '3', '4', '5', '6', '9'];

  private readonly separator: string;

  constructor(separator: string = '-') {
    super();
    this.separator = separator;
  }

  protected digitsOnly(value: string): string {
    return value.replace(/\D/g, '');
  }

  protected normalizePhoneNumber(value: string): string {
    const firstDigit = value.charAt(0);

    return PhoneFormatter.INVALID_FIRST_DIGITS.includes(firstDigit)
      ? `7${value}`
      : `7${value.slice(1)}`;
  }

  protected formatCountryCode(countryCode: string): string {
    if (
      countryCode === PhoneFormatter.DEFAULT_COUNTRY_CODE ||
      countryCode === '+' ||
      countryCode === '8'
    ) {
      return `${PhoneFormatter.PLUS_SIGN}${PhoneFormatter.DEFAULT_COUNTRY_CODE} (`;
    }

    return `${PhoneFormatter.PLUS_SIGN}${PhoneFormatter.DEFAULT_COUNTRY_CODE} (${countryCode}`;
  }

  protected formatShortNumber(groups: RegExpMatchArray): string {
    return `${PhoneFormatter.PLUS_SIGN}${groups[1]} (${groups[2]}`;
  }

  protected formatMediumNumber(groups: RegExpMatchArray): string {
    let formattedNumber = `${PhoneFormatter.PLUS_SIGN}${groups[1]} (${groups[2]}) ${groups[3]}`;
    if (groups[3].length === 3) formattedNumber += `${this.separator}${groups[4]}`;
    if (groups[4].length === 2) formattedNumber += `${this.separator}${groups[5]}`;

    return formattedNumber;
  }

  protected formatLongNumber(groups: RegExpMatchArray): string {
    return `${PhoneFormatter.PLUS_SIGN}${groups[1]} (${groups[2]}) ${groups[3]}${
      groups[4] ? `${this.separator}${groups[4]}` : ''
    }${groups[5] ? `${this.separator}${groups[5]}` : ''}`;
  }

  protected formatPhoneNumber(groups: RegExpMatchArray): string {
    let formattedNumber: string;

    if (groups[1] !== '' && !groups[2]) {
      formattedNumber = this.formatCountryCode(groups[2]);
    } else {
      switch (true) {
        case groups[2].length < 3:
          formattedNumber = this.formatShortNumber(groups);
          break;
        case groups[3].length > 0:
          formattedNumber = this.formatMediumNumber(groups);
          break;
        default:
          formattedNumber = this.formatLongNumber(groups);
          break;
      }
    }

    return formattedNumber;
  }

  public format(input: string): string {
    let digits = this.digitsOnly(input).slice(0, 11);

    if (input !== PhoneFormatter.PLUS_SIGN && digits === '') {
      return '';
    }

    digits = this.normalizePhoneNumber(digits);
    const groups = digits.match(PhoneFormatter.RUSSIAN_FORMAT_REGEX);

    if (!groups) {
      return '';
    }

    return this.formatPhoneNumber(groups);
  }
}
