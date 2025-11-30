<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    v-model:filter-value="selectSingleGroupValueFilter"
    :options="options"
    label="Реализация vModel"
    :filter="{ filterLabel: [[{ field: 'children' }, { field: 'label' }]] }"
  >
    <template #emptyFilter> Результаты фильтрации не найдены </template>
  </SelectSingleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

// Data
import { options } from './data';

const selectSingleGroupValue = ref();
const selectSingleGroupValueFilter = ref('');
</script>
