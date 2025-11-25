<template>
  <SelectMultiple v-model="selectMultipleValue" :options="options" label="Custom label slot">
    <template #label="{ selectedOptions, label }">
      <span v-if="selectedOptions.length === 0"> Выберите опцию ⬇️ </span>
      <span v-else>{{ label }} 💩</span>
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
