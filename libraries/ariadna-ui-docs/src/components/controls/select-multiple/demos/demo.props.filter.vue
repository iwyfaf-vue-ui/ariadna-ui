<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    v-model:filter-value="selectMultipleValueFilter"
    :options="options"
    label="Фильтрация по одному полю"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  />

  <SelectMultiple
    v-model="selectMultipleValue2"
    v-model:filter-value="selectMultipleValueFilter2"
    :options="options2"
    option-label="customLabel"
    label="Фильтрация по двум полям: customLabel и customValue"
    :filter="{ filterLabel: [[{ field: 'customLabel' }], [{ field: 'customValue' }]] }"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';

// Data
import { options, options2 } from './data';

const selectMultipleValue = ref();
const selectMultipleValueFilter = ref('');

const selectMultipleValue2 = ref();
const selectMultipleValueFilter2 = ref('');
</script>
