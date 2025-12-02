<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Custom options slot"
  >
    <template #options="{ option, checked }">
      <Checkbox :model-value="checked" :aria-label="option.label" />

      {{ option.label }} 💩
    </template>
  </SelectMultipleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);
</script>
