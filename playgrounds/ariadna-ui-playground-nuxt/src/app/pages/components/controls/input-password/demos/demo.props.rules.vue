<template>
  <InputPassword v-model="inputPasswordValue" label="Associated label" :rules="rules" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';
import type { TInputPasswordRuleItem } from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
const rules: Array<TInputPasswordRuleItem> = [
  { condition: (_, rules) => rules.minLength(8), message: 'Минимальная длина 8 символов.' },
  {
    condition: (_, rules) => rules.lowerCase(),
    message: 'Пароль не содержит символы нижнего регистра.',
  },
  {
    condition: (_, rules) => rules.upperCase(),
    message: 'Пароль не содержит символы большого регистра.',
  },
  {
    condition: (_, rules) => rules.specialSymbols('_'),
    message: 'Пароль не содержит специальных символов: _.',
  },
  {
    condition: (value) => /[0-9]/.test(String(value ?? '')),
    message: 'Пароль должен содержать хотя бы одну цифру.',
  },
];
</script>
