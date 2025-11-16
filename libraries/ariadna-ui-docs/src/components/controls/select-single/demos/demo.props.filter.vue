<template>
  <SelectSingle
    v-model="selectSingleValue"
    v-model:filter-value="selectSingleValueFilter"
    :options="options"
    label="Фильтрация по одному полю"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  />

  <SelectSingle
    v-model="selectSingleValue2"
    v-model:filter-value="selectSingleValueFilter2"
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
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { options, options2 } from './data';

const selectSingleValue = ref();
const selectSingleValueFilter = ref('');

const selectSingleValue2 = ref();
const selectSingleValueFilter2 = ref('');
</script>
