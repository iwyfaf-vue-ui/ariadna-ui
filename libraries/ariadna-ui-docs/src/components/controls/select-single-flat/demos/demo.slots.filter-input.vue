<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    v-model:filter-value="selectSingleFlatValueFilter"
    :options="options"
    label="Реализация vModel"
    filter
  >
    <template #filterInput="{ onFilter }">
      <InputText
        v-model="selectSingleFlatValueFilter"
        label="Встроенная фильтрация"
        placeholder="Встроенная фильтрация"
        aria-label="Фильтрация элементов"
        @input="onFilter(selectSingleFlatValueFilter)"
      />
    </template>
  </SelectSingleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Data
import { options } from './data';

const selectSingleFlatValue = ref([]);
const selectSingleFlatValueFilter = ref('');
</script>
