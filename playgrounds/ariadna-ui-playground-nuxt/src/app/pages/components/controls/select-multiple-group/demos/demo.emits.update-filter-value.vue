<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    v-model:filter-value="selectMultipleGroupValueFilter"
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
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Types
import type { TSelectMultipleGroupProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);
const selectMultipleGroupValueFilter = ref('');

function onUpdateFilterValue(event: TSelectMultipleGroupProps['filterValue']) {
  console.log(event);
}
</script>
