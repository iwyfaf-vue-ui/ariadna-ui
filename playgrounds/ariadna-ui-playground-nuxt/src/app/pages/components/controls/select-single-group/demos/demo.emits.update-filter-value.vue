<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    v-model:filter-value="selectSingleGroupValueFilter"
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
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

// Types
import type { TSelectSingleGroupProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

// Data
import { options } from './data';

const selectSingleGroupValue = ref();
const selectSingleGroupValueFilter = ref('');

function onUpdateFilterValue(event: TSelectSingleGroupProps['filterValue']) {
  console.log(event);
}
</script>
