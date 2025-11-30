<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    :options="options"
    label="Update:model-value emit"
    @update:model-value="onUpdateModelValue"
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

function onUpdateModelValue(event: TSelectSingleGroupProps['modelValue']) {
  console.log(event);
}
</script>
