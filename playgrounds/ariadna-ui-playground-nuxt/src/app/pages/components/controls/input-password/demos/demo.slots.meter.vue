<template>
  <InputPassword v-model="inputPasswordValue" label="Custom meter slot" :rules="rules">
    <template #meter="{ percentage, cssClass }">
      <div :class="`${cssClass}__progress-bar`">
        <div :class="`${cssClass}__progress-bar-item`" :style="`width: ${percentage}%`" />
      </div>

      <p v-if="percentage < 50">Слабый</p>
      <p v-else-if="percentage > 51 && percentage < 70">Средний</p>
      <p v-else>Сильный</p>
    </template>
  </InputPassword>
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
