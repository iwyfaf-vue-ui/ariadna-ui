<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    v-model:filter-value="selectMultipleValueFilter"
    :options="optionsStrings"
    label="Update:filter-value emit"
    filter
    @update:filter-value="onUpdateFilterValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';

// Types
import type { TSelectMultipleFlatProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';

// Data
import { optionsStrings } from './data';

const selectMultipleFlatValue = ref([]);
const selectMultipleValueFilter = ref('');

function onUpdateFilterValue(event: TSelectMultipleFlatProps['filterValue']) {
  console.log(event);
}
</script>
