<template>
  <SelectSingle
    v-model="selectSingleValue"
    v-model:filter-value="selectSingleValueFilter"
    :options="optionsVs"
    label="Виртуальный скролл, в массиве 5000 объектов"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
    :virtual-scroller="{ itemHeight: 42, height: 210 }"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { optionsVs } from './data';

const selectSingleValue = ref();
const selectSingleValueFilter = ref('');
</script>
