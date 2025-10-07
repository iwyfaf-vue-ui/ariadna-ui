/**
 * Default, reusable password validation helpers that operate on a password value and return boolean results for
 * specific constraints. These helpers are intended to be passed into higher-level rule definitions to compose complex
 * password policies.
 */
export type TInputPasswordRulesByDefault = {
  /**
   * Checks that the bound password length is greater than or equal to the provided minimum length.
   *
   * @param {number} value - The minimum allowed length for the password.
   *
   * @returns {boolean} - True if the password length is at least the specified minimum; otherwise, false.
   */
  minLength: (value: number) => boolean;

  /**
   * Checks that the bound password length is less than or equal to the provided maximum length.
   *
   * @param {number} value - The maximum allowed length for the password.
   *
   * @returns {boolean} - True if the password length is at most the specified maximum; otherwise, false.
   */
  maxLength: (value: number) => boolean;

  /**
   * Checks that the bound password contains at least one uppercase Latin character (A-Z).
   *
   * @returns {boolean} - True if at least one uppercase character is present; otherwise, false.
   */
  upperCase: () => boolean;

  /**
   * Checks that the bound password contains at least one lowercase Latin character (a-z).
   *
   * @returns {boolean} - True if at least one lowercase character is present; otherwise, false.
   */
  lowerCase: () => boolean;

  /**
   * Checks that the bound password contains at least one character from the provided set of symbols.
   *
   * @param {string} symbols - A string containing the set of special symbols to test for (e.g., "!@#$%^&*").
   *
   * @returns {boolean} - True if at least one of the provided symbols is present; otherwise, false.
   */
  specialSymbols: (symbols: string) => boolean;
};

/**
 * Describes a single password rule item containing a predicate to validate a password and a related user-facing
 * message. Additional properties may be supplied for metadata or UI needs.
 */
export type TInputPasswordRuleItem = {
  /**
   * Predicate that validates the provided password against one or more default helper rules.
   *
   * @param {string} value - The password string to validate.
   * @param {TInputPasswordRulesByDefault} rules - A helper collection with default rule predicates bound to the
   * password context.
   *
   * @returns {boolean} - True if the password satisfies the rule; otherwise, false.
   */
  condition: (value: string, rules: TInputPasswordRulesByDefault) => boolean;

  /**
   * A human-readable message explaining the requirement or the reason for failure when the condition is not met.
   */
  message: string;

  /**
   * Optional, extensible metadata bag for UI or analytics (e.g., severity, code, i18n keys). Any additional
   * string-keyed properties can be attached to the rule item as needed.
   */
  [key: string]: any;
};
