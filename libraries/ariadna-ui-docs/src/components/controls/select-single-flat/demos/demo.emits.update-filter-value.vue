<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    v-model:filter-value="selectSingleFlatValueFilter"
    :options="options"
    label="Update:filter-value emit"
    filter
    @update:filter-value="onUpdateFilterValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

// Types
import type { TSelectSingleFlatProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

// Data
import { options } from './data';

const selectSingleFlatValue = ref([]);
const selectSingleFlatValueFilter = ref('');

function onUpdateFilterValue(event: TSelectSingleFlatProps['filterValue']) {
  console.log(event);
}
</script>
