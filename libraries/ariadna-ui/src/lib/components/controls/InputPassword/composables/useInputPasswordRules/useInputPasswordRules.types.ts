import type { ComputedRef } from 'vue';
import type { TInputPasswordRulesByDefault } from '../../types/InputPassword.types';

/**
 * @description
 * Return type for the `useInputPasswordRules` composable function.
 * Contains reactive properties and methods for InputPassword component functionality.
 */
export type TUseInputPasswordRulesReturn = {
  /**
   * Default password validation rules and thresholds used by condition predicates (e.g., minimum length, presence of
   * digits, uppercase letters, special characters).
   */
  rulesByDefault: TInputPasswordRulesByDefault;

  /**
   * Computed collection of rule descriptors that are currently satisfied for the evaluated password. Each descriptor
   * contains a predicate and a human-readable message.
   */
  conditionsComplete: ComputedRef<
    {
      [p: string]: any;
      /**
       * @param {string} value - The password string being evaluated by the descriptor's condition predicate.
       * @param {TInputPasswordRulesByDefault} rules - The default rule configuration used to evaluate the password.
       *
       * @returns {boolean} - true if the condition predicate is satisfied for the given password and rules.
       */
      condition: (value: string, rules: TInputPasswordRulesByDefault) => boolean;

      /**
       * Human-readable message.
       */
      message: string;
    }[]
  >;

  /**
   * Computed collection of rule descriptors that are currently NOT satisfied for the evaluated password.
   * Each descriptor contains a predicate and a human-readable message to help guide the user.
   */
  conditionsNotComplete: ComputedRef<
    {
      [p: string]: any;
      /**
       * @param {string} value - The password string being evaluated by the descriptor's condition predicate.
       * @param {TInputPasswordRulesByDefault} rules - The default rule configuration used to evaluate the password.
       *
       * @returns {boolean} - false for the current password when the condition predicate is not satisfied
       * (hence listed here).
       */
      condition: (value: string, rules: TInputPasswordRulesByDefault) => boolean;

      /**
       * Human-readable message.
       */
      message: string;
    }[]
  >;

  /**
   * Computed strength indicator that reflects how many rules are satisfied (and possibly their weights) on a 0–100
   * scale.
   *
   * @returns {ComputedRef<number>} - A number between 0 and 100 where higher values represent stronger passwords.
   */
  passwordDifficultyPercentage: ComputedRef<number>;
};
