<template>
  <SelectSingle
    v-model="selectSingleValue"
    v-model:filter-value="selectSingleValueFilter"
    :options="options"
    label="Реализация vModel"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  >
    <template #filter="{ onFilter }">
      <InputText
        v-model="selectSingleValueFilter"
        label="Встроенная фильтрация"
        placeholder="Встроенная фильтрация"
        aria-label="Фильтрация элементов"
        @input="onFilter(selectSingleValueFilter)"
      />
    </template>
  </SelectSingle>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Data
import { options } from './data';

const selectSingleValue = ref();
const selectSingleValueFilter = ref('');
</script>
