<template>
  <SelectSingle
    v-model="selectSingleValue"
    v-model:filter-value="selectSingleValueFilter"
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
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Types
import type { TSelectSingleProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { options } from './data';

const selectSingleValue = ref();
const selectSingleValueFilter = ref('');

function onUpdateFilterValue(event: TSelectSingleProps['filterValue']) {
  console.log(event);
}
</script>
