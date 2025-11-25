<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    v-model:filter-value="selectMultipleValueFilter"
    :options="options"
    label="Custom emptyFilter slot"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  >
    <template #emptyFilter> Результаты фильтрации не найдены </template>
  </SelectMultiple>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';

// Data
import { options } from './data';

const selectMultipleValue = ref();
const selectMultipleValueFilter = ref('');
</script>
