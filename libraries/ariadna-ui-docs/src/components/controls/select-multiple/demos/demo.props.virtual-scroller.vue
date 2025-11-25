<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    v-model:filter-value="selectMultipleValueFilter"
    :options="optionsVs"
    label="Виртуальный скролл, в массиве 5000 объектов"
    :virtual-scroller="{ itemHeight: 42, height: 210 }"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';

// Data
import { optionsVs } from './data';

const selectMultipleValue = ref();
const selectMultipleValueFilter = ref('');
</script>
