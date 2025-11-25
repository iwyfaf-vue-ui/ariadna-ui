<template>
  <SelectMultiple
    v-model="selectSingleValue"
    :options="options"
    label="Update:model-value emit"
    @update:model-value="onUpdateModelValue"
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

const selectSingleValue = ref();

function onUpdateModelValue(event: TSelectMultipleProps['modelValue']) {
  console.log(event);
}
</script>
