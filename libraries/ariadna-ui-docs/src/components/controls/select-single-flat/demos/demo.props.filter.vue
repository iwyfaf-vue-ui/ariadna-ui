<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    v-model:filter-value="selectSingleFlatValueFilter"
    :options="options"
    label="Встроенная фильтрация"
    filter
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

// Data
import { options } from './data';

const selectSingleFlatValue = ref([]);
const selectSingleFlatValueFilter = ref('');
</script>
