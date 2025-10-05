import type { TInputNumberOptions } from '@/lib/components/controls/InputNumber/types/InputNumber.types';
import type { Numberish } from '@/types';

/**
 * @description
 * Interface for the core formatter logic of the InputNumber component.
 * Provides methods and properties for formatting, sanitizing, and manipulating numeric input values.
 */
export interface IInputNumberFormatterCore {
  /**
   * Options for configuring the input number behavior, such as min, max, step, and formatting rules.
   */
  options: TInputNumberOptions;

  /**
   * The current raw input value, which can be a number or a string representation of a number.
   */
  input: Numberish | null;

  /**
   * The parsed numeric value derived from the input.
   */
  number: Numberish;

  /**
   * Indicates whether the input is in a "clean" state (i.e., sanitized and valid).
   */
  isClean: boolean;

  /**
   * Indicates whether the current input value is negative.
   */
  isInputNegative: boolean;

  /**
   * Regular expression used to sanitize the input value by removing unwanted characters.
   */
  sanitizeRegExp: RegExp;

  /**
   * Regular expression used to validate numeric input.
   */
  numberRegExp: RegExp;

  /**
   * Regular expression used to detect negative numbers in the input.
   */
  negativeRegExp: RegExp;

  /**
   * Cleans the input value, optionally forcing a clean state.
   *
   * @param {boolean} clean - If true, forces the input to be sanitized and set to a clean state.
   * @returns {this} - Returns the current instance for method chaining.
   */
  clean(clean?: boolean): this;

  /**
   * Increments the numeric value according to the configured step.
   *
   * @returns {number} - The incremented numeric value.
   */
  increment(): number;

  /**
   * Decrements the numeric value according to the configured step.
   *
   * @returns {number} - The decremented numeric value.
   */
  decrement(): number;

  /**
   * Formats the given input value into a string representation according to the formatter's rules.
   *
   * @param {Numberish} input - The value to format (number or string).
   * @returns {string | null} - The formatted string representation of the input.
   */
  format(input: Numberish): string | null;

  /**
   * Parses and unformats the given input value, returning its numeric representation or original string if invalid.
   *
   * @param {Numberish} input - The value to unformat (number or string).
   * @returns {number | string} - The numeric value if parsing is successful, otherwise the original string.
   */
  unFormat(input: Numberish): number | string;
}
