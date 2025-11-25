<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    v-model:filter-value="selectMultipleValueFilter"
    :options="options"
    label="Custom filterInput slot"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  >
    <template #filterInput="{ onFilter }">
      <InputText
        v-model="selectMultipleValueFilter"
        label="Встроенная фильтрация"
        placeholder="Встроенная фильтрация"
        aria-label="Фильтрация элементов"
        @input="onFilter(selectMultipleValueFilter)"
      />
    </template>
  </SelectMultiple>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Data
import { options } from './data';

const selectMultipleValue = ref();
const selectMultipleValueFilter = ref('');
</script>
