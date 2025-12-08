<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    v-model:filter-value="selectMultipleFlatValueFilter"
    :options="optionsStrings"
    label="Custom filterInput slot"
    filter
  >
    <template #filterInput="{ onFilter }">
      <InputText
        v-model="selectMultipleFlatValueFilter"
        label="Встроенная фильтрация"
        placeholder="Встроенная фильтрация"
        aria-label="Фильтрация элементов"
        @input="onFilter(selectMultipleFlatValueFilter)"
      />
    </template>
  </SelectMultipleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Data
import { optionsStrings } from './data';

const selectMultipleFlatValue = ref([]);
const selectMultipleFlatValueFilter = ref('');
</script>
