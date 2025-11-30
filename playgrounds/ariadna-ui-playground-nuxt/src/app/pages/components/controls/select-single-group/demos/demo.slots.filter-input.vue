<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    v-model:filter-value="selectSingleGroupValueFilter"
    :options="options"
    label="Реализация vModel"
    :filter="{ filterLabel: [[{ field: 'children' }, { field: 'label' }]] }"
  >
    <template #filterInput="{ onFilter }">
      <InputText
        v-model="selectSingleGroupValueFilter"
        label="Встроенная фильтрация"
        placeholder="Встроенная фильтрация"
        aria-label="Фильтрация элементов"
        @input="onFilter(selectSingleGroupValueFilter)"
      />
    </template>
  </SelectSingleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// SelectSingleGroup
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Data
import { options } from './data';

const selectSingleGroupValue = ref();
const selectSingleGroupValueFilter = ref('');
</script>
