<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    v-model:filter-value="selectSingleFlatValueFilter"
    :options="optionsVs"
    label="Виртуальный скролл, в массиве 5000 объектов"
    filter
    :virtual-scroller="{ itemHeight: 42, height: 210 }"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

// Data
import { optionsVs } from './data';

const selectSingleFlatValue = ref([]);
const selectSingleFlatValueFilter = ref('');
</script>
