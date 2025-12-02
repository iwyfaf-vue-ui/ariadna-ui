<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    v-model:filter-value="selectMultipleGroupValueFilter"
    :options="options"
    label="Реализация model-value-filter"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);
const selectMultipleGroupValueFilter = ref('');
</script>
