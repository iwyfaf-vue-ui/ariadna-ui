export default abstract class PhoneFormatterAbstract {
  /**
   * Removes all non-digit characters from the input string.
   *
   * @protected
   * @param {string} value - The input string containing phone number digits.
   * @returns {string} A string containing only digits.
   *
   * @example
   * const formatter = new PhoneFormatter();
   * const digitsOnly = formatter.digitsOnly('+7 (912) 345-67-89');
   *
   * console.log(digitsOnly); // Output: "79123456789"
   */
  protected abstract digitsOnly(value: string): string;

  /**
   * Normalizes the phone number by ensuring it starts with the default country code.
   *
   * @protected
   * @param {string} value - The input phone number string.
   * @returns {string} A normalized phone number string.
   *
   * @example
   * const formatter = new PhoneFormatter();
   * const normalizedNumber = formatter.normalizePhoneNumber('9123456789');
   *
   * console.log(normalizedNumber); // Output: "79123456789"
   */
  protected abstract normalizePhoneNumber(value: string): string;

  /**
   * Formats the country code part of the phone number.
   *
   * @protected
   * @param {string} countryCode - The country code to format.
   * @returns {string} The formatted country code string.
   *
   * @example
   * const formatter = new PhoneFormatter();
   * const formattedCountryCode = formatter.formatCountryCode('7');
   *
   * console.log(formattedCountryCode); // Output: "+7 ("
   */
  protected abstract formatCountryCode(countryCode: string): string;

  /**
   * Formats a short phone number.
   *
   * @protected
   * @param {RegExpMatchArray} groups - The matched groups from the phone number regex.
   * @returns {string} The formatted short phone number string.
   *
   * @example
   * const formatter = new PhoneFormatter();
   * const formattedShortNumber = formatter.formatShortNumber(['7', '912', '', '', '']);
   *
   * console.log(formattedShortNumber); // Output: "+7 (912"
   */
  protected abstract formatShortNumber(groups: RegExpMatchArray): string;

  /**
   * Formats a medium-length phone number.
   *
   * @protected
   * @param {RegExpMatchArray} groups - The matched groups from the phone number regex.
   * @returns {string} The formatted medium-length phone number string.
   *
   * @example
   * const formatter = new PhoneFormatter();
   * const formattedMediumNumber = formatter.formatMediumNumber(['7', '912', '345', '67', '']);
   *
   * console.log(formattedMediumNumber); // Output: "+7 (912) 345-67"
   */
  protected abstract formatMediumNumber(groups: RegExpMatchArray): string;

  /**
   * Formats a long phone number.
   *
   * @protected
   * @param {RegExpMatchArray} groups - The matched groups from the phone number regex.
   * @returns {string} The formatted long phone number string.
   *
   * @example
   * const formatter = new PhoneFormatter();
   * const formattedLongNumber = formatter.formatLongNumber(['7', '912', '345', '67', '89']);
   *
   * console.log(formattedLongNumber); // Output: "+7 (912) 345-67-89"
   */
  protected abstract formatLongNumber(groups: RegExpMatchArray): string;

  /**
   * Formats the phone number based on the matched groups.
   *
   * @protected
   * @param {RegExpMatchArray} groups - The matched groups from the phone number regex.
   * @returns {string} The formatted phone number string.
   *
   * @example
   * const formatter = new PhoneFormatter();
   * const formattedNumber = formatter.formatPhoneNumber(['7', '912', '345', '67', '89']);
   *
   * console.log(formattedNumber); // Output: "+7 (912) 345-67-89"
   */
  protected abstract formatPhoneNumber(groups: RegExpMatchArray): string;

  /**
   * Formats the input phone number string.
   *
   * @param {string} input - The input phone number string.
   * @returns {string} The formatted phone number string.
   *
   * @example
   * const formatter = new PhoneFormatter();
   * const formattedNumber = formatter.format('+79123456789');
   *
   * console.log(formattedNumber); // Output: "+7 (912) 345-67-89"
   */
  abstract format(input: string): string;
}
