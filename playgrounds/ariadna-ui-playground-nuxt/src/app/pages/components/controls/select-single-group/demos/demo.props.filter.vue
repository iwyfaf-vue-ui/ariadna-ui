<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    v-model:filter-value="selectSingleGroupValueFilter"
    :options="options"
    label="Фильтрация по одному полю"
    :filter="{ filterLabel: [[{ field: 'children' }, { field: 'label' }]] }"
  />

  <SelectSingleGroup
    v-model="selectSingleGroupValue2"
    v-model:filter-value="selectSingleGroupValueFilter2"
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
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

// Data
import { options, options2 } from './data';

const selectSingleGroupValue = ref();
const selectSingleGroupValueFilter = ref('');

const selectSingleGroupValue2 = ref();
const selectSingleGroupValueFilter2 = ref('');
</script>
