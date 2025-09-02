import type { IInputNumberFormatterCore } from './input-number.formatter.core.types';
import type { TInputNumberOptions } from '../../types/InputNumber.types';
import type { Numberish } from '@/types';

export default class InputNumberFormatterCore implements IInputNumberFormatterCore {
  options: TInputNumberOptions;
  input: Numberish | null;
  number: Numberish;
  isClean: boolean;
  isInputNegative: boolean;
  sanitizeRegExp: RegExp;
  numberRegExp: RegExp;
  negativeRegExp: RegExp;

  constructor(options: TInputNumberOptions) {
    this.options = options;
    const { prefix, suffix } = this.options;

    this.input = 0;
    this.number = 0;
    this.isInputNegative = false;
    this.isClean = false;

    const escapedPrefix = prefix?.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const escapedSuffix = suffix?.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

    this.sanitizeRegExp = new RegExp(`${escapedPrefix}|${escapedSuffix}`, 'g');
    this.numberRegExp = new RegExp('[^0-9.]+', 'gi');
    this.negativeRegExp = new RegExp('[^0-9\\-.]+', 'gi');
  }

  /**
   * Removes all non-numeric characters from the input, optionally using a custom regular expression.
   *
   * @param {RegExp} regExp - Optional regular expression to use for sanitization.
   *
   * @returns {string} - The sanitized numeric string.
   *
   * @private
   *
   * @example
   * ```ts
   * formatter.input = "$1,234";
   * formatter.numberOnly(); // "1234"
   * ```
   */
  private numberOnly(regExp?: RegExp) {
    return (
      this.input
        ?.toString()
        .replace(this.sanitizeRegExp, '')
        .replace(regExp || this.numberRegExp, '')
        .replace(/^\.+/, '') || ''
    );
  }

  /**
   * Parses the sanitized input as a floating-point number.
   *
   * @returns {number} - The parsed number.
   *
   * @private
   *
   * @example
   * formatter.input = "123.45";
   * formatter.realNumber(); // 123.45
   */
  private realNumber(): number {
    return parseFloat(this.numberOnly());
  }

  /**
   * Checks if the sanitized input is empty or null.
   *
   * @returns {boolean} - True if the input is null or empty, false otherwise.
   *
   * @private
   *
   * @example
   * formatter.input = "";
   * formatter.isNull(); // true
   */
  private isNull() {
    return !this.numberOnly(this.isClean ? this.numberRegExp : this.negativeRegExp);
  }

  /**
   * Parses and formats the input number according to the locale, if specified.
   *
   * @returns {Numberish} - The formatted number as a string or number.
   *
   * @private
   *
   * @example
   * formatter.input = 1234;
   * formatter.numbers(); // "1,234" (if locale is set)
   */
  private numbers() {
    const { locale } = this.options;

    this.number = Number(this.numberOnly());

    if (locale) {
      this.number = new Intl.NumberFormat(locale).format(Number(this.numberOnly()));
    }

    return this.number;
  }

  /**
   * Determines the sign of the input value, considering the "clean" mode.
   *
   * @returns {string | string} - The sign character ("-" or "").
   *
   * @private
   *
   * @example
   * formatter.input = "-123";
   * formatter.sign(); // "-"
   */
  private sign() {
    if (this.input === null || this.input === undefined) {
      return '';
    }

    const hasMinus = this.input.toString().indexOf('-') >= 0;
    if (this.isClean) {
      return hasMinus && this.realNumber() > 0 ? '-' : '';
    }

    return hasMinus ? '-' : '';
  }

  /**
   * Returns whether the current input is negative.
   *
   * @returns {boolean} - True if the input is negative, false otherwise.
   *
   * @private
   *
   * @example
   * formatter.input = "-5";
   * formatter.isNegative(); // true
   */
  private isNegative() {
    return (this.isInputNegative = this.sign() === '-');
  }

  public clean(clean = false) {
    this.isClean = clean;
    return this;
  }

  public increment(): number {
    const { step, max, min } = this.options;
    const newNumber = parseFloat(this.sign() + this.numberOnly()) + Number(step);

    if (min && newNumber < min) {
      return min;
    }

    if (max && newNumber > max) {
      return max;
    }

    return newNumber;
  }

  public decrement(): number {
    const { step, min, max } = this.options;

    const newNumber = parseFloat(this.sign() + this.numberOnly()) - Math.abs(Number(step));

    if (typeof max === 'number' && newNumber > max) {
      return max;
    }

    if (typeof min === 'number' && newNumber < min) {
      return min;
    }

    return newNumber;
  }

  public format(input: Numberish | null): string {
    this.input = input;
    this.isNegative();

    const { empty, prefix, suffix } = this.options;

    if (this.isNull()) {
      return <string>empty;
    }

    const prefixStr = prefix !== undefined ? prefix : '';
    const suffixStr = suffix !== undefined ? suffix : '';

    return prefixStr + this.sign() + this.numbers() + suffixStr;
  }

  public unFormat(input: Numberish): number | string {
    this.input = input;

    const { empty } = this.options;
    const unFormatNumber = this.numberOnly();

    if (this.isNull()) {
      return <string>empty;
    }

    return Number(this.sign() + unFormatNumber);
  }
}
