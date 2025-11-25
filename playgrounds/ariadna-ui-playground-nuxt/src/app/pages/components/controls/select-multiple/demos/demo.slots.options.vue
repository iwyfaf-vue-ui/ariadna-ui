<template>
  <SelectMultiple v-model="selectMultipleValue" :options="options" label="Custom options slot">
    <template #options="{ option, checked }">
      <Checkbox :model-value="checked" :aria-label="option.label" />

      {{ option.label }} 💩
    </template>
  </SelectMultiple>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

// Data
import { options } from './data';

const selectMultipleValue = ref();
</script>
