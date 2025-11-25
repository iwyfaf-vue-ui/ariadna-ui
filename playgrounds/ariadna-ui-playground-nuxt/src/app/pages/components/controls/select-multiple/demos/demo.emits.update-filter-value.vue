<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    v-model:filter-value="selectMultipleValueFilter"
    :options="options"
    label="Update:filter-value emit"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
    @update:filter-value="onUpdateFilterValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';

// Types
import type { TSelectMultipleProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';

// Data
import { options } from './data';

const selectMultipleValue = ref();
const selectMultipleValueFilter = ref('');

function onUpdateFilterValue(event: TSelectMultipleProps['filterValue']) {
  console.log(event);
}
</script>
