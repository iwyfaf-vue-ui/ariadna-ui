<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    v-model:filter-value="selectMultipleFlatValueFilter"
    :options="optionsStrings"
    label="Custom emptyFilter slot"
    filter
  >
    <template #emptyFilter> Результаты фильтрации не найдены </template>
  </SelectMultipleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';

// Data
import { optionsStrings } from './data';

const selectMultipleFlatValue = ref([]);
const selectMultipleFlatValueFilter = ref('');
</script>
