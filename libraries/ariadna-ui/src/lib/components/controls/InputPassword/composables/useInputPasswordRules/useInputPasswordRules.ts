import { computed, ref } from 'vue';
import type { TUseInputPasswordRulesReturn } from './useInputPasswordRules.types';
import type { TInputPasswordProps } from '../../InputPassword';
import type {
  TInputPasswordRuleItem,
  TInputPasswordRulesByDefault,
} from '../../types/InputPassword.types';

export default function useInputPasswordRules(
  props: TInputPasswordProps,
): TUseInputPasswordRulesReturn {
  const rules = ref<Array<TInputPasswordRuleItem>>(props.rules!);

  const rulesByDefault: TInputPasswordRulesByDefault = {
    minLength: (value: number) => String(props.modelValue || '').length >= value,
    maxLength: (value: number) => String(props.modelValue || '').length <= value,
    upperCase: () => /\p{Lu}/u.test(String(props.modelValue || '')),
    lowerCase: () => /\p{Ll}/u.test(String(props.modelValue || '')),
    specialSymbols: (symbols: string) => {
      if (!symbols) {
        return true;
      }

      const password = String(props.modelValue || '');

      return symbols.split('').some((char) => password.includes(char));
    },
  };

  const conditionsComplete = computed(() =>
    rules.value.filter((rule) => rule.condition(String(props.modelValue || ''), rulesByDefault)),
  );

  const conditionsNotComplete = computed(() =>
    rules.value.filter((rule) => !rule.condition(String(props.modelValue || ''), rulesByDefault)),
  );

  const passwordDifficultyPercentage = computed(() =>
    rules.value.length === 0 ? 100 : (conditionsComplete.value.length / rules.value.length) * 100,
  );

  return {
    rulesByDefault,
    conditionsComplete,
    conditionsNotComplete,
    passwordDifficultyPercentage,
  };
}
