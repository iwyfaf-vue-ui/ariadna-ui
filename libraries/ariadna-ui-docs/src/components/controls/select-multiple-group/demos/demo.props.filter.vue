<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    v-model:filter-value="selectMultipleGroupValueFilter"
    :options="options"
    label="Фильтрация по одному полю"
    :filter="{ filterLabel: [[{ field: 'children' }, { field: 'label' }]] }"
  />

  <SelectMultipleGroup
    v-model="selectMultipleGroupValue2"
    v-model:filter-value="selectMultipleGroupValueFilter2"
    :options="options2"
    option-label="customLabel"
    label="Фильтрация по двум полям: customLabel и customValue"
    :filter="{
      filterLabel: [[{ field: 'children' }, { field: 'customLabel' }]],
    }"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options, options2 } from './data';

const selectMultipleGroupValue = ref([]);
const selectMultipleGroupValueFilter = ref('');

const selectMultipleGroupValue2 = ref([]);
const selectMultipleGroupValueFilter2 = ref('');
</script>
