<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Custom label slot"
  >
    <template #label="{ selectedOptions, label }">
      <span v-if="selectedOptions.length === 0"> Выберите опцию ⬇️ </span>
      <span v-else>{{ label }} 💩</span>
    </template>
  </SelectMultipleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);
</script>
